import { Locator, Page } from "@e2e/e2eTest";
import { HuntPage } from "./HuntPage";

export class HuntInfoPage extends HuntPage {
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedLink = page.locator("a", { hasText: "Get started" });
  }

  async goto() {
    await this.gotoContentPage();
  }

  async openEditDialog() {
    const button = this.page.getByRole("button", {
      name: "Edit details",
    });

    await button.click();
  }

  async resetInfo() {
    await this.openEditDialog();
  }
}
