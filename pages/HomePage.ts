import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly youtubeLogo: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly signInButton: Locator;
    readonly mainNavigation: Locator;

    constructor(page: Page) {
        super(page);

        this.youtubeLogo = page.getByRole('link', { name: 'YouTube Home' }).first();
        this.searchInput = page.getByRole('combobox', { name: 'Search' });
        this.searchButton = page.getByRole('button', { name: 'Search', exact: true }).first();
        this.signInButton = page.getByRole('link', { name: 'Sign in', exact: true }).first();
        this.mainNavigation = page.locator('#start #guide-button');
    }

    async open() {
        await this.navigateTo('/');
    }

    async assertHomepageLoaded() {
        await expect(this.page).toHaveURL(/^https:\/\/www\.youtube\.com\/?$/);
        await expect(this.youtubeLogo).toBeVisible();
        await expect(this.searchInput).toBeVisible();
        await expect(this.searchButton).toBeVisible();
        await expect(this.mainNavigation).toBeVisible();
    }

    async searchFor(searchTerm: string) {
        await expect(this.searchInput).toBeVisible();
        await this.searchInput.fill(searchTerm);
        await this.searchInput.press('Enter');
        await expect(this.page).toHaveURL(/\/results\?search_query=/);
    }

    async openSignInPage() {
        await expect(this.signInButton).toBeVisible();
        await this.signInButton.click();
    }
}