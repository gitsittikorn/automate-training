import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html', { open: 'always' }],
    ['allure-playwright']
  ],

  use: {
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],
});