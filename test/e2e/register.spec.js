import { test, expect } from "@playwright/test";

test.describe("Register page", () => {
  test("user can register", async ({ page }) => {
    await page.route("*/**/register", (route) =>
      route.fulfill({
        status: 200,
        json: { name: "Test", email: "test@noroff.no" },
      }),
    );
    await page.goto("http://localhost:5173/register/");
    await page.locator('input[name="name"]').fill("JohnDoe");
    await page.locator('input[name="email"]').fill("success@stud.noroff.no");
    await page.locator('input[name="password"]').fill("password123");
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.locator("#message")).toContainText(
      "Registration successful. Redirecting...",
    );
  });
  test("failed registration shows error message", async ({ page }) => {
    await page.route("*/**/register", (route) =>
      route.fulfill({
        status: 400,
        json: { errors: [{ message: "Registration failed" }] },
      }),
    );
    await page.goto("http://localhost:5173/register/");
    await page.locator('input[name="name"]').fill("JohnDoe");
    await page.locator('input[name="email"]').fill("success@stud.noroff.no");
    await page.locator('input[name="password"]').fill("password123");
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.locator("#message")).toContainText("Registration failed");
  });
});
