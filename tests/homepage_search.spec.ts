import { test } from './BaseTest';
import { testData } from '../pages/test-data/testData';

test('Homepage loads and user can search', async ({ homePage, searchResultsPage }) => {
    await homePage.assertHomepageLoaded();
    await homePage.searchFor(testData.searchTerm);
    await searchResultsPage.assertSearchResultsDisplayed();
    await searchResultsPage.openFirstVideo();
});