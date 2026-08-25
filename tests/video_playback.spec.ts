import { test } from './BaseTest';
import { testData } from '../pages/test-data/testData';

test('User can open a video', async ({ homePage, searchResultsPage, videoPage }) => {
    await homePage.open();
    await homePage.assertHomepageLoaded();
    await homePage.searchFor(testData.searchTerm);
    await searchResultsPage.assertSearchResultsDisplayed();
    await searchResultsPage.openFirstVideo();
    await videoPage.assertVideoPageOpened();
});