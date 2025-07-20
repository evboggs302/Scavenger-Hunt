import { Page } from "@e2e/e2eTest";

type GoToArg = "" | "/clues" | "/responses" | "/teams";

export class HuntPage {
  readonly page: Page;
  readonly huntId: string;

  constructor(page: Page) {
    const splitURL = page.url().split("/");
    const indexOfHuntId = splitURL.indexOf("app") + 1;

    this.page = page;
    this.huntId = splitURL[indexOfHuntId];
  }

  async gotoContentPage(to: GoToArg = "") {
    const destination = `/app/hunt/${this.huntId}${to}`;
    await this.page.goto(destination);
    await this.page.waitForURL(/\destination/);
  }
}
