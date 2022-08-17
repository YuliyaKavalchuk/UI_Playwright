import { expect, test } from "@playwright/test";
import { BTNSIGNIN, EMAILINPUT, ERRORMESSAGEPASSWORD, PASSWORDINPUT, SIGNINMAIN } from "../helpers/selectorsOnPages";
import SignInPage from "../helpers/SignInPage";
import { BTNSIGNUPNOW, ERRORMESSAGE, REMEMBERME } from "../helpers/selectorsOnPages";
import { URL } from "../helpers/constantsMainPage";
import { ERR_MESSAGE, HREF_ATTR, URL_MAIN } from "../helpers/expectedResults";
import { PASSWORD_INVALID_LENGTH, URL_LOG } from "../helpers/constantsSignInPage";

test.describe("Negative tests on Netflix/by", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });
    test("Check the URL is not netflix.com", async ({ page }) => {
        await expect(page).not.toHaveURL(URL_MAIN);
    });
    test("Check 'Sign In' button on the main page is not disabled", async ({ page }) => {
        await expect(page.locator(SIGNINMAIN)).not.toBeDisabled;
    });
    test("Check 'Sign In' button on SignIn page is not disabled when user lands on the page", async ({ page }) => {
        await page.click(SIGNINMAIN);
        await expect(page.locator(BTNSIGNIN)).not.toBeDisabled;
    });
    test("Check 'Remember Me' checkbox is not hidden on Sign In page", async ({ page }) => {
        await page.click(SIGNINMAIN);
        await expect(page.locator(REMEMBERME)).not.toBeHidden();
    });
    test("Check 'Sign up now' does not links to the default netflix.com", async ({ page }) => {
        await page.click(SIGNINMAIN);
        await page.waitForSelector(BTNSIGNUPNOW);
        await expect(page.locator(BTNSIGNUPNOW)).not.toHaveAttribute(HREF_ATTR, URL_MAIN);
    });
    test("Check error message when user enters invalid data", async ({ page }) => {
        const signIn = new SignInPage(page);
        await signIn.signIn(
            EMAILINPUT,
            PASSWORDINPUT,
            signIn.getEmailRandom(),
            signIn.getPasswordRandom(0, 9),
            BTNSIGNIN,
        );
        await expect(page.locator(ERRORMESSAGE)).toContainText(ERR_MESSAGE);
    });
    test("Check Error message for password field not contain the password", async ({ page }) => {
        await page.click(SIGNINMAIN);
        const signIn = new SignInPage(page);
        const passInput: string = signIn.generateRandomString(PASSWORD_INVALID_LENGTH);
        await page.locator(PASSWORDINPUT).click();
        await page.locator(PASSWORDINPUT).type(passInput);
        await page.waitForRequest(URL_LOG);
        await page.locator(BTNSIGNIN).click();
        await expect(page.locator(ERRORMESSAGEPASSWORD)).not.toContainText(passInput);
    });
});
