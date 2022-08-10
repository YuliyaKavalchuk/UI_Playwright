import { expect, test } from "@playwright/test";
import { emailInput, signIn, signInMain, passwordInput } from "./locator";
import functions from "./functions";
import { btnmanageProfile, rememberMe, titleExpected } from "./const";

test.describe("Positive tests on Netflix/by", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });
    test("1: Check the URL to contain netflix", async ({ page }) => {
        await expect(page.url()).toContain("netflix");
    });
    test("2: Check the Title of Netflix website", async ({ page }) => {
        await expect(page).toHaveTitle(titleExpected);
    });
    test("3: Check Sign In button links to correct page", async ({ page }) => {
        await expect(page.locator(signInMain)).toHaveAttribute("href", "/login");
    });
    test("4: Check Sign In button is enabled ", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(signIn)).toBeEnabled();
    });
    test("5: Check Sign In page has empty Email field by default", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(emailInput)).toBeEmpty();
    });
    test("6: Check Sign In page has empty Password field by default ", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(passwordInput)).toBeEmpty();
    });
    test("5: Check Remeber Me checkbox is selected by default on Sign In page", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(rememberMe)).toBeChecked();
    });
    test("7: Check user can login with valid data", async ({ page }) => {
        const signIn = new functions(page);
        await signIn.signInValid();
        await expect(page.locator(btnmanageProfile)).toBeEnabled();
    });
});
