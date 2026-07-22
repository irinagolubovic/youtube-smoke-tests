import { test as base, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { NavigationPage } from '../pages/NavigationPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { SignInPage } from '../pages/SignInPage';
import { VideoPage } from '../pages/VideoPage';

type Fixtures = {
    homePage: HomePage;
    navigationPage: NavigationPage;
    searchResultsPage: SearchResultsPage;
    signInPage: SignInPage;
    videoPage: VideoPage;
};

const test = base.extend<Fixtures>({
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

export { test, expect };