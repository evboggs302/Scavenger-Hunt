import { Page } from "@e2e/e2eTest";

export class AccountPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/app/account");
    await this.page.waitForURL(/account/);
  }
}
