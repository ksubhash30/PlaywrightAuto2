import { test, expect, request } from '@playwright/test';
import { APIUtil } from '../utils/APIUtil.js';   // make sure path is correct

const payload = { 
  userEmail: "ksubhash30@gmail.com", 
  userPassword: "@1CR08ec1"
};

let token;
let apiContext;
//test.describe.configure({mode:'parallel'})  // for parallel exectuion
//test.describe.configure({mode:'serial'})  // skip the following tests if any failure
test.beforeAll(async () => {
  apiContext = await request.newContext();
});

test('Skip login by setting token in local storage', async ({ page }) => {
  const utils = new APIUtil(apiContext, payload);
  token = await utils.getToken();

  page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
});
