import { expect, test } from "@playwright/test";
test('New locators tests', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').check();
    await page.getByPlaceholder('Password').fill("abc123");
    await page.getByRole('button', { name: 'Submit' }).click();




})
