import { test, expect } from '@playwright/test';
test('Hidden page validation', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/")
    //await page.goBack();
    // await page.goForward();
    await page.locator('#displayed-text').isVisible();
    await page.locator('#displayed-text').screenshot({ path: 'partialscreen shot.png' });
    await page.locator('#hide-textbox').click();
    await page.screenshot({ path: 'screenshot.png' })
    await page.locator('#displayed-text').isHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    //await page.locator(text='Reload').click();

    /* Testing frames*/
    const framePage = await page.frameLocator('#courses-iframe');
    await framePage.locator('div.hidden  a[href *="learning-paths"]').click();
    console.log(await framePage.locator('div h1').textContent());





})
//visual testing comparing images
test('match screen shot', async ({ page }) => {
    await page.goto("https://google.com/");
    expect(await page.screenshot()).toMatchSnapshot('google.png');
})