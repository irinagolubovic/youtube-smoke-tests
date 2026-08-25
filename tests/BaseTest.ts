import { test as base, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { NavigationPage } from '../pages/NavigationPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { SignInPage } from '../pages/SignInPage';
import { VideoPage } from '../pages/VideoPage';

type PageFixtures = {
    homePage: HomePage;
    navigationPage: NavigationPage;
    searchResultsPage: SearchResultsPage;
    signInPage: SignInPage;
    videoPage: VideoPage;
};

//kreireamo page objecte i ubacujemo u spec fajlove da ne bi morali to raditi u svakom fajlu ponaosob
//svaki test dobija page object dependencies 
export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    navigationPage: async ({ page }, use) => {
        await use(new NavigationPage(page));
    },

    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },

    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },

    videoPage: async ({ page }, use) => {
        await use(new VideoPage(page));
    },
});

test.beforeEach(async ({ page }) => {
    await page.goto('/', {
        waitUntil: 'domcontentloaded',
    });
});

test.afterEach(async () => {
    console.log('Smoke test completed');
});


export { expect };