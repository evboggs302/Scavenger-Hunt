import { e2eTest as test, expect } from "@e2e/e2eTest";

test("has title", async ({ page }) => {
  await page.goto("/app");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Digital Scavenger/);
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
