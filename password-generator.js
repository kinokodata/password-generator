// ToDo: できれば余分なものをexportしたくない（testしたいだけ）
// ToDo: 各文字を使わない場合も考慮しないといけない
const UPPER_CASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMERIC_DIGITS = '0123456789';

const constrains = {
    min: 8,
    max: 8,
    required: {
        upperCaseLetter: true,
        lowerCaseLetter: true,
        alphabetLetter: false,
        numericDigit: true,
        alphanumericChar: false
    },
    symbols: {
        chars: '',
        required: false,
        allowSpace: false
    }
}

const setConstrains = (obj) => {
    constrains.min = obj.min;
    constrains.max = obj.max;

    constrains.required.upperCaseLetter = obj.required.upperCaseLetter;
    constrains.required.lowerCaseLetter = obj.required.lowerCaseLetter;
    constrains.required.alphabetLetter = obj.required.alphabetLetter;
    constrains.required.numericDigit = obj.required.numericDigit;
    constrains.required.alphanumericChar = obj.required.alphanumericChar;

    constrains.symbols.chars = obj.symbols.chars;
    constrains.symbols.allowSpace = obj.symbols.allowSpace;
    constrains.symbols.required = obj.symbols.required;
}

export const generate = (options) => {
    setConstrains(options);
    const length = constrains.min + Math.floor(Math.random() * (constrains.max - constrains.min + 1));
    let password = "";
    if(constrains.required.upperCaseLetter) {
        password += getRandomUpperCaseLetter();
    }
    if(constrains.required.lowerCaseLetter) {
        password += getRandomLowerCaseLetter();
    }
    if(constrains.required.alphabetLetter) {
        password += getRandomUpperCaseLetter();
    }
    if(constrains.required.numericDigit) {
        password += getRandomNumericDigit();
    }
    if(constrains.symbols.required) {
        password += getRandomSymbol();
    }
    while(password.length < length) {
        password += getRandomChar();
    }
    console.log(password.length);
    return shuffle(password);
}

// ToDo:exceptを作る
export const getRandomUpperCaseLetter = () => {
    return UPPER_CASE_LETTERS.charAt(Math.floor(Math.random() * UPPER_CASE_LETTERS.length));
}

export const getRandomLowerCaseLetter = () => {
    return LOWER_CASE_LETTERS.charAt(Math.floor(Math.random() * LOWER_CASE_LETTERS.length));
}

export const getRandomAlphabetLetter = () => {
    const alphabetLetters = UPPER_CASE_LETTERS + LOWER_CASE_LETTERS;
    return alphabetLetters.charAt(Math.floor(Math.random() * alphabetLetters.length));
}

export const getRandomNumericDigit = () => {
    return NUMERIC_DIGITS.charAt(Math.floor(Math.random() * NUMERIC_DIGITS.length));
}

export const getRandomAlphanumericChar = () => {
    const alphanumericChars = UPPER_CASE_LETTERS + LOWER_CASE_LETTERS + NUMERIC_DIGITS;
    return alphanumericChars.charAt(Math.floor(Math.random() * alphanumericChars.length));
}

export const getRandomSymbol = () => {
    if(constrains.symbols.chars.length > 0) {
        return constrains.symbols.chars.charAt(Math.floor(Math.random()) * constrains.symbols.chars.length);
    } else {
        return '';
    }
}

export const getRandomChar = () => {
    const chars = UPPER_CASE_LETTERS + LOWER_CASE_LETTERS + NUMERIC_DIGITS + constrains.symbols.chars;
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

export const shuffle = (str) => {
    return str.split('').sort(() => 0.5 - Math.random()).join('');
}

// ToDo: もっとしっかり書く
export const validate = (str) => {
    // 長さチェック
    if(str.length < constrains.min) {
        return false;
    }
    if(constrains.max > 0 && str.length > constrains.max) {
        return false;
    }

    // 必須チェック
    if(constrains.required.upperCaseLetter && !/[A-Z]/.test(str)) {
        return false;
    }
    if(constrains.required.upperCaseLetter && !/[A-Z]/.test(str)) {
        return false;
    }
    if(constrains.required.upperCaseLetter && !/[A-Z]/.test(str)) {
        return false;
    }
    if(constrains.required.lowerCaseLetter && !/[a-z]/.test(str)) {
        return false;
    }
    if(constrains.required.alphabetLetter && !/[A-Za-z]/.test(str)) {
        return false;
    }
    if(constrains.required.numericDigit && !/[0-9]/.test(str)) {
        return false;
    }
    if(constrains.required.alphanumericChar && !/[A-Za-z0-9]/.test(str)) {
        return false;
    }
    if(constrains.symbols.required) {
        const regExp = new RegExp('[' + constrains.symbols.chars + ']');
        if(!regExp.test(str)) {
            return false;
        }
    }
    // ToDo: 使って良い文字以外が入ってないかの検出

    return true;
}