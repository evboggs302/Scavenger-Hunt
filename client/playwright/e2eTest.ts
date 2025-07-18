import type { LoginUserMutationVariables } from "@generated/graphql";
import { test as testBase, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

export type TestTypes = {
  defaultValue: string;
};

type Fixtures = {
  addAnnotations: void;
};

export type WorkerOptions = {
  username: string;
  workerStorageState: string;
};

export * from "@playwright/test";
export const e2eTest = testBase.extend<Fixtures, WorkerOptions>({
  username: [
    process.env.PLAYWRIGHT_USERNAME || "",
    { option: false, scope: "worker" },
  ],

  storageState: [
    async ({ workerStorageState }, use) => {
      await use(workerStorageState);
    },
    { scope: "test" },
  ],
  workerStorageState: [
    async ({ username, browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = e2eTest.info().parallelIndex;
      const fileName = path.resolve(
        e2eTest.info().project.testDir,
        `.auth/${username}-${id}.json`
      );

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({ storageState: undefined });
      const variables: LoginUserMutationVariables = {
        username: process.env.PLAYWRIGHT_USERNAME || "",
        password: process.env.PLAYWRIGHT_PASSWORD || "",
      };

      await page.goto(`${process.env.CLIENT_URL}/login`, { timeout: 120_000 });
      await page.getByTestId("login-username").fill(variables.username);
      await page.getByTestId("login-password").fill(variables.password);
      await page.getByTestId("login-submit").click();

      await page.waitForURL(`${process.env.CLIENT_URL}/app`);
      // Alternatively, you can wait until the page reaches a state where all cookies are set.
      await expect(
        page.getByRole("button", { name: "New hunt" })
      ).toBeVisible();

      await page.context().storageState({ path: fileName });
      await page.close();

      await use(fileName);
    },
    { scope: "worker" },
  ],

  addAnnotations: [
    async ({ username }, use) => {
      e2eTest.info().annotations.push({
        type: "username",
        description: username,
      });
      await use();
    },
    { scope: "test", auto: true },
  ],
});
