# eBay Related Products Test Automation

## Overview
Professional test automation framework for eBay's Related Products feature using TypeScript and Page Object Model (POM) pattern. Tests verify that related products display correctly with maximum 6 items from the same category and price range.

## Project Structure
ebay-automation/
├── pages/                    # Page Object Model classes
│   ├── HomePage.ts           # Home page actions
│   ├── SearchPage.ts         # Search results actions
│   └── ProductPage.ts        # Product page actions
├── tests/                    # Test specifications
│   └── ebay-tests.spec.ts    # 4 essential test cases
├── test-results/             # Test execution results (generated)
├── playwright-report/        # HTML reports (generated)
├── package.json              # Dependencies
├── playwright.config.ts      # Playwright configuration
├── .gitignore                # Git ignore rules
└── README.md                 # This file

## Features
✅ **TypeScript** - Type safety and better IDE support  
✅ **Page Object Model** - Clean separation of test logic  
✅ **4 Essential Tests** - Covers critical functionality  
✅ **Simple Code** - Easy to understand and maintain  
✅ **Cross-browser Testing** - Chrome, Firefox  
✅ **Detailed Reporting** - HTML and JSON reports  

## Prerequisites
- Node.js v16+ installed
- Git installed
- Chrome browser installed (for initial testing)

## Installation

### 1. Clone or Create Project
```bash
mkdir ebay-automation
cd ebay-automation
```

### 2. Create Folder Structure
```bash
mkdir pages tests
```

### 3. Initialize and Install Dependencies
```bash
npm init -y
npm install --save-dev @playwright/test typescript @types/node
npx playwright install
```

### 4. Copy Project Files
Copy all TypeScript files to their respective folders as shown in the structure above.

## Test Cases

| Test ID |       Test Case          |                 Description                    | Priority |
|---------|--------------------------|------------------------------------------------|----------|
| TC_001  | Related Products Display | Verifies section is visible below main product |   High   |
| TC_002  | Maximum 6 Products       | Ensures no more than 6 products shown          |   High   |
| TC_003  | Price Range ±25%         | Validates products within price range          |   High   |
| TC_004  | Click Navigation         | Tests clicking navigates to product            |  Medium  |

## Running Tests

### Run All Tests
```bash
npm test
```

### Run with Browser Visible
```bash
npm run test:headed
```

### Run Specific Browser
```bash
npm run test:chrome
npm run test:firefox
```

### Debug Mode
```bash
npm run test:debug
```

### View HTML Report
```bash
npm run report
```

## Page Objects
### HomePage.ts
- `open()` - Navigates to eBay homepage
- `searchProduct(name)` - Searches for a product

### SearchPage.ts
- `waitForResults()` - Waits for search results to load
- `clickFirstProduct()` - Clicks the first search result
- `getResultsCount()` - Returns number of results

### ProductPage.ts
- `isRelatedProductSectionVisible()` - Checks if related products section exists
- `isRelatedProductSectionTitleVisible()` - Checks if related products section title exists
- `isRelatedProductsVisible()` - Checks if related products exists
- `countRelatedProducts()` - Returns number of related products
- `getMainProductPrice()` - Gets main product price
- `getRelatedProductPrices()` - Gets array of related product prices
- `clickFirstRelatedProduct()` - Clicks first related product

## Configuration Files
### playwright.config.ts
- Test timeout: 30 seconds
- Retries: 1
- Browsers: Chrome, Firefox
- Screenshots on failure
- Video recording on failure


## Troubleshooting
### Tests Failing?
- Check internet connection
- Update selectors if eBay changed HTML
- Run `npm run test:headed` to see browser actions


### Installation Issues?
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Element Not Found?
- eBay may have updated their UI
- Check selectors in ProductPage.ts
- Use Playwright Inspector: `npx playwright test --debug`


## Author
**Al-Fahad**  
QA Engineer  
Date: January 2025

---
