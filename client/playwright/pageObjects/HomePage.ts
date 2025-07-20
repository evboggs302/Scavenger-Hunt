import { Locator, Page } from "@e2e/e2eTest";

export class HomePage {
  readonly page: Page;
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator("a", { hasText: "Get started" });
  }

  async goto() {
    await this.page.goto("/app");
    await this.page.waitForURL(/app/);
  }

  async gotoExistingHunt() {
    const destination = "/app/hunt/687bb01ae9ae2fdfe9514689";
    await this.page.goto(destination);
    await this.page.waitForURL(/687bb01ae9ae2fdfe9514689/);
  }

  async createNewHunt() {}
}
