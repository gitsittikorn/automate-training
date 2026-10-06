// npx playwright test tests/nmw-motor-vibe-code.spec.ts --headed
import { test, expect } from '@playwright/test';
// import เครื่องมือ test และ expect จาก Playwright

// ---------- ข้อมูลสำหรับทำรายการ ----------

// URL หน้าซื้อประกันรถยนต์ (QA environment)
const CAR_INSURANCE_URL =
  'https://tqm-main-web-qa.tqm-app-beta.com/car-insurance?utm_source=test';

// ข้อมูลรถยนต์ที่ต้องการเช็คเบี้ย
const CAR = {
  brandLogoAlt: 'brandTOYO',                                  // โลโก้ Toyota หน้าแรก
  modelTestId: 'carModelVIOS',                                // รุ่น Vios
  yearTestId: 'carYear2020',                                  // ปีรถ 2020 (2563)
  subModelTestId: 'carSubModelTOYO20AI',                      // Auto/1.5/High/4dr ราคา 789,000
  provinceTestId: 'carRegistrationProvinceId11',              // ทะเบียนจังหวัดชลบุรี
};

// ข้อมูลส่วนตัวผู้ทำรายการ
const CUSTOMER = {
  firstName: 'สิทธิกร',
  lastName: 'หมึกแดง',
  phone: '0827875149',
};

// ---------- Test ----------

test('ซื้อประกันรถยนต์ Toyota Vios 2020 ราคา 789,000 ป้ายชลบุรี คุ้มครองปีนี้', async ({ page }) => {
  // ให้เวลาทั้ง test นานหน่อย เพราะเว็บ QA โหลดช้าและ form ค่อยๆ เปิดทีละช่อง
  test.setTimeout(240_000);

  // 1. เปิดหน้าซื้อประกันรถยนต์
  await page.goto(CAR_INSURANCE_URL, { timeout: 60_000 });

  // ปิดแบนเนอร์คุกกี้ ถ้ามี (กันบังปุ่มด้านล่าง)
  const acceptCookie = page.getByTestId('acceptCookieButton');
  if (await acceptCookie.isVisible()) {
    await acceptCookie.click();
  }

  // 2. เลือกยี่ห้อ Toyota ที่หน้าแรก
  await page.locator(`img[alt="${CAR.brandLogoAlt}"]`).click();

  // 3. กดปุ่ม "เช็คราคาประกันรถยนต์" เพื่อไปหน้ากรอกข้อมูลรายละเอียดรถ
  //    (ปุ่มจะ disabled สักครู่หลังเลือกยี่ห้อ ต้องรอให้ enabled ก่อนคลิก)
  const checkPriceButton = page.getByTestId('nextStepButton');
  await expect(checkPriceButton).toBeEnabled({ timeout: 30_000 });
  await checkPriceButton.click();
  await page.waitForURL('**/car-insurance/filter', { timeout: 60_000 });

  // 4. เลือกรุ่นรถ Vios (ช่อง "เลือกรุ่นรถ" จะโผล่หลังเลือกยี่ห้อแล้ว)
  await page.getByTestId(CAR.modelTestId).click();

  // 5. เลือกปีรถ 2020 (2563)
  await page.getByTestId(CAR.yearTestId).click();

  // 6. เลือกรุ่นย่อยที่ราคา 789,000 (Auto / 1.5 / High / 4dr)
  await page.getByTestId(CAR.subModelTestId).click();

  // 7. เลือกจังหวัดทะเบียน ชลบุรี
  await page.getByTestId(CAR.provinceTestId).click();

  // 8. เลือกเริ่มคุ้มครอง "ปีนี้" (ปกติถูกเลือกไว้อยู่แล้ว แต่คลิกเพื่อความชัดเจน)
  await page.getByText('คุ้มครองปีนี้').first().click();

  // 9. กรอกข้อมูลส่วนตัว (ช่องเบอร์โทรจะโผล่หลังกรอกชื่อ-นามสกุลแล้ว)
  await page.getByTestId('customerFirstNameInput').fill(CUSTOMER.firstName);
  await page.getByTestId('customerLastNameInput').fill(CUSTOMER.lastName);
  await page.getByTestId('customerPhoneNoInput').fill(CUSTOMER.phone);

  // 10. กรอกครบแล้ว กดปุ่ม "ดูแผนประกันเลย"
  const viewPlanButton = page.getByTestId('nextStepButton');
  await expect(viewPlanButton).toBeEnabled({ timeout: 30_000 });
  await viewPlanButton.click();

  // 11. ถ้ามี popup "เอกสารขอความยินยอม" ให้กดยินยอม
  const agreeConsent = page.getByTestId('agreeConsentButton');
  await agreeConsent.waitFor({ state: 'visible', timeout: 30_000 });
  await agreeConsent.click();

  // ---------- ตรวจสอบผลลัพธ์ ----------

  // 12. เมื่อไปถึงหน้า "แผนประกันที่เหมาะกับคุณ" ถือว่ารายการเสร็จสมบูรณ์
  await page.waitForURL('**/car-insurance/search', { timeout: 60_000 });
  await expect(page).toHaveURL(/\/car-insurance\/search/);
});
