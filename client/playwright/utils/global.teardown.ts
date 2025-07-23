import { e2eTest as teardown, expect } from "@e2e/e2eTest";
import fs from "fs";
import path from "path";

teardown("Teardown", async ({ username, browser }) => {
  console.log("\nTeardown started...");

  // await teardown.step("Delete temporary hunt", async () => {
  //   teardown.skip(!!huntId, "Skipping hunt deletion in teardown");

  //   const fileName = path.resolve(
  //     teardown.info().project.testDir,
  //     `.auth/${username}.json`
  //   );

  //   await deleteTempHunt(fileName, hunt._id);
  // });

  await teardown.step("Delete temporary storage state", async () => {
    const fileName = path.resolve(
      teardown.info().project.testDir,
      `.auth/${username}.json`
    );

    const page = await browser.newPage({ storageState: fileName });
    await page.goto(`${process.env.CLIENT_URL}/app`, { timeout: 120_000 });
    await page.getByTestId("open-additional-options").click();
    await expect(page.getByTestId("logout-menu-item")).toBeVisible();
    await page.getByTestId("logout-menu-item").click();

    await page.waitForURL(`${process.env.CLIENT_URL}/login`);
    await expect(page.getByTestId("login-submit")).toBeVisible();

    fs.rmSync(fileName);
  });

  console.log("Teardown complete!\n");
});
