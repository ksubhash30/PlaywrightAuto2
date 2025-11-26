const  base = require('@playwright/test');


   exports.customtest=base.test.extend(
    {
        testData:{
             username :"ksubhash30@gmail.com",
             password :"@1CR08ec1"
        }
    }
   )