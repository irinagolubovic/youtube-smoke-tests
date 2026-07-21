import { Locator, Page } from "@playwright/test";


export class NavigationPage {
  readonly page: Page;

  readonly exploreMenu: Locator;
  readonly shortsLink: Locator;
  readonly logoButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.exploreMenu = page.locator('#guide-button').first();
    this.shortsLink = page.getByRole('link', { name: 'Shorts' }).first();
    this.logoButton = page.getByRole('link', { name: 'Home' }).first();

  }

async openExploreMenu() {
    await this.exploreMenu.click();
}

async openShorts() {
    await this.shortsLink.click();
}

async returnToHomepage() {
    this.logoButton.click();
}

}