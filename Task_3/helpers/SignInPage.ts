import { SIGNINMAIN } from "./selectorsOnPages";
import { TIME_OUT, EMAIL_TEMPLATE, EMAIL_SEPARATOR, SPECIAL_CHARACTERS, ALPHABET, SPACE } from "./constantsSignInPage";
import { Page } from "@playwright/test";

export default class {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async signIn(field1: string, field2: string, input1: string, input2: string, constant: string): Promise<void> {
        await this.page.click(SIGNINMAIN);
        await this.page.locator(field1).fill(input1);
        await this.page.waitForTimeout(TIME_OUT);
        await this.page.locator(field2).fill(input2);
        await this.page.locator(constant).click();
    }

    getEmailRandom(): string {
        let emailSplit: any = EMAIL_TEMPLATE.split(EMAIL_SEPARATOR);
        return emailSplit[0] + this.getRandomInt(10000, 9999) + EMAIL_SEPARATOR + emailSplit[1];
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getPasswordRandom(min: number, max: number): string {
        let rand: any = Math.floor(Math.random() * (max - min + 1)) + min;
        return this.generateRandomLetterLowerCase() + rand + this.generateRandomLetterUpperCase() + SPECIAL_CHARACTERS;
    }
    generateRandomLetterLowerCase(): string {
        return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }

    generateRandomLetterUpperCase(): string {
        return ALPHABET.toUpperCase()[Math.floor(Math.random() * ALPHABET.length)];
    }

    generateRandomString(length: number): string {
        let res: string = SPACE;
        let characters: string = ALPHABET + ALPHABET.toUpperCase();
        let charactersLength: number = characters.length;
        for (let i: number = 0; i < length; i++) {
            res += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return res;
    }
}
