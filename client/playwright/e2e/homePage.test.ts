import { e2eTest, expect } from "@e2e/e2eTest";

e2eTest("Home page", async ({ page, HomePage }) => {
  await e2eTest.step("Navigate to", async () => {
    await HomePage.goto();
  });

  await e2eTest.step("Home page renders", async () => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Digital Scavenger/);

    // Click the get started link.
    await expect(page.getByTestId("home-menu-button")).toBeVisible();
  });
});
