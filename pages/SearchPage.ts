// pages/SearchPage.ts
// Search Results Page Object - Simple and Clear

import { Page } from '@playwright/test';

export class SearchPage {
    private page: Page;
    
    // Selectors
    private searchResults = '#srp-river-results';
    private firstProduct = '#item1d40be8452';
    
    constructor(page: Page) {
        this.page = page;
    }
    
    // Wait for search results to load
    async waitForResults() {
        await this.page.waitForSelector(this.searchResults, { timeout: 20000 });
    }
    
    // Click the first product
    async clickFirstProduct() {
        await this.page.click(this.firstProduct);
        await this.page.waitForTimeout(3000);
    }
    
    // Get number of search results
    async getResultsCount(): Promise<number> {
        return await this.page.locator(this.searchResults).count();
    }
}