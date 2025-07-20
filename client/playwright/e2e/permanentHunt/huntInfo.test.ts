import { e2eTest, expect } from "@e2e/e2eTest";

e2eTest("Hunt Info", async ({ page, HomePage, InfoPage }) => {
  await e2eTest.step("Navigate to existing hunt", async () => {
    await HomePage.gotoExistingHunt();
  });

  await e2eTest.step("Renders", async () => {
    await expect(page.getByRole("tablist")).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    await expect(
      page.getByRole("cell", { name: "Permanent Hunt" })
    ).toBeVisible();
  });

  await e2eTest.step("Update info", async () => {
    await InfoPage.openEditDialog();
  });

  // await e2eTest.step("Cleanup", async () => {
  //   await InfoPage.resetInfo();
  // });
});
