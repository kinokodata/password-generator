import {generate} from './password-generator.js';

document.getElementById('submit-button').addEventListener('click', onSubmit);
document.getElementById('copy-password-button').addEventListener('click', copyPassword);

let password = '';

function onSubmit() {
    readSettingsFromInput();
    password = generate(settings);
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

const settings = {
    min: 8,
    max: 10,
    upperCaseLetters: {
        usage: 2,
        except: 'IO'
    },
    lowerCaseLetters: {
        usage: 2,
        except: 'l'
    },
    numbers: {
        usage: 2,
        except: '10'
    },
    symbols: {
        usage: 2,
        available: '-_'
    },
    allowSpace: false
};

function readSettingsFromInput() {
    settings.min = parseInt(document.getElementById("inputMin").value);
    const inputMax = document.getElementById("inputMax").value;
    if(!!inputMax && inputMax >= settings.min) {
        settings.max = parseInt(inputMax);
    } else {
        settings.max = settings.min;
    }
    const inputAvailableSymbols = document.getElementById("inputAvailableSymbols").value;
    if(!!inputAvailableSymbols) {
        settings.symbols.available = inputAvailableSymbols;
    } else {
        settings.symbols.chars = '';
    }

    settings.required.upperCaseLetter = document.getElementById("inputRequiredUpperChar").checked;
    settings.required.lowerCaseLetter = document.getElementById("inputRequiredLowerChar").checked;
    settings.required.alphabetLetter = document.getElementById("inputRequiredAlphabet").checked;
    settings.required.numericDigit = document.getElementById("inputRequiredNumber").checked;
    settings.required.alphanumericChar = document.getElementById("inputRequiredChar").checked;

    settings.symbols.chars = document.getElementById("inputAvailableSymbols").value;
    // settings.symbols.allowSpace = document.getElementById("inputAllowSpace").checked;
    settings.symbols.required = document.getElementById("inputSymbolsRequired").checked;
    console.log(settings);
}