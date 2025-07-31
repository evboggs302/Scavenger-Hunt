import { e2eTest, expect } from "@e2e/e2eTest";

e2eTest("Clues dialog", async ({ page, CluesPage }) => {
  const { createDialog } = CluesPage;

  const addButton = createDialog.getByRole("button", {
    name: "Add another clue",
  });

  await e2eTest.step("Navigate to page", async () => {
    await CluesPage.goto();
  });

  await e2eTest.step("Dialog opens", async () => {
    await CluesPage.openCreateDialog();
    await expect(createDialog).toBeVisible();
  });

  await e2eTest.step("Add first description", async () => {
    await expect(addButton).toBeDisabled();
    await expect(createDialog.getByTestId("DeleteOutlineIcon")).toHaveCount(0);

    await createDialog.getByTestId("create-description-0").fill("DELETE ME!");
    await expect(page.getByTestId("create-description-0")).toHaveValue(
      "DELETE ME!"
    );

    await expect(addButton).toBeEnabled();
  });

  await e2eTest.step("Click add another", async () => {
    await addButton.click();

    await expect(createDialog.getByRole("textbox")).toHaveCount(2);
    await expect(createDialog.getByTestId("DeleteOutlineIcon")).toHaveCount(2);
  });

  await e2eTest.step("Add second description", async () => {
    await createDialog
      .getByTestId("create-description-1")
      .fill("DELETE ME ALSO!");

    await expect(page.getByTestId("create-description-1")).toHaveValue(
      "DELETE ME ALSO!"
    );
  });

  await e2eTest.step("Remove the first", async () => {
    const firstDeleteBtn = createDialog
      .getByTestId("DeleteOutlineIcon")
      .first();

    await firstDeleteBtn.click();
    await expect(addButton).toBeEnabled();
    await expect(createDialog.getByTestId("DeleteOutlineIcon")).toHaveCount(0);
    await expect(page.getByTestId("create-description-0")).toHaveValue(
      "DELETE ME ALSO!"
    );
  });

  // MODIFY INTENTIONALLY AFTER DELETE
  await e2eTest.step("Modify existing", async () => {
    const modifiedTxt = "DELETE ME MODIFIED";

    await createDialog.getByTestId("create-description-0").fill(modifiedTxt);
    await expect(page.getByTestId("create-description-0")).toHaveValue(
      modifiedTxt
    );
  });

  await e2eTest.step("Remove the last", async () => {
    const newClue1 = "NEW CLUE 1";
    const newClue2 = "NEW CLUE 2";

    await addButton.click();
    await createDialog.getByTestId("create-description-1").fill(newClue1);
    await expect(page.getByTestId("create-description-1")).toHaveValue(
      newClue1
    );

    await addButton.click();
    await createDialog.getByTestId("create-description-2").fill(newClue2);
    await expect(page.getByTestId("create-description-2")).toHaveValue(
      newClue2
    );

    const lastDeleteBtn = createDialog.getByTestId("DeleteOutlineIcon").last();

    await expect(createDialog.getByRole("textbox")).toHaveCount(3);
    await lastDeleteBtn.click();
    await expect(createDialog.getByRole("textbox")).toHaveCount(2);
    await expect(page.getByTestId("create-description-2")).not.toBeVisible();
    await expect(page.getByText(newClue2)).not.toBeVisible();
  });
});
