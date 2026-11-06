// npx playwright test tests/nmw-motor.spec.ts --project=chromium --headed
import { test, expect } from '@playwright/test';

// ---------- ข้อมูลสำหรับทำรายการ ----------

// หน้าเริ่มทำรายการซื้อประกันรถยนต์ (QA environment)
const CAR_INSURANCE_URL =
  'https://tqm-main-web-qa.tqm-app-beta.com/car-insurance?utm_source=test';

// ข้อมูลรถยนต์ที่ต้องการเช็คเบี้ย
// (test id ของแต่ละตัวเลือกตรวจสอบกับหน้าเว็บจริงแล้ว)
const CAR = {
  brandTestId: 'indexCarBrandTOYO',                   // ยี่ห้อ Toyota
  modelTestId: 'carModelVIOS',                        // รุ่น Vios
  yearTestId: 'carYear2020',                          // ปีรถ 2020 (พ.ศ. 2563)
  subModelTestId: 'carSubModelTOYO20AI',              // Auto / 1.5 / High / 4dr ราคา 789,000 บาท
  provinceTestId: 'carRegistrationProvinceId11',      // จดทะเบียนจังหวัดชลบุรี
};

// ข้อมูลส่วนตัวผู้ทำรายการ
const CUSTOMER = {
  firstName: 'สิทธิกร',
  lastName: 'หมึกแดง',
  phone: '0827875149',
};

// ---------- Test ----------

test('ซื้อประกันรถยนต์ Toyota Vios 2020 (789,000) ทะเบียนชลบุรี คุ้มครองปีนี้', async ({ page }) => {
  // เว็บ QA โหลดช้าและฟอร์มค่อย ๆ เปิดทีละช่อง จึงให้เวลาทั้ง test นานหน่อย
  test.setTimeout(240_000);

  // 1. เปิดหน้าซื้อประกันรถยนต์
  await page.goto(CAR_INSURANCE_URL, { timeout: 60_000 });

  // 2. ปิดแบนเนอร์คุกกี้ถ้ามี (กันบังปุ่มด้านล่าง)
  const acceptCookie = page.getByTestId('acceptCookieButton');
  if (await acceptCookie.isVisible()) {
    await acceptCookie.click();
  }

  // 3. เลือกยี่ห้อ Toyota แล้วกดปุ่ม "เช็คราคาประกันรถยนต์" เข้าหน้ากรอกข้อมูลรถ
  //    รูปยี่ห้ออยู่ใน carousel ที่เลื่อนเอง และบางครั้งการเลื่อน reset การเลือก
  //    ยี่ห้อทิ้ง ทำให้ปุ่มกลับไป disabled ถ้ากดแล้วไม่ถึงหน้า filter
  //    ให้เลือกยี่ห้อใหม่แล้วลองอีกครั้ง (สูงสุด 3 ครั้ง)
  const brandLogo = page.getByTestId(CAR.brandTestId);
  const checkPriceButton = page.getByTestId('nextStepButton');

  for (let attempt = 0; attempt < 3; attempt++) {
    await brandLogo.click();
    await expect(checkPriceButton).toBeEnabled({ timeout: 15_000 });
    await checkPriceButton.click();

    const reachedFilterPage = await page
      .waitForURL('**/car-insurance/filter', { timeout: 30_000 })
      .then(() => true)
      .catch(() => false);
    if (reachedFilterPage) break;
  }
  await page.waitForURL('**/car-insurance/filter', { timeout: 30_000 });

  // แบนเนอร์คุกกี้มักโผล่อีกครั้งหลังเปลี่ยนหน้า ปิดถ้ามี
  if (await acceptCookie.isVisible()) {
    await acceptCookie.click();
  }

  // 5. เลือกรุ่น Vios (ช่องรุ่นจะโผล่หลังเลือกยี่ห้อ)
  await page.getByTestId(CAR.modelTestId).click();

  // 6. เลือกปีรถ 2020 (พ.ศ. 2563)
  await page.getByTestId(CAR.yearTestId).click();

  // 7. เลือกรุ่นย่อย Auto / 1.5 / High / 4dr ราคา 789,000 บาท
  await page.getByTestId(CAR.subModelTestId).click();

  // 8. เลือกจังหวัดทะเบียน ชลบุรี
  await page.getByTestId(CAR.provinceTestId).click();

  // 9. เลือกวันเริ่มคุ้มครอง "เริ่มคุ้มครองปีนี้ (ปีปัจจุบัน)"
  //    ข้อความจริงบนหน้าเว็บคือ "เริ่มคุ้มครองปีนี้ (2026)" อีกตัวเลือกคือ
  //    "เริ่มคุ้มครองปีหน้า (2027)" จึง match แบบมี prefix เพื่อไม่ให้ชนกัน
  //    (ปกติถูกเลือกไว้เป็นค่าเริ่มต้น แต่คลิกเพื่อความชัดเจน)
  await page.getByText('เริ่มคุ้มครองปีนี้').first().click();

  // 10. กรอกข้อมูลผู้ทำรายการ (ช่องเบอร์โทรจะโผล่หลังกรอกชื่อ-นามสกุล)
  await page.getByTestId('customerFirstNameInput').fill(CUSTOMER.firstName);
  await page.getByTestId('customerLastNameInput').fill(CUSTOMER.lastName);
  const phoneInput = page.getByTestId('customerPhoneNoInput');
  await expect(phoneInput).toBeVisible({ timeout: 30_000 });
  await phoneInput.fill(CUSTOMER.phone);

  // 11. กรอกครบแล้ว กดปุ่ม "ดูแผนประกันเลย"
  //     ปิดแบนเนอร์คุกกี้อีกครั้งถ้ายังอยู่ เพราะทับปุ่มนี้ท้ายหน้าพอดี
  if (await acceptCookie.isVisible()) {
    await acceptCookie.click();
  }
  const viewPlanButton = page.getByTestId('nextStepButton');
  await expect(viewPlanButton).toBeEnabled({ timeout: 30_000 });
  await viewPlanButton.click();

  // 12. ถ้ามีหน้าต่างขอความยินยอม (PDPA) ให้กดยินยอม
  const agreeConsent = page.getByTestId('agreeConsentButton');
  const consentShown = await agreeConsent
    .waitFor({ state: 'visible', timeout: 30_000 })
    .then(() => true)
    .catch(() => false);
  if (consentShown) {
    await agreeConsent.click();
  }

  // ---------- ตรวจสอบผลลัพธ์ ----------

  // 13. เมื่อไปถึงหน้าแสดงแผนประกัน ถือว่า test สำเร็จ
  await page.waitForURL('**/car-insurance/search', { timeout: 60_000 });
  await expect(page).toHaveURL(/\/car-insurance\/search/);
});
