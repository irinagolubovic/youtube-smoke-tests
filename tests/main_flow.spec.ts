import { test } from './BaseTest';
import { testData } from '../pages/test-data/testData';

test.skip(!!process.env.CI, 'Skipped on CI: YouTube blocks watch page with bot-check on CI IPs');

test('YouTube main flow', async ({ homePage, searchResultsPage, videoPage }) => {
    await homePage.assertHomepageLoaded();
    await homePage.searchFor(testData.searchTerm);
    await searchResultsPage.assertSearchResultsDisplayed();
    await searchResultsPage.openFirstVideo();
    await videoPage.assertVideoPageOpened();
});