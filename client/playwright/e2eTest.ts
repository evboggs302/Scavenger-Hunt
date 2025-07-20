import type { LoginUserMutationVariables } from "@generated/graphql";
import { test as testBase, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { HomePage } from "./pageObjects/HomePage";
import { AccountPage } from "./pageObjects/AccountPage";
import { HuntInfoPage } from "./pageObjects/HuntInfo";
import { HuntCluesPage } from "./pageObjects/HuntCluesPage";
import { HuntTeamsPage } from "./pageObjects/HuntTeamsPage";
import { HuntResponsesPage } from "./pageObjects/HuntResponsesPage";

export type TestTypes = {
  defaultValue: string;
};

type Fixtures = {
  addAnnotations: void;
  HomePage: HomePage;
  AccountPage: AccountPage;
  InfoPage: HuntInfoPage;
  CluesPage: HuntCluesPage;
  TeamsPage: HuntTeamsPage;
  ResponsesPage: HuntResponsesPage;
};

export type WorkerOptions = {
  username: string;
  workerStorageState: string;
};

export * from "@playwright/test";
export const e2eTest = testBase.extend<Fixtures, WorkerOptions>({
  username: [
    process.env.PLAYWRIGHT_USERNAME || "",
    { option: true, scope: "worker" },
  ],

  storageState: [
    ({ workerStorageState }, use) => use(workerStorageState),
    { scope: "test" },
  ],

  workerStorageState: [
    async ({ username, browser }, use) => {
      const fileName = path.resolve(
        e2eTest.info().project.testDir,
        `.auth/${username}.json`
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

      // The login flow sets localStorage state in the process and redirects.
      // Wait for the final URL to ensure that the localStorage values are actually set.
      await page.waitForURL(`${process.env.CLIENT_URL}/app`);
      await expect(
        page.getByRole("button", { name: "New hunt" })
      ).toBeVisible();

      await page.context().storageState({ path: fileName });
      await page.close();

      await use(fileName);
    },
    { scope: "worker" },
  ],

  HomePage: async ({ page }, use) => {
    const selectedPage = new HomePage(page);
    await use(selectedPage);
  },

  AccountPage: async ({ page }, use) => {
    const selectedPage = new AccountPage(page);
    await use(selectedPage);
  },

  InfoPage: async ({ page }, use) => {
    const selectedPage = new HuntInfoPage(page);
    await use(selectedPage);
  },

  CluesPage: async ({ page }, use) => {
    const selectedPage = new HuntCluesPage(page);
    await use(selectedPage);
  },

  TeamsPage: async ({ page }, use) => {
    const selectedPage = new HuntTeamsPage(page);
    await use(selectedPage);
  },

  ResponsesPage: async ({ page }, use) => {
    const selectedPage = new HuntResponsesPage(page);
    await use(selectedPage);
  },

  addAnnotations: [
    async ({ baseURL, username }, use) => {
      e2eTest.info().annotations.push({
        type: "baseURL",
        description: baseURL,
      });

      e2eTest.info().annotations.push({
        type: "username",
        description: username,
      });

      await use();
    },
    { scope: "test", auto: true },
  ],
});
