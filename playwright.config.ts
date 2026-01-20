// playwright.config.ts
// Simple Playwright Configuration for TypeScript

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  workers: 2,
  
  reporter: [
    ['html'],
    ['line'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  use: {
    baseURL: 'https://www.ebay.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ],
});