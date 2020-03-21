export const  validateStrengthPassword = (password) => {
    const re = /(?=.*[A-Z])/;
    const re1 = /(?=.*[a-z])/;
    // const re2 = /(?=.*[!@#$%^&*])/; && re2.test(password)
    const re2 = /(?=.{8,})/;
    const re3 = /(?=.*[0-9])/;
    return (re.test(password) && re1.test(password) && re2.test(password) && re3.test(password));
}