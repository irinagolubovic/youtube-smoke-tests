import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignInPage extends BasePage {
    readonly emailInput: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.locator('#identifierId');
    }
}