import { signInMain } from "./selectorsOnPages";
import { time_Out, email_Template, email_Separator, special_Characters, alphabet, space } from "./constantsSignInPage";
import { Page } from "@playwright/test";

export default class {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async signIn(field1: string, field2: string, input1: string, input2: string, constant: string): Promise<void> {
        await this.page.click(signInMain);
        await this.page.locator(field1).fill(input1);
        await this.page.waitForTimeout(time_Out);
        await this.page.locator(field2).fill(input2);
        await this.page.locator(constant).click();
    }

    getEmailRandom(): string {
        let emailSplit: any = email_Template.split(email_Separator);
        return emailSplit[0] + this.getRandomInt(10000, 9999) + email_Separator + emailSplit[1];
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getPasswordRandom(min: number, max: number): string {
        let rand: any = Math.floor(Math.random() * (max - min + 1)) + min;
        return this.generateRandomLetterLowerCase() + rand + this.generateRandomLetterUpperCase() + special_Characters;
    }
    generateRandomLetterLowerCase(): string {
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    generateRandomLetterUpperCase(): string {
        return alphabet.toUpperCase()[Math.floor(Math.random() * alphabet.length)];
    }

    generateRandomString(length: number): string {
        let res: string = space;
        let characters: string = alphabet + alphabet.toUpperCase();
        let charactersLength: number = characters.length;
        for (let i: number = 0; i < length; i++) {
            res += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return res;
    }
}
