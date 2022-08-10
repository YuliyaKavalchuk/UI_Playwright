import { expect, test } from "@playwright/test";
import { signIn, signInMain } from "./locator";
import functions from "./functions";
import { btnSignUpNow, errorMessage, header, rememberMe } from "./const";

test.describe("Negative tests on Netflix/by", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });
    test("1: Check the URL is not netflix.com", async ({ page }) => {
        await expect(page).not.toHaveURL("https://www.netflix.com");
    });
    test("2: Check the Header does not have id.", async ({ page }) => {
        await expect(page.locator(header)).not.toHaveId;
    });
    test("3: Check Sign In button is not disabled", async ({ page }) => {
        await expect(page.locator(signInMain)).not.toBeDisabled;
    });
    test("4: Check Sign In is not disabled", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(signIn)).not.toBeDisabled;
    });
    test("5: Check Remeber Me checkbox is displayed on Sign In page", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(rememberMe)).not.toBeHidden();
    });
    test("6: Check 'Sign up now' links to the main page", async ({ page }) => {
        await page.click(signInMain);
        await expect(page.locator(btnSignUpNow)).toHaveAttribute("href", "/");
    });
    test("7: Check user is not allowed to login with invalid data", async ({ page }) => {
        const signIn = new functions(page);
        await signIn.signInInvalid();
        await expect(page.locator(errorMessage)).toContainText(
            "Sorry, we can't find an account with this email address. Please try again or ",
        );
    });
});
