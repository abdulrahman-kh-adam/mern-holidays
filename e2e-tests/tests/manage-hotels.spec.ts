import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("aka@gmail.com");

  await page.locator("[name=password]").fill("1qaz1qaz");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Signed in successfully")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page.locator("[name=description]").fill("Test Description");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("select[name='starRating']", "4");
  await page.getByText("Budget").click();
  await page.getByLabel("Free WiFi").check();
  await page.getByLabel("Parking").check();
  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childrenCount]").fill("1");

  await page.setInputFiles(
    '[name="imageFiles"]',
    [1, 2, 3, 4, 5, 6].map((num) => {
      return path.join(__dirname, `files/${num}.jpg`);
    })
  );

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel added successfully")).toBeVisible();
});

test("should allow user to edit a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await page.getByRole("link", { name: "View Details" }).click();

  await page.waitForSelector("[name='name']", { state: "attached" });

  await expect(page.locator("[name='name']")).toHaveValue("Maadi Gate");

  await page.locator("[name='name']").fill("Maadi Gate Updated");

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel updated successfully")).toBeVisible();
});
