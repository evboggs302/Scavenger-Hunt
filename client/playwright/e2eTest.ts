import type {
  HuntFragment,
  LoginUserMutationVariables,
} from "@generated/graphql";
import { test as testBase, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { HomePage } from "./pageObjects/HomePage";
import { AccountPage } from "./pageObjects/AccountPage";
import { HuntInfoPage } from "./pageObjects/HuntInfoPage";
import { HuntCluesPage } from "./pageObjects/HuntCluesPage";
import { HuntTeamsPage } from "./pageObjects/HuntTeamsPage";
import { HuntResponsesPage } from "./pageObjects/HuntResponsesPage";
import { createTempHunt } from "./utils/createTempHunt";
import { deleteTempHunt } from "./utils/deleteTempHunt";

export type TestTypes = {
  defaultValue: string;
};

type TestFixtures = {
  HomePage: HomePage;
  AccountPage: AccountPage;
  InfoPage: HuntInfoPage;
  CluesPage: HuntCluesPage;
  TeamsPage: HuntTeamsPage;
  ResponsesPage: HuntResponsesPage;
  addAnnotations: void;
};

type WorkerFixtures = {
  hunt: HuntFragment;
};

export type WorkerOptions = {
  username: string;
  workerStorageState: string;
};

export * from "@playwright/test";
export const e2eTest = testBase.extend<
  TestFixtures,
  WorkerFixtures & WorkerOptions
>({
  username: [
    process.env.PLAYWRIGHT_USERNAME || "",
    { option: true, scope: "worker" },
  ],

  hunt: [
    async ({ workerStorageState }, use) => {
      if (e2eTest.info().project.name === "teardown") {
        // If the worker is running the teardown project, skip hunt creation.
        await use({} as HuntFragment);
      } else {
        // If not running teardown, create a temporary hunt.
        const hunt = await createTempHunt(workerStorageState);
        await use(hunt);

        // Automatically delete the temporary hunt after the worker finishes.
        await deleteTempHunt(workerStorageState, hunt._id);
      }
    },
    { scope: "worker" },
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

  InfoPage: async ({ page, hunt }, use) => {
    const selectedPage = new HuntInfoPage(page, hunt);
    await use(selectedPage);
  },

  CluesPage: async ({ page, hunt }, use) => {
    const selectedPage = new HuntCluesPage(page, hunt._id);
    await use(selectedPage);
  },

  TeamsPage: async ({ page, hunt }, use) => {
    const selectedPage = new HuntTeamsPage(page, hunt._id);
    await use(selectedPage);
  },

  ResponsesPage: async ({ page, hunt }, use) => {
    const selectedPage = new HuntResponsesPage(page, hunt._id);
    await use(selectedPage);
  },

  addAnnotations: [
    async ({ baseURL, username, hunt }, use) => {
      e2eTest.info().annotations.push({
        type: "baseURL",
        description: baseURL,
      });

      e2eTest.info().annotations.push({
        type: "username",
        description: username,
      });

      e2eTest.info().annotations.push({
        type: "Hunt._id",
        description: hunt._id,
      });

      await use();
    },
    { scope: "test", auto: true },
  ],
});
