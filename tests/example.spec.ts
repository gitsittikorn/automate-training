// pnpm playwright test tests/example.spec.ts --headed
import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test('has title', async ({ page }) => {
  await allure.severity('critical');

  await page.goto('https://playwright.dev/bugs');
  await expect(page).toHaveTitle(/Playwright bugs/);
});

test('get started link', async ({ page }) => {
  await allure.severity('normal');

  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});