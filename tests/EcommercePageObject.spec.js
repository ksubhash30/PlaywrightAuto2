import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";
import { LoginPage } from '../pageobjects/LoginPage.js';
import {DashboardPage} from '../pageobjects/DashboardPage.js';
//import {data} from '../utils/PlaceordeData.json';
const data = require("../utils/PlaceordeData.json");
for(const val of data){
test(`End to End scenario for ecommerce nPage Object ${val.username}`, async ({ page }) => {
    
   const jsonData1 = JSON.parse(JSON.stringify(data));
    const product = 'ZARA COAT 3';   
    const loginPage= new LoginPage(page);
    loginPage.goToURL();  
    loginPage.validLogin(val.username,val.password); 
    const dashboard= new DashboardPage(page);
    await dashboard.list.first().waitFor(); 
    console.log(dashboard.list);
    const count = await dashboard.list.count();
    for (let i = 0; i < count; i++) {
        if (await dashboard.list.nth(i).locator("b").textContent() === product) {
            await dashboard.list.nth(i).locator("text= Add To Cart").click();
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
   // await page.pause();


})}