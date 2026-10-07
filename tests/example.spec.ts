// npx playwright test tests/example.spec.ts --headed
import { test, expect } from '@playwright/test';
// import เครื่องมือ test และ expect จาก Playwright
// test ใช้สำหรับสร้าง Test Case
// expect ใช้สำหรับตรวจสอบว่าผลลัพธ์ที่ได้ ตรงตามที่คาดหวังหรือไม่
import * as allure from 'allure-js-commons';


test('has title', async ({ page }) => {
 await allure.severity('critical');

  // สร้าง Test Case ชื่อ "has title"
  // page คือหน้า Browser ที่ Playwright เปิดให้เราใช้งาน

  await page.goto('https://playwright.dev');
  // เปิดเว็บไซต์ https://playwright.dev/

  await expect(page).toHaveTitle(/Playwright/);
  // ตรวจสอบว่า Title ของหน้าเว็บ
  // มีคำว่า "Playwright" อยู่หรือไม่
});


test('get started link', async ({ page }) => {
await allure.severity('normal');

  // สร้าง Test Case ชื่อ "get started link"

  await page.goto('https://playwright.dev/');
  // เปิดเว็บไซต์ https://playwright.dev/

  await page.getByRole('link', { name: 'Get started' }).click();
  // ค้นหาลิงก์ที่มีชื่อว่า "Get started"
  // แล้วสั่งคลิก

  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
  // ตรวจสอบว่าหลังจากคลิกแล้ว
  // มีหัวข้อชื่อ "Installation" แสดงอยู่บนหน้าเว็บ
});