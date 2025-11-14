const { test, expect } = require('@playwright/test');
const { report } = require('process');
test('First playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  //css predomintaly used in playwright
  await page.locator('#username').fill("rahulshetty");
  await page.locator('#password').fill("learning");
  await page.locator('[name="signin"]').click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText('corrected');

});

test('Second test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  //get title
  console.log(await page.title());
  await expect(page).toHaveTitle('Google')
});

test('Login success', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  //css predomintaly used in playwright
  await page.locator('#username').fill("rahulshettyacademy");
  await page.locator('#password').fill("learning");
  await page.locator('[name="signin"]').click();
  const alltitles = await page.locator('.card-body a').allTextContents();
  console.log(alltitles);
  //await page.locator('.card-body a').nth(0).click();

});
test('registration', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.waitForLoadState('networkidle');
  await page.locator('.text-reset').click();
  await page.locator('#firstName').fill('ksubhash');
  await page.locator('#userEmail').fill('ksubhash30@gmail.com');
  await page.locator('#lastName').fill('Keragute');
  await page.locator('#userMobile').fill('8088007231');
  await page.locator('#userPassword').fill('@Advik123');
  await page.locator('#confirmPassword').fill('@Advik123');//value="Male"
  await page.locator('[value="Male"]').check();
  await page.locator('[type="checkbox"]').check();
  await page.waitForSelector('form', { state: 'visible', timeout: 15000 });
  const dropdown = page.locator("//select[@formcontrolname='occupation']");
  await dropdown.waitFor({ state: 'visible', timeout: 10000 });
  await dropdown.selectOption({ label: 'Engineer' });
  await page.locator('#login').click();
  await page.waitForTimeout(10000);

})
test('login product page', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('#userEmail').fill('ksubhash30@gmail.com');
  await page.locator('#userPassword').fill('@1CR08ec1');
  await page.locator('#login').click();
  await page.locator('//div[@class="container"]//div[@class="row"]/child::div').first().waitFor();
  const list = await page.locator('//div[@class="container"]//div[@class="row"]/child::div').allTextContents();
  console.log(list);
  await page.waitForTimeout(5000);

})

test('login to academy', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill("rahulshettyacademy");
  await page.locator('#password').fill("learning");
  await page.locator('[value = "user"]').click();
  await page.locator('#okayBtn').click();
  expect(await page.locator('[value = "user"]')).toBeChecked();
  const dropdown = await page.locator('select.form-control');
  await dropdown.selectOption('Consultant');
  await page.locator('#terms').check();
  await page.locator('[name="signin"]').click();
  await expect(page).toHaveTitle('ProtoCommerce');

})

test('switching to new page', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const link = page.locator('.blinkingText');

  const [newpage] = await Promise.all(
  [
    context.waitForEvent('page'),
    link.click(),
  ])
  const text =await newpage.locator(".red").textContent();
  console.log(text);
  console.log(await newpage.title);
})