import { expect, test } from "@playwright/test";
import { btnSignIn, emailInput, errorMessagePassword, passwordInput, signInMain } from "../helpers/selectorsOnPages";
import SignInPage from "../helpers/SignInPage";
import { btnSignUpNow, errorMessage, rememberMe } from "../helpers/selectorsOnPages";
import { url } from "../helpers/constantsMainPage";
import { err_Message, href_Attr, url_Main } from "../helpers/expectedResults";

test.describe("Negative tests on Netflix/by", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });
    test("Check the URL is not netflix.com", async ({ page }) => {
        await expect(page).not.toHaveURL(url_Main);
    });
    test("Check 'Sign In' button on the main page is not disabled", async ({ page }) => {
        await expect(page.locator(signInMain)).not.toBeDisabled;
    });
    test("Check 'Sign In' button on SignIn page is not disabled when user lands on the page", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(btnSignIn)).not.toBeDisabled;
    });
    test("Check 'Remember Me' checkbox is not hidden on Sign In page", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(rememberMe)).not.toBeHidden();
    });
    test("Check 'Sign up now' does not links to the default netflix.com", async ({ page }) => {
        await page.click(signInMain);
        await page.waitForSelector(btnSignUpNow);
        await expect(page.locator(btnSignUpNow)).not.toHaveAttribute(href_Attr, url_Main);
    });
    test("Check error message when user enters invalid data", async ({ page }) => {
        const signIn = new SignInPage(page);
        await signIn.signIn(
            emailInput,
            passwordInput,
            signIn.getEmailRandom(),
            signIn.getPasswordRandom(0, 9),
            btnSignIn,
        );
        await expect(page.locator(errorMessage)).toContainText(err_Message);
    });
    test("Check Error message for password field not contain the password", async ({ page }) => {
        await page.click(signInMain);
        const signIn = new SignInPage(page);
        const passInput: string = signIn.generateRandomString(61);
        await page.locator(passwordInput).click();
        await page.locator(passwordInput).fill(passInput);
        await page.pause();
        await page.locator(btnSignIn).click();
        await expect(page.locator(errorMessagePassword)).not.toContainText(passInput);
    });
});
