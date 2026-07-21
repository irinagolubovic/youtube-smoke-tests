import { Locator, Page } from "@playwright/test";

export class VideoPage {
    readonly page: Page;

    readonly videoTitle: Locator;
    readonly videoPlayer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.videoPlayer = page.locator('#movie_player video');
        this.videoTitle = page.locator('ytd-watch-metadata h1');
    }
}