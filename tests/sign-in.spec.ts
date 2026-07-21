import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SignInPage } from "../pages/SignInPage";;

test.describe("TS-04 Sign In Page Accessibillity", () => {
    test("TC-004 Verify user can open sign-in page", async ({page}) => {
        const homePage = new HomePage(page);
        const signInPage = new SignInPage(page);

        await test.step("Open youtube homepage", async() => {
            await homePage.open();
            await expect(page).toHaveTitle(/YouTube/i);
        })
        await test.step("Open Sign In page", async() => {
            await homePage.openSignInPage();
            await expect(page).toHaveURL(/accounts\.google\.com/);
        })
        await test.step("Verify Sign In page", async() => {
            await expect(signInPage.emailInput).toBeVisible();
        }) 
    })
})