import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test("user can login", async ({ page }) => {
    await page.goto("http://localhost:5173/login/");

    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL);
    await page
      .locator('input[name="password"]')
      .fill(process.env.TEST_USER_PASSWORD);

    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForSelector("#desktop-login");

    await expect(page.locator("#desktop-avatar")).toBeVisible();
  });

  test("user cannot login with invalid password", async ({ page }) => {
    await page.goto("http://localhost:5173/login/");

    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL);
    await page.locator('input[name="password"]').fill("wrongPassword");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#message")).toHaveText("Login failed");
  });
});
