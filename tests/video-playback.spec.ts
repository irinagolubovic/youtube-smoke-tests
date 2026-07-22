import { test, expect } from "./BaseTest";
import { testData } from "../pages/test-data/testData";

test.describe('Video Playback Validation', () => {
    test('Verify user can open a video from search rsults', async ({ page, homePage, searchResultsPage, videoPage }) => {  

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
      });
    }
  );    
