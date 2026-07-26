import { type Page } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
        });
    }

    async waitForPageToLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}