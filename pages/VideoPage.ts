import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class VideoPage extends BasePage{
    readonly videoTitle: Locator;
    readonly videoPlayer: Locator;

    constructor(page: Page) {
        super(page);

        this.videoPlayer = page.locator('#movie_player video');
        this.videoTitle = page.locator('ytd-watch-metadata h1');
    }
}