import test, { expect } from "@playwright/test";
import { VideoPage } from "../pages/VideoPage";
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { testData } from "../pages/test-data/testData";

test.describe('TS-03 Video Playback Validation', () => {
    test('TC-003 Verify user can open a video from search rsults', async ({ page}) => {
        const homePage = new HomePage(page);
        const videoPage = new VideoPage(page);
        const searchResultsPage = new SearchResultsPage(page);

        await test.step('Open homepage and search', async() => {
            await homePage.open();
            await homePage.searchFor(testData.searchTerm);
            await expect(page).toHaveURL(/results\?search_query=/);
        })

       await test.step('Open and verify video page', async () => {
        await searchResultsPage.openFirstVideo();
        await expect(page).toHaveURL(/\/watch\?v=/);
        await expect(videoPage.videoPlayer).toBeVisible();
        await expect(videoPage.videoTitle).toBeVisible();
      });
    }
  );    
})