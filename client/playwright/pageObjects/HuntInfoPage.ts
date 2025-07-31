import { Locator, Page } from "@e2e/e2eTest";
import { HuntPage } from "./HuntPageObject";
import { HuntFragment } from "@generated/graphql";
import dayjs from "dayjs";

type HuntFormValues = {
  name: string;
  startDate: string;
  endDate: string;
  recallMessage: string;
  multipleDays: boolean;
};

export class HuntInfoPage extends HuntPage {
  readonly dialog: Locator;
  private readonly hunt: HuntFragment;
  private originalFormValues: HuntFormValues;

  constructor(page: Page, hunt: HuntFragment) {
    super(page, hunt._id);
    this.dialog = this.page.getByRole("dialog", { name: "Update Hunt" });
    this.hunt = hunt;
    this.originalFormValues = {
      name: hunt.name,
      startDate: dayjs(hunt.start_date).format("MM/DD/YYYY"),
      endDate: dayjs(hunt.end_date).format("MM/DD/YYYY"),
      recallMessage: hunt.recall_message,
      multipleDays: dayjs(hunt.end_date).isAfter(hunt.start_date),
    };
  }

  async goto() {
    await this.gotoContentPage();
  }

  async openEditDialog() {
    const button = this.page.getByRole("button", {
      name: "Edit details",
    });

    await button.click();
    await this.dialog.waitFor({ state: "visible" });
  }

  /**
   * @todo Add validaiton for the changing of "isMultipleDays" checkbox
   */
  async setHuntValues(newValues?: HuntFormValues) {
    const values: HuntFormValues = {
      ...this.originalFormValues,
      ...newValues,
    };

    await this.dialog.getByLabel("Hunt Name").fill(values.name);
    await this.dialog.getByLabel("Start Date").fill(values.startDate);
    await this.dialog.getByLabel("End Date").fill(values.endDate);
    await this.dialog
      .getByTestId("update-hunt-recall-message")
      .fill(values.recallMessage);
    if (this.originalFormValues.multipleDays !== values.multipleDays) {
      await this.dialog.getByRole("checkbox").check();
    }
  }

  async resetInfo() {
    await this.openEditDialog();
    await this.setHuntValues();
    await this.dialog.getByRole("button", { name: "Update hunt" }).click();
    await this.dialog.waitFor({ state: "hidden" });
  }
}
