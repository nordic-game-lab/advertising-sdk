/** 
* @license MPL 2.0
* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/
import { test, expect } from '@playwright/test';
import express from "express";
import path from 'node:path'
import { fileURLToPath } from 'node:url';

test('should create and append ad element', async ({ page }) => {
  // Set up the HTML content
    const app = express();
    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename);
    app.use(express.static(path.join(__dirname, 'public')));
    const server = app.listen(3000, async() => {
        await page.goto('http://localhost:3000');
        // Wait for the ad element to be appended
        await page.waitForSelector('#ad-container a img');

        // Check if the ad element is correctly appended
        const adElement = await page.$('#ad-container a');
        expect(adElement).not.toBeNull();

        // Check if the image element has the correct attributes
        const imgElement = await adElement.$('img');
        const src = await imgElement.getAttribute('src');
        const alt = await imgElement.getAttribute('alt');
        const width = await imgElement.evaluate((el) => el.style.width);

        expect(src).not.toBeNull();
        expect(alt).toBe('Advertisement Image');
        expect(width).not.toBeNull();
    });
    server.close();
});
