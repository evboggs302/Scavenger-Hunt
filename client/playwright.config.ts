import * as dotenv from "dotenv";
import { defineConfig, devices } from "@playwright/test";
import parseDuration from "parse-duration";
import type { TestTypes, WorkerOptions } from "@e2e/e2eTest";

/**
 * Read environment variables from file.
 */
dotenv.config({ path: "../.env" });

const baseURL = `${process.env.CLIENT_URL}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestTypes, WorkerOptions>({
  testDir: "./playwright",
  /* Default timeout for test object */
  timeout: parseDuration("5m") || undefined,
  /* Maximum time one assertion can run for */
  expect: {
    timeout: 10_000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html"],
    ["json", { outputFile: "playwright-report/results.json" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,
    username: process.env.PLAYWRIGHT_USERNAME,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    video: "retain-on-failure",
    ...devices["Desktop Chrome"],
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 2_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "startup",
      testMatch: /global.startup.ts/,
    },
    {
      name: "e2e-test",
      dependencies: ["startup"],
      teardown: "teardown",
    },
    {
      name: "teardown",
      testMatch: /global.teardown.ts/,
    },
  ],
});
