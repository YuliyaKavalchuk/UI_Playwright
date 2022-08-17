import { expect, test } from "@playwright/test";
import { EMAILINPUT, BTNSIGNIN, SIGNINMAIN, PASSWORDINPUT } from "../helpers/selectorsOnPages";
import SignInPage from "../helpers/SignInPage";
import { TITLE_EXPECTED, NETFLIX_EXPECTED, HREF_ATTR, URL_SIGNIN } from "../helpers/expectedResults";
import { URL } from "../helpers/constantsMainPage";
import { BTNMANAGEPROFILE, REMEMBERME } from "../helpers/selectorsOnPages";
import { EMAIL, PASSWORD } from "../helpers/constantsSignInPage";

test.describe("Positive tests on Netflix/by", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });
    test("Check the main page URL to contain 'netflix'", async ({ page }) => {
        await expect(page.url()).toContain(NETFLIX_EXPECTED);
    });
    test("Check the 'Title' of Netflix website is 'Netflix Belarus - Watch TV Shows Online, Watch Movies Online' ", async ({
        page,
    }) => {
        await expect(page).toHaveTitle(TITLE_EXPECTED);
    });
    test("Check 'Sign In' button links to Sign In page", async ({ page }) => {
        await expect(page.locator(SIGNINMAIN)).toHaveAttribute(HREF_ATTR, URL_SIGNIN);
    });
    test("Check 'Sign In' button is enabled ", async ({ page }) => {
        await page.click(SIGNINMAIN);
        await expect(page.locator(BTNSIGNIN)).toBeEnabled();
    });
    test("Check Sign In page has empty 'Email' field by default", async ({ page }) => {
        await page.click(SIGNINMAIN);
        await expect(page.locator(EMAILINPUT)).toBeEmpty();
    });
    test("Check Sign In page has empty 'Password' field by default ", async ({ page }) => {
        await page.click(SIGNINMAIN);
        await expect(page.locator(PASSWORDINPUT)).toBeEmpty();
    });
    test("Check 'Remeber Me' checkbox is selected by default on Sign In page", async ({ page }) => {
        await page.click(SIGNINMAIN);
        await expect(page.locator(REMEMBERME)).toBeChecked();
    });
    test("Check user can login with valid data", async ({ page }) => {
        const signIn = new SignInPage(page);
        await signIn.signIn(EMAILINPUT, PASSWORDINPUT, EMAIL, PASSWORD, BTNSIGNIN);
        await expect(page.locator(BTNMANAGEPROFILE)).toBeEnabled();
    });
});
