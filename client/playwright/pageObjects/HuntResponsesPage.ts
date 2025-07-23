import { Locator, Page } from "@e2e/e2eTest";
import { HuntPage } from "./HuntPage";

export class HuntResponsesPage extends HuntPage {
  readonly getStartedLink: Locator;

  constructor(page: Page, huntId: string) {
    super(page, huntId);
    this.getStartedLink = page.locator("a", { hasText: "Get started" });
  }

  async goto() {
    await this.gotoContentPage("/responses");
  }
}
