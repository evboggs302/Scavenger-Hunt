import { e2eTest, expect } from "@e2e/e2eTest";
import { faker } from "@faker-js/faker";

e2eTest("Teams dialog", async ({ page, TeamsPage }) => {
  const { createDialog } = TeamsPage;

  const teamInfoContainer = createDialog.getByTestId("team-info-container");
  const deleteTeamButton = createDialog.getByTestId("DeleteOutlineIcon");
  const addButton = createDialog.getByRole("button", {
    name: "Add another team",
  });

  const firstTeam_MembersInput = page.getByTestId("create-team-members-0");
  const secondTeam_MembersInput = page.getByTestId("create-team-members-1");

  const firstTeam_PhoneInput = page.getByTestId("create-team-device-number-0");
  const secondTeam_PhoneInput = page.getByTestId("create-team-device-number-1");

  const team_01_members = [
    faker.person.firstName(),
    faker.person.firstName(),
    faker.person.firstName(),
  ].join(", ");
  const team_02_members = [
    faker.person.firstName(),
    faker.person.firstName(),
    faker.person.firstName(),
  ].join(", ");
  const team_03_members = [
    faker.person.firstName(),
    faker.person.firstName(),
    faker.person.firstName(),
  ].join(", ");

  const team_01_phone = faker.phone.number({ style: "national" });
  const team_02_phone = faker.phone.number({ style: "national" });
  const team_03_phone = faker.phone.number({ style: "national" });

  await e2eTest.step("Navigate to page", async () => {
    await TeamsPage.goto();
  });

  await e2eTest.step("Dialog opens", async () => {
    await TeamsPage.openCreateDialog();
    await expect(createDialog).toBeVisible();
  });

  await e2eTest.step("Default state", async () => {
    await expect(addButton).toBeDisabled();
    await expect(teamInfoContainer).toHaveCount(1);
    await expect(deleteTeamButton).not.toBeVisible();
  });

  await e2eTest.step("Add first team", async () => {
    await e2eTest.step("Members", async () => {
      await firstTeam_MembersInput.fill(team_01_members);
      await expect(firstTeam_MembersInput).toHaveValue(team_01_members);
    });

    await e2eTest.step("Phone number", async () => {
      await firstTeam_PhoneInput.fill(team_01_phone);
      await expect(firstTeam_PhoneInput).toHaveValue(team_01_phone);

      await expect(addButton).toBeEnabled();
    });
  });

  await e2eTest.step("Click add another", async () => {
    await addButton.click();

    await expect(teamInfoContainer).toHaveCount(2);
    await expect(deleteTeamButton).toHaveCount(2);
  });

  await e2eTest.step("Add second team", async () => {
    await e2eTest.step("Members", async () => {
      await secondTeam_MembersInput.fill(team_02_members);
      await expect(secondTeam_MembersInput).toHaveValue(team_02_members);
    });

    await e2eTest.step("Phone number", async () => {
      await secondTeam_PhoneInput.fill(team_02_phone);
      await expect(secondTeam_PhoneInput).toHaveValue(team_02_phone);
      await expect(addButton).toBeEnabled();
    });
  });

  await e2eTest.step("Remove the first", async () => {
    const firstDeleteBtn = deleteTeamButton.first();

    await firstDeleteBtn.click();
    await expect(firstTeam_MembersInput).toHaveValue(team_02_members);
    await expect(firstTeam_PhoneInput).toHaveValue(team_02_phone);
    await expect(addButton).toBeEnabled();
    await expect(deleteTeamButton).not.toBeVisible();
    await expect(teamInfoContainer).toHaveCount(1);
  });

  // MODIFY INTENTIONALLY AFTER DELETE
  await e2eTest.step("Modify existing", async () => {
    const modifiedTeam = "Ed, Edd, Eddy";
    const newNumber = faker.phone.number({ style: "national" });

    await firstTeam_MembersInput.fill(modifiedTeam);
    await firstTeam_PhoneInput.fill(newNumber);
    await expect(firstTeam_MembersInput).toHaveValue(modifiedTeam);
    await expect(firstTeam_PhoneInput).toHaveValue(newNumber);
    await expect(addButton).toBeEnabled();
  });

  await e2eTest.step("Remove the last", async () => {
    await addButton.click();

    await secondTeam_MembersInput.fill(team_03_members);
    await expect(secondTeam_MembersInput).toHaveValue(team_03_members);

    await secondTeam_PhoneInput.fill(team_03_phone);
    await expect(secondTeam_PhoneInput).toHaveValue(team_03_phone);

    const lastDeleteBtn = deleteTeamButton.last();
    await expect(teamInfoContainer).toHaveCount(2);
    await expect(addButton).toBeEnabled();

    await lastDeleteBtn.click();
    await expect(teamInfoContainer).toHaveCount(1);
    await expect(secondTeam_MembersInput).not.toBeVisible();
    await expect(secondTeam_PhoneInput).not.toBeVisible();
  });
});
