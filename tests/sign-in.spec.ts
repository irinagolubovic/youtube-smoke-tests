import { test } from './BaseTest';

test('User can open the Sign-In page', async ({ homePage, signInPage }) => {
    await homePage.open();
    await homePage.assertHomepageLoaded();
    await homePage.openSignInPage();
    await signInPage.assertSignInPageOpened();
});