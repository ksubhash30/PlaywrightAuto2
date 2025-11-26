export class DashboardPage{
    constructor(page)
    {
       this.list= page.locator('//div[@class="container"]//div[@class="row"]/child::div');
    }
}