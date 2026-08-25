import { test, expect } from '@playwright/test';

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

if (!API_KEY) {
    throw new Error('YOUTUBE_API_KEY is not set. Check your .env file.');
}

test('most popular videos endpoint returns results', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/videos`, {
        params: {
            part: 'snippet,statistics',
            chart: 'mostPopular',
            regionCode: 'US',
            maxResults: 10,
            key: API_KEY,
        },
    });

    if (!response.ok()) {
        const errorBody = await response.text();
        console.log('API error:', response.status(), errorBody);
    }

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log('body: ', body);
    // console.log(JSON.stringify(body, null, 2));
    expect(body.items.length).toBeGreaterThan(0);

    const firstVideo = body.items[0];
    expect(firstVideo.id).toBeTruthy();
    expect(firstVideo.snippet.title).toBeTruthy();
    expect(firstVideo.statistics.viewCount).toBeTruthy();
});
