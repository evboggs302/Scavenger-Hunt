import { type Locator, type Page, expect } from "@e2e/e2eTest";

type GoToArg = "" | "/clues" | "/responses" | "/teams";

export class HuntPage {
  readonly page: Page;
  readonly huntId: string;

  constructor(page: Page, huntId: string) {
    this.page = page;
    this.huntId = huntId;
  }

  async gotoContentPage(to: GoToArg = "") {
    const destination = `/app/hunt/${this.huntId}${to}`;
    await this.page.goto(destination);
    await this.page.waitForLoadState("networkidle");
  }

  async assertCount(locator: Locator, expectedCount: number) {
    await expect(locator).toHaveCount(expectedCount);
  }
}
