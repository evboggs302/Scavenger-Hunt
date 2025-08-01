import { e2eTest, expect } from "@e2e/e2eTest";

e2eTest("Basic account page", async ({ page, AccountPage }) => {
  await e2eTest.step("Navigate to", async () => {
    await AccountPage.goto();
  });

  await e2eTest.step("Renders", async () => {
    await expect(
      page.getByRole("heading", { name: "Accounts Page" })
    ).toBeVisible();
  });
});
