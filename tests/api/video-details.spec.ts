import { test , expect } from '@playwright/test';


const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

if(!API_KEY) {
    throw new Error("YOUTUBE_API_KEY is not set. Check your .env file.");
}

test('video endpoint return details for a specific video', async ({ request}) => {
    const searchResponse = await request.get(`${BASE_URL}/search`, {
        params: {
            part: 'snippet',
            q: 'Playwright tutorial',
            type: 'video',
            maxResults: 1,
            key: API_KEY,
        }
    })

    expect(searchResponse.ok()).toBeTruthy();

    const body = await searchResponse.json();
    console.log(JSON.stringify(body, null, 2));
    expect(body.items.length).toBeGreaterThan(0);
    const videoId = body.items[0].id.videoId;
    expect(videoId).toBeTruthy();

    const videoResponse = await request.get(`${BASE_URL}/videos`, {
        params: {
            part: 'snippet,statistics,contentDetails',
            id: videoId,
            key: API_KEY,
        }
    })

    if (!videoResponse.ok()) {
        const errorBody = await videoResponse.text();
        console.log('API error:', videoResponse.status(), errorBody);
    }

    expect(videoResponse.ok()).toBeTruthy();
    const videoBody = await videoResponse.json();
    console.log(JSON.stringify(videoBody, null, 2));
    expect(videoBody.items.length).toBe(1)

    const video = videoBody.items[0];
    expect(video.id).toBe(videoId);
    console.log('videoId: ', videoId);
    expect(video.snippet.title).toBeTruthy();
    expect(video.statistics.viewCount).toBeTruthy();
    expect(video.contentDetails.duration).toBeTruthy();
})
