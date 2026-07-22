import { test, expect } from "./BaseTest";


test.describe("Sign In Page Accessibillity", () => {
    test("Verify user can open sign-in page", async ({ homePage, page, signInPage }) => {

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