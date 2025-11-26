import { expect } from '@playwright/test';

export class APIUtil {
  constructor(apiContext, payload) {
    this.apiContext = apiContext;
    this.payload = payload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      { data: this.payload }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const jsonResponse = await loginResponse.json();
    return jsonResponse.token;
  }
}
