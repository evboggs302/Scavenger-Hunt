import { e2eTest, expect } from "@e2e/e2eTest";
import { createFakeDates } from "@e2e/utils/createFakeDates";
import { faker } from "@faker-js/faker";

e2eTest("Hunt info page: UPDATE hunt", async ({ page, InfoPage, hunt }) => {
  await e2eTest.step("Navigate to existing hunt", async () => {
    await InfoPage.goto();
  });

  await e2eTest.step("Default render info", async () => {
    await expect(page.getByRole("tablist")).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByRole("cell", { name: hunt.name })).toBeVisible();
  });

  const newName = faker.lorem.words(3);
  const { startDate, endDate } = createFakeDates();

  await e2eTest.step("Dialog opens", async () => {
    await InfoPage.openEditDialog();
    await expect(page.getByTestId("update-hunt-title")).toBeVisible();
  });

  const newValues = {
    name: newName,
    startDate,
    endDate,
    recallMessage: "Updated recall message",
    multipleDays: true,
  };

  await e2eTest.step("Change values", async () => {
    await InfoPage.setHuntValues(newValues);

    await expect(page.getByLabel("Hunt Name")).toHaveValue(newName);
    await expect(page.getByLabel("Start Date")).toHaveValue(startDate);
    await expect(page.getByLabel("End Date")).toHaveValue(endDate);
    await expect(page.getByTestId("update-hunt-recall-message")).toHaveValue(
      "Updated recall message"
    );
  });

  await e2eTest.step("Save change", async () => {
    await InfoPage.dialog.getByRole("button", { name: "Update hunt" }).click();

    await expect(InfoPage.dialog).not.toBeVisible();
  });

  await e2eTest.step("Verify change", async () => {
    await expect(page.getByRole("cell", { name: newName })).toBeVisible();
  });

  await e2eTest.step("Reset info", async () => {
    await InfoPage.resetInfo();
    await expect(page.getByRole("cell", { name: hunt.name })).toBeVisible();
  });
});
