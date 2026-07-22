import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage{
    readonly videoResults: Locator;
    readonly videoTitles: Locator;
    readonly videoThumbnails: Locator;

    constructor(page:  Page) {
        super(page);

        this.videoResults = page.locator('ytd-video-renderer');
        this.videoTitles = this.videoResults.locator('a#video-title');
        this.videoThumbnails = this.videoResults.locator('a#thumbnail');
    }

    getFirstVideoResult() {
        return this.videoResults.first();
    }

    getFirstVideoTitle() {
        return this.videoTitles.first();
    }

    getFirstVideoThumbnail() {
        return this.videoThumbnails.first();
    }

    async openFirstVideo() {
    await this.getFirstVideoTitle().click();
}
}