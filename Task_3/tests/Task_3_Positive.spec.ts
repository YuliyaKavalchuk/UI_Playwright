import { expect, test } from "@playwright/test";
import { emailInput, btnSignIn, signInMain, passwordInput } from "../helpers/selectorsOnPages";
import SignInPage from "../helpers/SignInPage";
import { titleExpected, netflixExpected, hrefAttr, urlSignIn } from "../helpers/expectedResults";
import { url } from "../helpers/constantsMainPage";
import { btnManageProfile, rememberMe } from "../helpers/selectorsOnPages";
import { email, password } from "../helpers/constantsSignInPage";

test.describe("Positive tests on Netflix/by", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });
    test("Check the main page URL to contain 'netflix'", async ({ page }) => {
        await expect(page.url()).toContain(netflixExpected);
    });
    test("Check the 'Title' of Netflix website is 'Netflix Belarus - Watch TV Shows Online, Watch Movies Online' ", async ({
        page,
    }) => {
        await expect(page).toHaveTitle(titleExpected);
    });
    test("Check 'Sign In' button links to Sign In page", async ({ page }) => {
        await expect(page.locator(signInMain)).toHaveAttribute(hrefAttr, urlSignIn);
    });
    test("Check 'Sign In' button is enabled ", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(btnSignIn)).toBeEnabled();
    });
    test("Check Sign In page has empty 'Email' field by default", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(emailInput)).toBeEmpty();
    });
    test("Check Sign In page has empty 'Password' field by default ", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(passwordInput)).toBeEmpty();
    });
    test("Check 'Remeber Me' checkbox is selected by default on Sign In page", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(rememberMe)).toBeChecked();
    });
    test("Check user can login with valid data", async ({ page }) => {
        const signIn = new SignInPage(page);
        await signIn.signIn(emailInput, passwordInput, email, password, btnSignIn);
        await expect(page.locator(btnManageProfile)).toBeEnabled();
    });
});
