import { test } from './BaseTest';

test('User can open Shorts and return home', async ({ homePage, navigationPage }) => {
    await homePage.open();
    await homePage.assertHomepageLoaded();

    await navigationPage.assertMainNavigationDisplayed();
    await navigationPage.openShorts();
    await navigationPage.assertShortsOpened();
    await navigationPage.returnToHomepage();
    await navigationPage.assertHomepageOpened();

    await homePage.assertHomepageLoaded();
});