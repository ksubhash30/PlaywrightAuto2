import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";
test('End to End scenario for ecommerce', async ({ page }) => {
    const product = 'ZARA COAT 3';
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('ksubhash30@gmail.com');
    await page.locator('#userPassword').fill('@1CR08ec1');
    await page.locator('#login').click();
    await page.locator('//div[@class="container"]//div[@class="row"]/child::div').first().waitFor();
    const list = page.locator('//div[@class="container"]//div[@class="row"]/child::div');
    console.log(list);
    const count = await list.count();
    for (let i = 0; i < count; i++) {
        if (await list.nth(i).locator("b").textContent() === product) {
            await list.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionCount; ++i) {
        let text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderIdTrimmed=orderId.replace(/\|/g,"").trim();
    console.log(orderIdTrimmed);
    await page.locator('label:has-text("Orders History Page")').click();
    const alltableRows=await page.locator('tbody tr');
    const rowCount= await alltableRows.count();
    for(let i=0;i< rowCount;i++)
    {
       const rowOrderId= await alltableRows.nth(i).locator('th').textContent();
       if(orderIdTrimmed.includes(rowOrderId.trim()))
       {
         await alltableRows.nth(i).locator("button").first.click();
         break;
       }
    }    
    await page.pause();

})