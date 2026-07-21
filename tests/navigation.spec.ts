import { test, expect } from "@playwright/test";
import { NavigationPage } from '../pages/NavigationPage';
import { HomePage } from "../pages/HomePage";


test.describe('TS-02 Navigation Validation', () => {
    test('TC-002 Verify user can navigate to Explore and return to homepage', async ({page}) => {
        const navigationPage = new NavigationPage(page);
        const homePage = new HomePage(page);


        await test.step('Open the YouTube homepage', async () => {
            await homePage.open();
            await expect(page).toHaveURL('https://www.youtube.com/');
        })

        await test.step('Navigate to the Explore section', async () => {
            await navigationPage.openExploreMenu();
            await expect(navigationPage.shortsLink).toBeVisible();
        })

        await test.step('Navigate to Shorts section', async () => {
            await navigationPage.openShorts();
            await expect(page).toHaveURL(/\/shorts(\/|$)/);
        })

        await test.step('Return to homepage', async () => {
            await navigationPage.returnToHomepage();
            await expect(page).toHaveURL('https://www.youtube.com/');
        })
    })



})