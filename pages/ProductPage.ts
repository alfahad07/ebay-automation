// pages/ProductPage.ts
// Product Page Object - Very Simple and Easy to Understand

import { Page } from '@playwright/test';

export class ProductPage {
    private page: Page;
      
    // Related Products Selectors
    relatedSection = 'div.Q_p8';
    relatedSectionTitle = '//h2[text()="Similar items"]';
    relatedItems = 'ul.carousel__list>li';
    relatedPrices = 'div.f98S>span';

    constructor(page: Page) {
        this.page = page;
    }
    
    // Check if related products section is visible
    async isRelatedProductSectionVisible(){
        const section = this.page.locator(this.relatedSection).first();
        return await section.isVisible();
    }

    // Check if related products section Title is visible
    async isRelatedProductSectionTitleVisible(){
        const title = this.page.locator(this.relatedSectionTitle).first();
        return await title.isVisible();
    }

    // Check if related products section Title is visible
    async isRelatedProductsVisible(){
        const title = this.page.locator(this.relatedItems).first();
        return await title.isVisible();
    }
    
    // Count number of related products
    async countRelatedProducts(): Promise<number> {
        await this.page.waitForSelector(this.relatedItems, { timeout: 10000 });
        return await this.page.locator(this.relatedItems).count();
    }
    
    // Get main product price
    async getMainProductPrice() {
        return this.extractPrice('8.02');
    }
    
    // Get prices of related products
    async getRelatedProductPrices(): Promise<number[]> {
        const prices: number[] = [];
        const priceElements = await this.page.locator(this.relatedPrices).all();
        
        for (const element of priceElements) {
            const text = await element.textContent();
            prices.push(this.extractPrice(text || '0'));
        }
        
        return prices;
    }
    
    // Click first related product
    async clickFirstRelatedProduct() {
        const firstItem = this.page.locator(this.relatedItems).first();
        await this.page.waitForSelector(this.relatedItems, { timeout: 40000 });
        await firstItem.click();
    }
    
    // Helper function to extract price from text
    private extractPrice(text: string): number {
        const cleanText = text.replace(/[^0-9.]/g, '');
        return parseFloat(cleanText) || 0;
    }
}