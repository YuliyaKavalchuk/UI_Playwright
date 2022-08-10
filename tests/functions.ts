import { emailInput, passwordInput, signIn, signInMain } from "./locator";
import { email, password } from "./const";
import { Page } from "@playwright/test";

export default class {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async signInValid() {
        await this.page.click(signInMain);
        await this.page.locator(emailInput).fill(email);
        await this.page.waitForTimeout(2000);
        await this.page.locator(passwordInput).fill(password);
        await this.page.locator(signIn).click();
    }

    async signInInvalid() {
        await this.page.click(signInMain);
        await this.page.locator(emailInput).fill(this.emailRandom());
        await this.page.waitForTimeout(2000);
        await this.page.locator(passwordInput).fill(this.passwordRandom());
        await this.page.locator(signIn).click();
    }

    emailRandom() {
        let email: string = "your.email@gmail.com";
        let emailSplit: any = email.split("@");
        return emailSplit[0] + this.getRandomInt(10000, 9999) + "@" + emailSplit[1];
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    passwordRandom() {
        let min: number = 0;
        let max: number = 9;
        let rand: any = Math.floor(Math.random() * (max - min + 1)) + min;
        return this.generateRandomLetterLowerCase() + rand + this.generateRandomLetterUpperCase() + "<,.(*$/%_-@'!~`:?";
    }
    generateRandomLetterLowerCase() {
        const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    generateRandomLetterUpperCase() {
        const alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }
}
