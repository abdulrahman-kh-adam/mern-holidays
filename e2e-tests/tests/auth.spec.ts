import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("aka@gmail.com");

  await page.locator("[name=password]").fill("1qaz1qaz");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Signed in successfully")).toBeVisible();

  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();

  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test-${Date.now()}@example.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await page.getByRole("link", { name: "Click Here!" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("Test First Name");
  await page.locator("[name=lastName]").fill("Test Last Name");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("1qaz1qaz");
  await page.locator("[name=confirmPassword]").fill("1qaz1qaz");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Account created successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
