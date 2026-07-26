import { expect, type Locator, type Page, } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
    readonly miniNavigation: Locator;
    readonly homeLink: Locator;
    readonly shortsLink: Locator;

    constructor(page: Page) {
        super(page);

        this.miniNavigation = page.getByRole('navigation').last();
        this.homeLink = this.miniNavigation.getByRole('link', { name: 'Home', exact: true });
        this.shortsLink = this.miniNavigation.getByRole('link', { name: 'Shorts', exact: true });
    }

    async assertMainNavigationDisplayed() {
        await expect(this.miniNavigation).toBeVisible();
        await expect(this.homeLink).toBeVisible();
        await expect(this.shortsLink).toBeVisible();
    }

    async openShorts() {
        await expect(this.shortsLink).toBeVisible();

        await Promise.all([
            this.page.waitForURL(/\/shorts\/?/),
            this.shortsLink.click(),
        ]);
    }

    async assertShortsOpened() {
        await expect(this.page).toHaveURL(/\/shorts\/?/);
    }

    async returnToHomepage() {
        await expect(this.homeLink).toBeVisible();

        await Promise.all([
            this.page.waitForURL(/^https:\/\/www\.youtube\.com\/?$/),
            this.homeLink.click(),
        ]);
}

    async assertHomepageOpened() {
        await expect(this.page).toHaveURL(
            /^https:\/\/www\.youtube\.com\/?$/
        );
    }
}
