// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
import { permission } from 'process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
 const config=({
  testDir: './tests',  
  retries:1,
  worker:2,
  timeout: 30*1000,
  headless:true,
  expect:{
    timeout:5000
  },
  reporter:'html',
  projects:[
  /*  {
    name:'firefox',    
    use: {
    browserName:'webkit',
    headless:false,
    screenshot:'on',
    trace:'retain-on-failure', 
    video:'retain-on-failure',  
    //...devices['iPhone 11'],
   
  }
 },*/
{  
    name:'chrome',    
    use: {
    browserName:'chromium',
    headless:false,
    screenshot:'on',
    trace:'retain-on-failure',
    video:'retain-on-failure',
    //...devices['iPhone 11'],
    //viewport:{width:720,height:720}
    ignoreHttpsErrors:true,  //ssl cert handling
    permissions:['geolocation']//location permission handling
  }
}]

  
  
  
});
module.exports=config

