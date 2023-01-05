export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "isOnlyDigit": {
                const digitOnlyRegExp = /^\d+$/g;
                statusValidate = !digitOnlyRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.valeo;
                break;
            }
            case "phoneNumber": {
                const phoneRegExp = /^((8|\+7))?(\(?\d{3}\)?)?[\d\- ]{7,10}$/g;
                statusValidate = !phoneRegExp.test(data);
                break;
            }
            case "isNotContainDigit": {
                const notDigitRegExp = /\d+/g;
                statusValidate = notDigitRegExp.test(data);
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
