# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\example.spec.ts >> has title
- Location: tests\example.spec.ts:9:5

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Playwright bugs/
Received string:  "Page Not Found | Playwright"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    - locator resolved to <html lang="en" dir="ltr" data-theme="light" data-has-hydrated="false" data-theme-choice="system" class="plugin-native plugin-id-default">…</html>
    9 × unexpected value "Page Not Found | Playwright"
      - locator resolved to <html lang="en" dir="ltr" data-theme="light" data-has-hydrated="true" data-theme-choice="system" class="plugin-native plugin-id-default" data-rh="lang,dir,class,data-has-hydrated">…</html>
    - unexpected value "Page Not Found | Playwright"

```

```yaml
- region "Skip to main content":
  - link "Skip to main content":
    - /url: "#__docusaurus_skipToContent_fallback"
- navigation "Main":
  - link "Playwright logo Playwright":
    - /url: /
    - img "Playwright logo"
    - text: Playwright
  - link "Docs":
    - /url: /docs/intro
  - link "MCP":
    - /url: /mcp/introduction
  - link "CLI":
    - /url: /agent-cli/introduction
  - link "API":
    - /url: /docs/api/class-playwright
  - button "Node.js"
  - link "GitHub repository":
    - /url: https://github.com/microsoft/playwright
  - link "Discord server":
    - /url: https://aka.ms/playwright/discord
  - button "Switch between dark and light mode (currently system mode)"
  - button "Search (Control+k)": Search Ctrl K
- main:
  - heading "This page is not available for Node.js." [level=1]
  - paragraph: We could not find what you were looking for.
- contentinfo:
  - text: Learn
  - list:
    - listitem:
      - link "Getting started":
        - /url: /docs/intro
    - listitem:
      - link "Playwright Training(opens in new tab)":
        - /url: https://learn.microsoft.com/en-us/training/modules/build-with-playwright/
        - text: Playwright Training
        - img "(opens in new tab)"
    - listitem:
      - link "Learn Videos":
        - /url: /community/learn-videos
    - listitem:
      - link "Feature Videos":
        - /url: /community/feature-videos
  - text: Community
  - list:
    - listitem:
      - link "Stack Overflow(opens in new tab)":
        - /url: https://stackoverflow.com/questions/tagged/playwright
        - text: Stack Overflow
        - img "(opens in new tab)"
    - listitem:
      - link "Discord(opens in new tab)":
        - /url: https://aka.ms/playwright/discord
        - text: Discord
        - img "(opens in new tab)"
    - listitem:
      - link "X(opens in new tab)":
        - /url: https://x.com/playwrightweb
        - text: X
        - img "(opens in new tab)"
    - listitem:
      - link "LinkedIn(opens in new tab)":
        - /url: https://www.linkedin.com/company/playwrightweb
        - text: LinkedIn
        - img "(opens in new tab)"
  - text: More
  - list:
    - listitem:
      - link "GitHub(opens in new tab)":
        - /url: https://github.com/microsoft/playwright
        - text: GitHub
        - img "(opens in new tab)"
    - listitem:
      - link "YouTube(opens in new tab)":
        - /url: https://www.youtube.com/channel/UC46Zj8pDH5tDosqm1gd7WTg
        - text: YouTube
        - img "(opens in new tab)"
    - listitem:
      - link "Blog(opens in new tab)":
        - /url: https://dev.to/playwright
        - text: Blog
        - img "(opens in new tab)"
    - listitem:
      - link "Ambassadors":
        - /url: /community/ambassadors
    - listitem:
      - link "Microsoft Privacy Statement(opens in new tab)":
        - /url: https://go.microsoft.com/fwlink/?LinkId=521839
        - text: Microsoft Privacy Statement
        - img "(opens in new tab)"
  - text: Copyright © 2026 Microsoft
```

# Test source

```ts
  1  | // npx playwright test tests/example.spec.ts --headed
  2  | import { test, expect } from '@playwright/test';
  3  | // import เครื่องมือ test และ expect จาก Playwright
  4  | // test ใช้สำหรับสร้าง Test Case
  5  | // expect ใช้สำหรับตรวจสอบว่าผลลัพธ์ที่ได้ ตรงตามที่คาดหวังหรือไม่
  6  | import * as allure from 'allure-js-commons';
  7  | 
  8  | 
  9  | test('has title', async ({ page }) => {
  10 |  await allure.severity('critical');
  11 | 
  12 |   // สร้าง Test Case ชื่อ "has title"
  13 |   // page คือหน้า Browser ที่ Playwright เปิดให้เราใช้งาน
  14 | 
  15 |   await page.goto('https://playwright.dev/bugs');
  16 |   // เปิดเว็บไซต์ https://playwright.dev/
  17 | 
> 18 |   await expect(page).toHaveTitle(/Playwright bugs/);
     |                      ^ Error: expect(page).toHaveTitle(expected) failed
  19 |   // ตรวจสอบว่า Title ของหน้าเว็บ
  20 |   // มีคำว่า "Playwright" อยู่หรือไม่
  21 | });
  22 | 
  23 | 
  24 | test('get started link', async ({ page }) => {
  25 | await allure.severity('normal');
  26 | 
  27 |   // สร้าง Test Case ชื่อ "get started link"
  28 | 
  29 |   await page.goto('https://playwright.dev/');
  30 |   // เปิดเว็บไซต์ https://playwright.dev/
  31 | 
  32 |   await page.getByRole('link', { name: 'Get started' }).click();
  33 |   // ค้นหาลิงก์ที่มีชื่อว่า "Get started"
  34 |   // แล้วสั่งคลิก
  35 | 
  36 |   await expect(
  37 |     page.getByRole('heading', { name: 'Installation' })
  38 |   ).toBeVisible();
  39 |   // ตรวจสอบว่าหลังจากคลิกแล้ว
  40 |   // มีหัวข้อชื่อ "Installation" แสดงอยู่บนหน้าเว็บ
  41 | });
```