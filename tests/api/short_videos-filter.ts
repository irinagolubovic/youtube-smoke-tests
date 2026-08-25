// tests/api/navigation.spec.ts
import { test, expect } from '@playwright/test';

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

if (!API_KEY) {
    throw new Error('YOUTUBE_API_KEY is not set. Check your .env file.');
}

function parseDurationToSeconds(isoDuration: string): number {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = parseInt(match?.[1] ?? '0', 10);
    const minutes = parseInt(match?.[2] ?? '0', 10);
    const seconds = parseInt(match?.[3] ?? '0', 10);
    return hours * 3600 + minutes * 60 + seconds;
}

test('search endpoint returns short-duration videos', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/search`, {
        params: {
            part: 'snippet',
            q: 'shorts',
            type: 'video',
            videoDuration: 'short',
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
    expect(body.items.length).toBeGreaterThan(0);

    const videoIds = body.items.map((item: any) => item.id.videoId).join(',');
    console.log(`Video IDs: ${videoIds}`);
    const videoResponse = await request.get(`${BASE_URL}/videos`, {
        params: {
            part: 'contentDetails',
            id: videoIds,
            key: API_KEY,
        },
    });

    expect(videoResponse.ok()).toBeTruthy();

    const videoBody = await videoResponse.json();

    for (const video of videoBody.items) {
        const durationInSeconds = parseDurationToSeconds(video.contentDetails.duration);
        console.log(`Video ${video.id}: ${durationInSeconds}s`);
        expect(durationInSeconds).toBeLessThanOrEqual(300);
    }
});