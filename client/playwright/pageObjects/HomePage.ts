import { Page } from "@e2e/e2eTest";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/app");
    await this.page.waitForURL(/app/);
  }
}
