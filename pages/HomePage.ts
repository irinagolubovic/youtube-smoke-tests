import { type Locator, type Page } from '@playwright/test';
import { testData } from './test-data/testData';
import { BasePage } from './BasePage';

export class HomePage extends BasePage{
  readonly youtubeLogo: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly navigationMenu: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);

    this.youtubeLogo = page.getByRole('link', { name: 'YouTube Home' });
    this.searchInput = page.getByPlaceholder('Search');
    this.searchButton = page.locator('button[aria-label="Search"]').first();
    this.navigationMenu = page.locator('#guide-button').first();
    this.signInButton = page.getByLabel('Sign in');
  }

  async open(){
    await this.page.goto('/');
  }

  async searchFor(searchTerm: string) {
    await this.searchInput.fill(testData.searchTerm);
    await this.searchButton.click();
  }

  async openSignInPage() {
    await this.signInButton.click();
  }
}