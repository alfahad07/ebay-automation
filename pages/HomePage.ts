// pages/HomePage.ts
// Home Page Object - Simple and Clear

import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;
    
    // Selectors
    private searchBox = 'input[type="text"][placeholder*="Search"]';
    
    constructor(page: Page) {
        this.page = page;
    }
    
    // Navigate to eBay
    async open() {
        await this.page.goto('https://www.ebay.com');
        await this.page.waitForTimeout(5000);
    }
    
    // Search for a product
    async searchProduct(productName: string) {
        await this.page.fill(this.searchBox, productName);
        await this.page.press(this.searchBox, 'Enter');
    }
}