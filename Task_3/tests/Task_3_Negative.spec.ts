import { expect, test } from "@playwright/test";
import { btnSignIn, emailInput, passwordInput, signInMain } from "../helpers/selectorsSignInPage";
import SignInPage from "../helpers/SignInPage";
import { btnSignUpNow, errorMessage, header, rememberMe } from "../helpers/selectorsSignInPage";
import { url } from "../helpers/constantsMainPage";
import { errMessage, hrefAttr, urlMain } from "../helpers/expectedResults";

test.describe("Negative tests on Netflix/by", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });
    test("Check the URL is not netflix.com", async ({ page }) => {
        await expect(page).not.toHaveURL(urlMain);
    });
    test("Check the Header does not have id.", async ({ page }) => {
        await expect(page.locator(header)).not.toHaveId;
    });
    test("Check Sign In button is not disabled", async ({ page }) => {
        await expect(page.locator(signInMain)).not.toBeDisabled;
    });
    test("Check Sign In is not disabled", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(btnSignIn)).not.toBeDisabled;
    });
    test("Check 'Remember Me' checkbox is displayed on Sign In page", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(rememberMe)).not.toBeHidden();
    });
    test("Check 'Sign up now' links to the main page", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(btnSignUpNow)).toHaveAttribute(hrefAttr, url);
    });
    test("Check user can login with valid data", async ({ page }) => {
        const signIn = new SignInPage(page);
        await signIn.signIn(
            emailInput,
            passwordInput,
            signIn.getEmailRandom(),
            signIn.getPasswordRandom(0, 9),
            btnSignIn,
        );
        await expect(page.locator(errorMessage)).toContainText(errMessage);
    });
});
