import { e2eTest, expect } from "@e2e/e2eTest";
import { faker } from "@faker-js/faker";

e2eTest.describe.serial("Teams page", () => {
  const phoneNumber = faker.phone.number({ style: "national" });

  e2eTest("Basic", async ({ TeamsPage }) => {
    const { teamsTable, createDialog, emptyPlaceholder } = TeamsPage;

    await e2eTest.step("Navigate to", async () => {
      await TeamsPage.goto();
    });

    await e2eTest.step("Default render - empty", async () => {
      await expect(emptyPlaceholder).toBeVisible();
    });

    await e2eTest.step("CREATE - 3 teams", async () => {
      await e2eTest.step("Create", async () => {
        await TeamsPage.createTeams(3);
        await expect(createDialog).not.toBeVisible();
      });

      await e2eTest.step("Confirm teams were created", async () => {
        await expect(teamsTable).toBeVisible();
        await TeamsPage.assertTeamCount(3);
      });
    });

    await e2eTest.step("CREATE - 1 team", async () => {
      const teamMembersInput = createDialog.getByTestId(
        "create-team-members-0"
      );
      const deviceNumberInput = createDialog.getByTestId(
        "create-team-device-number-0"
      );

      await e2eTest.step("Dialog opens", async () => {
        await TeamsPage.openCreateDialog();
        await expect(createDialog).toBeVisible();
      });

      await e2eTest.step("Add form values", async () => {
        await teamMembersInput.fill("Johnny Bravo");
        await deviceNumberInput.fill(phoneNumber);

        await expect(teamMembersInput).toHaveValue("Johnny Bravo");
        await expect(deviceNumberInput).toHaveValue(phoneNumber);
      });

      await e2eTest.step("Submit", async () => {
        await createDialog.getByRole("button", { name: "Create" }).click();
        await expect(createDialog).not.toBeVisible();

        await expect(teamsTable).toBeVisible();
        await TeamsPage.assertTeamCount(4);
      });
    });
  });

  e2eTest("Modify", async ({ page, TeamsPage }) => {
    const { teamsTable, deleteAllDialog, emptyPlaceholder, updateDialog } =
      TeamsPage;

    await e2eTest.step("Navigate to", async () => {
      await TeamsPage.goto();
    });

    await e2eTest.step("UPDATE - content", async () => {
      const teamMembersInput = updateDialog.getByTestId(
        "create-team-members-0"
      );
      const deviceNumberInput = updateDialog.getByTestId(
        "create-team-device-number-0"
      );

      await e2eTest.step("Dialog opens", async () => {
        const team = page.getByRole("row").filter({ hasText: "Johnny Bravo" });

        await TeamsPage.openUpdateDialog(team);
        await expect(updateDialog).toBeVisible();
      });

      await e2eTest.step("Change value", async () => {
        const newPhoneNumber = faker.phone.number({ style: "national" });

        await expect(teamMembersInput).toHaveValue("Johnny Bravo");
        await expect(deviceNumberInput).toHaveValue(phoneNumber);

        await expect(
          updateDialog.getByRole("button", { name: "Save" })
        ).toBeDisabled();

        await teamMembersInput.fill("Sarah Connor");
        await deviceNumberInput.fill(newPhoneNumber);

        await expect(
          updateDialog.getByRole("button", { name: "Save" })
        ).toBeEnabled();
        await expect(teamMembersInput).toHaveValue("Sarah Connor");
        await expect(deviceNumberInput).toHaveValue(newPhoneNumber);
      });

      await e2eTest.step("Submit", async () => {
        await updateDialog.getByRole("button", { name: "Save" }).click();
        await expect(updateDialog).not.toBeVisible();

        await expect(teamsTable).toBeVisible();
        await TeamsPage.assertTeamCount(4);
        await expect(
          page.getByRole("row").filter({ hasText: "Sarah Connor" })
        ).toBeVisible();
      });
    });

    await e2eTest.step("DELETE SINGLE", async () => {
      await e2eTest.step("Clicks delete button on card", async () => {
        const team = page.getByRole("row").filter({ hasText: "Sarah Connor" });

        await team.getByRole("button", { name: "Delete" }).click();
        await expect(team).not.toBeVisible();
      });

      await e2eTest.step("Confirm", async () => {
        await TeamsPage.assertTeamCount(3);
      });
    });

    await e2eTest.step("DELETE ALL", async () => {
      await e2eTest.step("Dialog opens", async () => {
        await TeamsPage.openDeleteAllDialog();
        await expect(deleteAllDialog).toBeVisible();
      });

      await e2eTest.step("Submit", async () => {
        await deleteAllDialog.getByRole("button", { name: "Delete" }).click();
        await expect(deleteAllDialog).not.toBeVisible();
      });

      await e2eTest.step("Confirm", async () => {
        await expect(emptyPlaceholder).toBeVisible();
        await TeamsPage.assertTeamCount(0);
      });
    });
  });
});
