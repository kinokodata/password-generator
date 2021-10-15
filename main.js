import {generate} from './password-generator.js';

document.getElementById('submit-button').addEventListener('click', onSubmit);
document.getElementById('copy-password-button').addEventListener('click', copyPassword);

let password = '';

function onSubmit() {
    readConstrainsFromInput();
    password = generate(constrains);
    document.getElementById("generated").innerText = password;
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
            chars: '',
            required: true,
            allowSpace: false
        }
    };

function readConstrainsFromInput() {
    constrains.min = parseInt(document.getElementById("inputMin").value);
    const inputMax = document.getElementById("inputMax").value;
    if(!!inputMax && inputMax >= constrains.min) {
        constrains.max = parseInt(document.getElementById("inputMax").value);
    } else {
        constrains.max = constrains.min;
    }
    const inputAvailableSymbols = document.getElementById("inputAvailableSymbols").value;
    if(!!inputAvailableSymbols) {
        constrains.symbols.chars = inputAvailableSymbols;
    } else {
        constrains.symbols.chars = '';
    }

    constrains.required.upperCaseLetter = document.getElementById("inputRequiredUpperChar").checked;
    constrains.required.lowerCaseLetter = document.getElementById("inputRequiredLowerChar").checked;
    constrains.required.alphabetLetter = document.getElementById("inputRequiredAlphabet").checked;
    constrains.required.numericDigit = document.getElementById("inputRequiredNumber").checked;
    constrains.required.alphanumericChar = document.getElementById("inputRequiredChar").checked;

    constrains.symbols.chars = document.getElementById("inputAvailableSymbols").value;
    // constrains.symbols.allowSpace = document.getElementById("inputAllowSpace").checked;
    constrains.symbols.required = document.getElementById("inputSymbolsRequired").checked;
    console.log(constrains);
}
