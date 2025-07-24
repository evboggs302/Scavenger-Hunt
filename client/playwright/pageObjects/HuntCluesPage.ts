import { Locator, Page } from "@e2e/e2eTest";
import { HuntPage } from "./HuntPage";
import { faker } from "@faker-js/faker";

export class HuntCluesPage extends HuntPage {
  readonly createDialog: Locator;
  readonly updateDialog: Locator;
  readonly deleteAllDialog: Locator;
  readonly emptyPlaceholder: Locator;
  readonly clueList: Locator;

  constructor(page: Page, huntId: string) {
    super(page, huntId);
    this.createDialog = this.page.getByRole("dialog", {
      name: "Create clue",
    });
    this.updateDialog = this.page.getByRole("dialog", {
      name: "Update clue",
    });
    this.deleteAllDialog = this.page.getByRole("dialog", {
      name: "Delete clues",
    });
    this.emptyPlaceholder = this.page.getByTestId(
      "empty-clues-table-placeholder"
    );
    this.clueList = this.page.getByTestId("virtuoso-item-list");
  }

  async goto() {
    await this.gotoContentPage("/clues");
  }

  async assertClueCount(expectedCount: number) {
    await this.assertCount(this.page.getByTestId("clue-card"), expectedCount);
  }

  async openCreateDialog() {
    await this.page
      .getByRole("button", { name: "create-cards-icon-button" })
      .click();
    await this.createDialog.waitFor({ state: "visible" });
  }

  async openUpdateDialog(clue: Locator) {
    await clue.getByRole("button", { name: "Edit" }).click();
    await this.updateDialog.waitFor({ state: "visible" });
  }

  async openDeleteAllDialog() {
    await this.page
      .getByRole("button", { name: "delete-cards-icon-button" })
      .click();
    await this.deleteAllDialog.waitFor({ state: "visible" });
  }

  async createClues(number: number = 1, lastDescription: string = "") {
    await this.openCreateDialog();

    if (number > 1) {
      // check the checkbox to create multiple clues
      await this.createDialog.getByRole("checkbox").check();
    }

    for (let i = 0; i < number; i++) {
      const clueDescription =
        i === number && !!lastDescription
          ? lastDescription
          : faker.lorem.sentence(3);

      await this.createDialog
        .getByTestId(`create-description-${i}`)
        .fill(clueDescription);

      if (number > 1 && i < number - 1) {
        // click button to add another clue
        await this.createDialog
          .getByRole("button", { name: "Add another clue" })
          .click();
      }
    }

    // click submit button
    await this.createDialog.getByRole("button", { name: "Create" }).click();
    await this.createDialog.waitFor({ state: "hidden" });
  }
}
