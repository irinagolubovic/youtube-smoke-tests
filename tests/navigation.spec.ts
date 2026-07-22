import { test, expect } from './BaseTest';


test.describe('Navigation Validation', () => {
    test('Verify user can navigate to Explore and return to homepage', async ({page, homePage, navigationPage}) => {

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