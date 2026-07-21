import { Locator, Page } from "@playwright/test";

export class SignInPage {
    readonly page: Page;

    readonly emailInput: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.locator('#identifierId');
    }
}