import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['html', { open: 'always' }]
  ],

  use: {
    headless: false,
    browserName: 'chromium',

    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
});


 


// import { defineConfig, devices } from '@playwright/test';

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * See https://playwright.dev/docs/test-configuration.
//  */
// export default defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('')`. */
//     // baseURL: 'http://localhost:3000',

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     trace: 'on-first-retry',
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },

//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },

//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });


 



/*
|--------------------------------------------------------------------------
| Reporter Options
|--------------------------------------------------------------------------
| 'always'     = เปิด HTML Report ทุกครั้ง
| 'never'      = ไม่เปิด Report อัตโนมัติ
| 'on-failure' = เปิด Report เฉพาะตอน Test Fail
|
| ตัวอย่าง:
| reporter: [
|   ['html', { open: 'always' }]
| ]
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Screenshot Options
|--------------------------------------------------------------------------
| screenshot: 'on'
| = แคปหน้าจอทุกครั้ง ไม่ว่า Pass หรือ Fail
|
| screenshot: 'only-on-failure'
| = แคปเฉพาะตอน Test Fail
|
| screenshot: 'off'
| = ไม่แคปหน้าจอ
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Video Options
|--------------------------------------------------------------------------
| video: 'on'
| = อัดวิดีโอทุกครั้ง ไม่ว่า Pass หรือ Fail
|
| video: 'retain-on-failure'
| = เก็บวิดีโอเฉพาะ Test ที่ Fail
|
| video: 'on-first-retry'
| = อัดวิดีโอตอน Retry ครั้งแรก
|
| video: 'off'
| = ไม่อัดวิดีโอ
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Trace Options
|--------------------------------------------------------------------------
| trace: 'on'
| = เก็บ Trace ทุกครั้ง
|
| trace: 'retain-on-failure'
| = เก็บ Trace เฉพาะ Test ที่ Fail
|
| trace: 'on-first-retry'
| = เก็บ Trace ตอน Retry ครั้งแรก
|
| trace: 'off'
| = ไม่เก็บ Trace
|--------------------------------------------------------------------------
*/
 