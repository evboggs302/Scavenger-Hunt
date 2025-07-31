import { e2eTest, expect } from "@e2e/e2eTest";

e2eTest.describe.serial("Clues page", () => {
  e2eTest("Basic", async ({ page, CluesPage }) => {
    const { clueList, createDialog, emptyPlaceholder } = CluesPage;

    await e2eTest.step("Navigate to", async () => {
      await CluesPage.goto();
    });

    await e2eTest.step("Default render - empty", async () => {
      await expect(emptyPlaceholder).toBeVisible();
    });

    await e2eTest.step("CREATE - 3 clues", async () => {
      await e2eTest.step("Create", async () => {
        await CluesPage.createClues(3);
        await expect(createDialog).not.toBeVisible();
      });

      await e2eTest.step("Confirm clues were created", async () => {
        await expect(clueList).toBeVisible();
        await CluesPage.assertClueCount(3);
      });
    });

    await e2eTest.step("CREATE - 1 clue", async () => {
      await e2eTest.step("Dialog opens", async () => {
        await CluesPage.openCreateDialog();
        await expect(createDialog).toBeVisible();
      });

      await e2eTest.step("Add form values", async () => {
        await createDialog
          .getByTestId("create-description-0")
          .fill("DELETE ME!");
        await expect(page.getByTestId("create-description-0")).toHaveValue(
          "DELETE ME!"
        );
      });

      await e2eTest.step("Submit", async () => {
        await createDialog.getByRole("button", { name: "Create" }).click();
        await expect(createDialog).not.toBeVisible();

        await expect(clueList).toBeVisible();
        await CluesPage.assertClueCount(4);
      });
    });
  });

  e2eTest("Modify", async ({ page, CluesPage }) => {
    const { clueList, deleteAllDialog, emptyPlaceholder, updateDialog } =
      CluesPage;

    await e2eTest.step("Navigate to", async () => {
      await CluesPage.goto();
    });

    await e2eTest.step("UPDATE - order", async () => {
      await e2eTest.step("Move to start", async () => {
        const deleteMeCard = page
          .getByTestId("clue-card-draggable")
          .filter({ hasText: "DELETE ME!" });

        const firstClue = page.locator('[data-index="0"]');
        const lastClue = page.locator('[data-index="3"]');
        await expect(lastClue.filter({ has: deleteMeCard })).toBeVisible();

        // Manually drag and drop due to drag and drop library listening for mouse events
        await deleteMeCard.hover();
        await page.mouse.down();
        await firstClue.hover();
        await page.mouse.up();

        await expect(firstClue.filter({ has: deleteMeCard })).toBeVisible();
      });
    });

    await e2eTest.step("UPDATE - content", async () => {
      await e2eTest.step("Dialog opens", async () => {
        const deleteMeCard = page
          .getByTestId("clue-card")
          .filter({ hasText: "DELETE ME!" });

        await CluesPage.openUpdateDialog(deleteMeCard);
        await expect(updateDialog).toBeVisible();
      });

      await e2eTest.step("Change value", async () => {
        const textField = updateDialog.getByTestId("update-clue-description");
        await expect(textField).toHaveValue("DELETE ME!");
        await expect(
          updateDialog.getByRole("button", { name: "Save" })
        ).toBeDisabled();

        await textField.fill("DELETE ME NOW!");
        await expect(
          updateDialog.getByRole("button", { name: "Save" })
        ).toBeEnabled();
        await expect(textField).toHaveValue("DELETE ME NOW!");
      });

      await e2eTest.step("Submit", async () => {
        await updateDialog.getByRole("button", { name: "Save" }).click();
        await expect(updateDialog).not.toBeVisible();

        await expect(clueList).toBeVisible();
        await CluesPage.assertClueCount(4);
        await expect(
          page.getByTestId("clue-card").filter({ hasText: "DELETE ME NOW!" })
        ).toBeVisible();
      });
    });

    await e2eTest.step("DELETE SINGLE", async () => {
      await e2eTest.step("Clicks delete button on card", async () => {
        const deleteMeCard = page
          .getByTestId("clue-card")
          .filter({ hasText: "DELETE ME NOW!" });

        await deleteMeCard.getByRole("button", { name: "Delete" }).click();
        await expect(deleteMeCard).not.toBeVisible();
      });

      await e2eTest.step("Confirm", async () => {
        await CluesPage.assertClueCount(3);
      });
    });

    await e2eTest.step("DELETE ALL", async () => {
      await e2eTest.step("Dialog opens", async () => {
        await CluesPage.openDeleteAllDialog();
        await expect(deleteAllDialog).toBeVisible();
      });

      await e2eTest.step("Submit", async () => {
        await deleteAllDialog.getByRole("button", { name: "Delete" }).click();
        await expect(deleteAllDialog).not.toBeVisible();
      });

      await e2eTest.step("Confirm", async () => {
        await expect(emptyPlaceholder).toBeVisible();
        await CluesPage.assertClueCount(0);
      });
    });
  });
});
