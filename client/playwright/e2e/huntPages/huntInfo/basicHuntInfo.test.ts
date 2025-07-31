import { e2eTest, expect } from "@e2e/e2eTest";

e2eTest("Basic hunt info page", async ({ page, InfoPage, hunt }) => {
  await e2eTest.step("Navigate to", async () => {
    await InfoPage.goto();
  });

  await e2eTest.step("Default render info", async () => {
    await expect(page.getByRole("tablist")).toBeVisible();
    await expect(
      page.getByRole("table", { name: "hunt details table" })
    ).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole("cell", { name: hunt.name })).toBeVisible();
  });

  await e2eTest.step("Dialog opens", async () => {
    await InfoPage.openEditDialog();
    await expect(page.getByTestId("update-hunt-title")).toBeVisible();
  });
});
