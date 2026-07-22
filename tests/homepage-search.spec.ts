import { test, expect } from './BaseTest';
import { testData } from '../pages/test-data/testData';

test.describe('Homepage Loading and Search Validation', () => {
  test('Verify homepage loads successfully and user can search for videos', async ({ page, homePage, searchResultsPage }) => {

    await test.step('Open the YouTube homepage', async () => {
      await homePage.open();

      await expect(page).toHaveTitle(/YouTube/i); 
      await expect(homePage.youtubeLogo).toBeVisible();
      await expect(homePage.searchInput).toBeVisible();
      await expect(homePage.searchButton).toBeVisible();
      await expect(homePage.navigationMenu).toBeVisible();
    });

    await test.step('Search for videos', async () => {
      await homePage.searchFor(testData.searchTerm);
    });

    await test.step('Verify search results', async () => {
      await expect(page).toHaveURL(/results\?search_query=/);
      await expect(searchResultsPage.getFirstVideoResult()).toBeVisible();
      await expect(searchResultsPage.getFirstVideoTitle()).toBeVisible();
      await expect(searchResultsPage.getFirstVideoThumbnail()).toBeVisible();
    });
  });
});