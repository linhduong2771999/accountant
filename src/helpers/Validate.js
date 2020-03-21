export const  validateStrengthPassword = (text) => {
    const re = /(?=.*[A-Z])/;
    const re1 = /(?=.*[a-z])/;
    // const re2 = /(?=.*[!@#$%^&*])/; && re2.test(text)
    const re3 = /(?=.*[0-9])/;
    return (re.test(text) && re1.test(text)  && re3.test(text));
}