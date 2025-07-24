import { Locator, Page } from "@e2e/e2eTest";
import { HuntPage } from "./HuntPage";
import { faker } from "@faker-js/faker";

export class HuntTeamsPage extends HuntPage {
  readonly createDialog: Locator;
  readonly updateDialog: Locator;
  readonly deleteAllDialog: Locator;
  readonly emptyPlaceholder: Locator;
  readonly teamsTable: Locator;

  constructor(page: Page, huntId: string) {
    super(page, huntId);
    this.createDialog = this.page.getByRole("dialog", {
      name: "Create team",
    });
    this.updateDialog = this.page.getByRole("dialog", {
      name: "Update team",
    });
    this.deleteAllDialog = this.page.getByRole("dialog", {
      name: "Delete teams",
    });
    this.emptyPlaceholder = this.page.getByTestId("table-empty-placeholder");
    this.teamsTable = this.page.getByTestId("teams-table");
  }

  async goto() {
    await this.gotoContentPage("/teams");
  }

  async assertTeamCount(expectedCount: number) {
    // add 1 for the table header row
    await this.assertCount(this.page.getByRole("row"), expectedCount + 1);
  }

  async openCreateDialog() {
    await this.page
      .getByRole("button", { name: "create-cards-icon-button" })
      .click();
    await this.createDialog.waitFor({ state: "visible" });
  }

  async openUpdateDialog(team: Locator) {
    await team.getByRole("button", { name: "Edit" }).click();
    await this.updateDialog.waitFor({ state: "visible" });
  }

  async openDeleteAllDialog() {
    await this.page
      .getByRole("button", { name: "delete-cards-icon-button" })
      .click();
    await this.deleteAllDialog.waitFor({ state: "visible" });
  }

  async createTeams(number: number = 1, lastTeam: string[] = []) {
    await this.openCreateDialog();

    if (number > 1) {
      // check the checkbox to create multiple clues
      await this.createDialog.getByRole("checkbox").check();
    }

    for (let i = 0; i < number; i++) {
      const teamMembers =
        i === number && !!lastTeam
          ? lastTeam
          : [
              faker.person.firstName(),
              faker.person.firstName(),
              faker.person.firstName(),
            ];

      await this.createDialog
        .getByTestId(`create-team-members-${i}`)
        .fill(teamMembers.join(", "));

      await this.createDialog
        .getByTestId(`create-team-device-number-${i}`)
        .fill(faker.phone.number({ style: "national" }));

      if (number > 1 && i < number - 1) {
        // click button to add another clue
        await this.createDialog
          .getByRole("button", { name: "Add another team" })
          .click();
      }
    }

    // click submit button
    await this.createDialog.getByRole("button", { name: "Create" }).click();
    await this.createDialog.waitFor({ state: "hidden" });
  }
}
