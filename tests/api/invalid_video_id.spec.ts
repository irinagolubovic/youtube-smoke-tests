import { test, expect } from '@playwright/test';

const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

if(!API_KEY) {
    throw new Error("YOUTUBE_API_KEY is not set. Check your .env file.");
}

test('videos endopoint returns empty result for non-existing video ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/videos`, {
        params: {
            part: "snippet",
            id: "non-existing-video-id",
            key: API_KEY,
        }
    })

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.items.length).toBe(0);
})

test('videos endpoint returns 400 for missing required parameter', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/videos`, {
        params: {
            part: "snippet",
            key: API_KEY,
        },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error.message).toBeTruthy();
});

test('videos endpoint return 400 for invalid API key', async ({ request}) => {
    const response = await request.get(`${BASE_URL}/videos`, {
        params: {
            part: "snippet", 
            id: "dQw4w9WgXcQ",
            key: "invalid_key",
        }
    })

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error.status).toBe('INVALID_ARGUMENT');
})