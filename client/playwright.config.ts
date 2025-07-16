import { defineConfig, devices } from "@playwright/test";
import parseDuration from "parse-duration";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import "dotenv/config";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright",
  /* Default timeout for test object */
  timeout: parseDuration("5m") || undefined,
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
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    video: "retain-on-failure",
    ...devices["Desktop Chrome"],
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "e2e-local",
      use: {
        baseURL: process.env.CLIENT_URL,
      },
    },
    {
      name: "e2e-prod",
      use: {
        baseURL: process.env.CLIENT_URL,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
