import { e2eTest as teardown, expect } from "@e2e/e2eTest";
import fs from "fs";
import path from "path";

teardown("teardown", async ({ username, browser }) => {
  const id = teardown.info().parallelIndex;
  const fileName = path.resolve(
    teardown.info().project.testDir,
    `.auth/${username}-${id}.json`
  );

  const page = await browser.newPage({ storageState: fileName });
  await page.goto(`${process.env.CLIENT_URL}/app`);
  await page.getByTestId("open-additional-options").click();
  await expect(page.getByTestId("logout-menu-item")).toBeVisible();
  await page.getByTestId("logout-menu-item").click();

  await page.waitForURL(`${process.env.CLIENT_URL}/login`);
  await expect(page.getByTestId("login-submit")).toBeVisible();

  fs.rmSync(fileName);
  console.log("\nTeardown complete!");
});
