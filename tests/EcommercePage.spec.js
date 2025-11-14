import { test,expect } from "@playwright/test";
test('End to End scenario for ecommerce', async ({ page }) => {
    const product = 'ZARA COAT 3';
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('#userEmail').fill('ksubhash30@gmail.com');
  await page.locator('#userPassword').fill('@1CR08ec1');
  await page.locator('#login').click();
  await page.locator('//div[@class="container"]//div[@class="row"]/child::div').first().waitFor();
  const list =  page.locator('//div[@class="container"]//div[@class="row"]/child::div');
  console.log(list);
   const count=await list.count();
  for(let i=0;i<count;i++)
  {
     if(await list.nth(i).locator("b").textContent() === product)
     {
        await list.nth(i).locator("text= Add To Cart").click();
        break;
     }
  }
  await page.waitForTimeout(5000);

})