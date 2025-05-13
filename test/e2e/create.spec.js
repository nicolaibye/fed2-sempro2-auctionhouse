import { test, expect } from "@playwright/test";
import { title } from "process";

test.describe("Create auction page", () => {
  test("user can create an auction", async ({ page }) => {
    await page.goto("http://localhost:5173/login/");
    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL);
    await page
      .locator('input[name="password"]')
      .fill(process.env.TEST_USER_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForSelector("#desktop-avatar");
    await page.route("*/**/", (route) =>
      route.fulfill({
        status: 200,
        json: {
          title: "Test",
          description: "Test",
          endsAt: "2023-01-01T00:00:00.000Z",
          media: [{ url: "https://example.com/image.jpg", alt: "Test image" }],
          tags: ["tag1", "tag2"],
        },
      }),
    );
    await page.locator("#create-listing-button").click();
    await page.locator('input[name="title"]').fill("Test Auction");
    await page.locator('input[name="date"]').fill("2026-01-01");
    await page.locator('textarea[name="description"]').fill("Test description");
    await page
      .locator('input[name="image"]')
      .fill("https://example.com/image.jpg");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.locator("#overlay-message")).toContainText(
      "Auction created successfully.",
    );
  });
  test("user gets error message if they fail to create an auction", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/login/");
    await page.locator('input[name="email"]').fill(process.env.TEST_USER_EMAIL);
    await page
      .locator('input[name="password"]')
      .fill(process.env.TEST_USER_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForSelector("#desktop-avatar");
    await page.route("*/**/create", (route) => {
      route.fulfill({
        status: 404,
        json: {
          errors: [{ message: "Auction creation failed" }],
        },
      });
    });
    await page.locator("#create-listing-button").click();
    await page.locator('input[name="title"]').fill("Test Auction");
    await page.locator('input[name="date"]').fill("2026-01-01");
    await page.locator('textarea[name="description"]').fill("Test description");
    await page
      .locator('input[name="image"]')
      .fill("https://example.com/image.jpg");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(
      page.locator("#overlay-message", { hasText: "image" }),
    ).toBeVisible();
  });
});
