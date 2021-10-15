// ToDo: 各文字を使わない場合も考慮しないといけない

const UPPER_CASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMERIC_DIGITS = '0123456789';
let symbols = '-_';
let password = '';

const constrains = {
    min: 8,
    max: 0,
    required: {
        upperCaseLetter: true,
        lowerCaseLetter: true,
        alphabetLetter: false,
        numericDigit: true,
        alphanumericChar: false
    },
    symbols: {
        required: true,
        allowSpace: false
    }
}

function onSubmit() {
    setConstrains();
    password = this.generate();
    document.getElementById("generated").innerText = password;
}

function setConstrains() {
    constrains.min = parseInt(document.getElementById("inputMin").value);
    const inputMax = document.getElementById("inputMax").value;
    if(!!inputMax && inputMax >= constrains.min) {
        constrains.max = parseInt(document.getElementById("inputMax").value);
    } else {
        constrains.max = constrains.min;
    }
    const inputAvailableSymbols = document.getElementById("inputAvailableSymbols").value;
    if(!!inputAvailableSymbols) {
        symbols = inputAvailableSymbols;
    } else {
        symbols = '';
    }

    constrains.required.upperCaseLetter = document.getElementById("inputRequiredUpperChar").checked;
    constrains.required.lowerCaseLetter = document.getElementById("inputRequiredLowerChar").checked;
    constrains.required.alphabetLetter = document.getElementById("inputRequiredAlphabet").checked;
    constrains.required.numericDigit = document.getElementById("inputRequiredNumber").checked;
    constrains.required.alphanumericChar = document.getElementById("inputRequiredChar").checked;

    constrains.symbols.chars = document.getElementById("inputAvailableSymbols").value;
    constrains.symbols.allowSpace = document.getElementById("inputAllowSpace").checked;
    constrains.symbols.required = document.getElementById("inputSymbolsRequired").checked;
    // console.log(constrains);
}

function initConstrains(obj) {
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

function generate() {
    const length = constrains.min + Math.floor(Math.random() * (constrains.max - constrains.min + 1));
    let password = "";
    if(constrains.required.upperCaseLetter) {
        password += this.getRandomUpperCaseLetter();
    }
    if(constrains.required.lowerCaseLetter) {
        password += this.getRandomLowerCaseLetter();
    }
    if(constrains.required.alphabetLetter) {
        password += this.getRandomUpperCaseLetter();
    }
    if(constrains.required.numericDigit) {
        password += this.getRandomNumericDigit();
    }
    if(constrains.symbols.required) {
        password += this.getRandomSymbol();
    }
    while(password.length < length) {
        password += this.getRandomChar();
    }
    console.log(password.length);
    return shuffle(password);
}

// ToDo:exceptを作る
function getRandomUpperCaseLetter() {
    return UPPER_CASE_LETTERS.charAt(Math.floor(Math.random() * UPPER_CASE_LETTERS.length));
}

function getRandomLowerCaseLetter() {
    return LOWER_CASE_LETTERS.charAt(Math.floor(Math.random() * LOWER_CASE_LETTERS.length));
}

function getRandomAlphabetLetter() {
    const alphabetLetters = UPPER_CASE_LETTERS + LOWER_CASE_LETTERS;
    return alphabetLetters.charAt(Math.floor(Math.random() * alphabetLetters.length));
}

function getRandomNumericDigit() {
    return NUMERIC_DIGITS.charAt(Math.floor(Math.random() * NUMERIC_DIGITS.length));
}

function getRandomAlphanumericChar() {
    const alphanumericChars = UPPER_CASE_LETTERS + LOWER_CASE_LETTERS + NUMERIC_DIGITS;
    return alphanumericChars.charAt(Math.floor(Math.random() * alphanumericChars.length));
}

function getRandomSymbol() {
    if(symbols.length > 0) {
        return symbols.charAt(Math.floor(Math.random()) * symbols.length);
    } else {
        return '';
    }
}

function getRandomChar() {
    const chars = UPPER_CASE_LETTERS + LOWER_CASE_LETTERS + NUMERIC_DIGITS + symbols;
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function shuffle(str) {
    return str.split('').sort(() => 0.5 - Math.random()).join('');
}

function validate(str) {
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
    return true;
}

function copyPassword() {
    const textArea = document.createElement('textarea');
    textArea.innerText = password;
    document.getElementById('generated').appendChild(textArea);
    // コピー対象のテキストを選択する
    textArea.select();

    // 選択しているテキストをクリップボードにコピーする
    document.execCommand("Copy");

    textArea.remove();
}
