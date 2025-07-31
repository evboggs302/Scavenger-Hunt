import { e2eTest as startup, expect } from "@e2e/e2eTest";
import { LoginUserMutationVariables } from "@generated/graphql";
import path from "path";

startup("Startup", async ({ username, browser }) => {
  console.log("\nStarting up...");

  await startup.step("Login user", async () => {
    const fileName = path.resolve(
      startup.info().project.testDir,
      `.auth/${username}.json`
    );

    const page = await browser.newPage({ storageState: undefined });
    const variables: LoginUserMutationVariables = {
      username: process.env.PLAYWRIGHT_USERNAME || "",
      password: process.env.PLAYWRIGHT_PASSWORD || "",
    };

    // Follow the logout process to ensure the user is logged out and the JWT token is cleared

    await page.goto(`${process.env.CLIENT_URL}/login`, { timeout: 120_000 });
    await page.getByTestId("login-username").fill(variables.username);
    await page.getByTestId("login-password").fill(variables.password);
    await page.getByTestId("login-submit").click();

    // The login flow sets localStorage state in the process and redirects.
    // Wait for the final URL to ensure that the localStorage values are actually set.
    await page.waitForURL(`${process.env.CLIENT_URL}/app`, {
      timeout: process.env.CI ? 120_000 : 60_000,
    });
    await expect(page.getByRole("button", { name: "New hunt" })).toBeVisible();

    await page.context().storageState({ path: fileName });
    await page.close();
  });

  console.log("Startup complete!\n");
});
