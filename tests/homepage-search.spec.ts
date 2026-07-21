import { test, expect } from '@playwright/test';
import { testData } from '../pages/test-data/testData';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test.describe('TS-01 Homepage Loading and Search Validation', () => {
  test('TC-001 Verify homepage loads successfully and user can search for videos', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);

    await test.step('Open the YouTube homepage', async () => {
      await homePage.open();

      await expect(page).toHaveTitle(/YouTube/i); //nigga what?
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