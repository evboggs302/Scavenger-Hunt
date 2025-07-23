import { Locator, Page } from "@e2e/e2eTest";
import { HuntPage } from "./HuntPage";

export class HuntCluesPage extends HuntPage {
  readonly createSingleDialog: Locator;
  readonly createMultipleDialog: Locator;
  readonly deleteCluesDialog: Locator;

  constructor(page: Page, huntId: string) {
    super(page, huntId);
    this.createSingleDialog = this.page.getByRole("dialog", {
      name: "Create clue",
    });
    this.createMultipleDialog = this.page.getByRole("dialog", {
      name: "Create clues",
    });
    this.deleteCluesDialog = this.page.getByRole("dialog", {
      name: "Delete ALL clues",
    });
  }

  async goto() {
    await this.gotoContentPage("/clues");
  }
}
