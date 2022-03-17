export class AppValidator {
    public static isEmpty(...args: string[]) {
        console.log(args);
        for (const el of args) {
            console.log(el);
            if (el === '') {
                return true;
            }
        }
        return false;
    }


    public static validEmail(email: string) {
        const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        return EMAIL_REGEXP.test(email);

    }

    public static validPassword(password: string) {
        return password.length >= 6;
    }

}
