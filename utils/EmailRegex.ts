export function isValidEmail(email : string) {
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    return EmailRegex.test(email)
}