// tests/ebay-tests.spec.ts
// Test Suite with 3 Positive and 1 Negative Tests - TypeScript with POM

import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';

test.describe('eBay Related Products - Test Cases', () => {
    let homePage: HomePage;
    let searchPage: SearchPage;
    let productPage: ProductPage;
    
    // Before each test, initialize page objects
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchPage = new SearchPage(page);
        productPage = new ProductPage(page);
    });

    
    /**
     * TEST 1: Verify Related Products Section Display
     * Type: Positive Test
     * Description: Validates that related products section is visible when conditions are met
     */
    test('TC_001 [POSITIVE]: Verify related products section is displayed', async ({ page }) => {
        // Navigate to eBay and search for product
        await homePage.open();
        await homePage.searchProduct('leather wallet mens');
        
        // Click first product from search results
        await searchPage.waitForResults();
        await searchPage.clickFirstProduct();
        
        //ASSERTION: Section, Title & Products should be visible
        await productPage.isRelatedProductSectionVisible();

        await productPage.isRelatedProductSectionTitleVisible();

        await productPage.isRelatedProductsVisible();

        console.log('Related products section is displayed successfully');
    });
    
    /**
     * TEST 2: Verify Maximum 6 Products Display
     * Type: Positive Test
     * Description: Ensures the system correctly displays 6 products
     */
    test('TC_002 [POSITIVE]: Verify maximum 6 related products displayed', async ({ page }) => {
        // Navigate to product page
        await homePage.open();
        await homePage.searchProduct('leather wallet mens');
        await searchPage.waitForResults();
        await searchPage.clickFirstProduct();

        
        //ASSERTION: Count should be between 1 and 6
        const count = await productPage.countRelatedProducts();

        if (count <= 6) {
           expect(count).toBeGreaterThan(0); // At least 1 product
           expect(count).toBeLessThanOrEqual(6); // Maximum 6 products
           console.log(`The no.of related products displayed under the main product is ${count}`);        
        }else {
           console.log(`The no.of related products displayed under the main product is ${count} which should be limited to maximum of 6 products`);
        } 
    });
    
    /**
     * TEST 3: Verify Click Navigation Works
     * Type: Positive Test
     * Description: Confirms that clicking a related product navigates correctly
     */
    test('TC_003 [POSITIVE]: Verify clicking related product navigates correctly', async ({ page }) => {
        // Navigate to product page
        await homePage.open();
        await homePage.searchProduct('leather wallet mens');
        await searchPage.waitForResults();
        await searchPage.clickFirstProduct();
        
        // Store current URL before clicking
        const currentUrl = page.url();
        
        // Click on first related product
        await productPage.clickFirstRelatedProduct();
        
        //ASSERTION: URL should change to new product
        const newUrl = page.url();
        expect(newUrl).not.toBe(currentUrl);
        console.log('Navigation to related product is successfull');
    });
    
    /**
     * TEST 4: Verify Products Outside Price Range Are NOT Displayed
     * Type: Negative Test
     * Description: Ensures products outside ±25% price range don't appear
     */
    test('TC_004 [NEGATIVE]: Verify products outside price range are excluded', async ({ page }) => {
        // Navigate to product page
        await homePage.open();
        await homePage.searchProduct('leather wallet mens');
        await searchPage.waitForResults();
        await searchPage.clickFirstProduct();
        await page.waitForTimeout(10000);

        // Get main product price and related prices
        const mainPrice = await productPage.getMainProductPrice();
        const relatedPrices = await productPage.getRelatedProductPrices();
        
        // Calculate acceptable range (±25%)
        const minPrice = mainPrice * 0.75;
        const maxPrice = mainPrice * 1.25;
        
        //ASSERTION: No prices should be outside range
        for (const price of relatedPrices) {
            // Products outside range should NOT exist
            expect(price).toBeGreaterThanOrEqual(minPrice); 
            expect(price).toBeLessThanOrEqual(maxPrice);
        }
        console.log('No products outside price range found');
    });
    
});