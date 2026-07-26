import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class VideoPage extends BasePage {
    readonly videoPlayer: Locator;
    readonly videoTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.videoPlayer = page.locator('#player video');
        this.videoTitle = page.locator('ytd-watch-metadata h1');
    }

    async assertVideoPageOpened(){
        await expect(this.page).toHaveURL(/\/watch\?v=/);
        await expect(this.videoPlayer).toBeVisible();
        await expect(this.videoTitle).toBeVisible();
    }
}