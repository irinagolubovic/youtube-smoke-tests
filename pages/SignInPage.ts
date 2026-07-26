import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {
    readonly emailInput: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.locator('#identifierId');
    }

    async assertSignInPageOpened() {
        await expect(this.page).toHaveURL(/accounts\.google\.com/);
        await expect(this.emailInput).toBeVisible();
    }
}