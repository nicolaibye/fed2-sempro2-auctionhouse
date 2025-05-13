import { test, expect } from "@playwright/test";

test.describe("All auctions page", () => {
  test("user can search for auctions", async ({ page }) => {
    await page.goto("http://localhost:5173/auctions/");
    await page.waitForLoadState("networkidle");
    await page.locator('input[name="search"]').fill("test");
    await expect(page.locator("li", { hasText: "test" }).first()).toBeVisible();
  });
  test("user is informed if no auctions are found", async ({ page }) => {
    await page.goto("http://localhost:5173/auctions/");
    await page.waitForLoadState("networkidle");
    await page
      .locator('input[name="search"]')
      .fill("randomStringWithoutMatchingAuction");
    await expect(
      page.locator("#message", {
        hasText: "There are currently no auctions available",
      }),
    ).toBeVisible();
  });
});
