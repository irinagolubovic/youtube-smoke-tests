import {
    expect,
    type Locator,
    type Page,
} from '@playwright/test';

import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
    readonly videoResults: Locator;
    readonly firstVideoResult: Locator;
    readonly firstVideoTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.videoResults = page.locator('ytd-video-renderer');
        this.firstVideoResult = this.videoResults.first();
        this.firstVideoTitle = this.firstVideoResult.locator('#video-title').first();
    }

    getFirstVideoResult() {
        return this.firstVideoResult;
    }

    getFirstVideoTitle() {
        return this.firstVideoTitle;
    }

    async assertSearchResultsDisplayed() {
        await expect(this.page).toHaveURL(/\/results\?search_query=/);
        await expect(this.firstVideoResult).toBeVisible();
        await expect(this.firstVideoTitle).toBeVisible();
    }

    async openFirstVideo() {
        await expect(this.firstVideoTitle).toBeVisible();
        await this.firstVideoTitle.click();
        await expect(this.page).toHaveURL(/\/watch\?v=/,);}
}