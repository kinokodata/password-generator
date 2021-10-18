import {__RewireAPI__ as pwGenRewire, validate, generate, DEFAULT_SETTINGS} from './password-generator';

const getRandomUpperCaseLetter = pwGenRewire.__get__('getRandomUpperCaseLetter');
const getRandomLowerCaseLetter = pwGenRewire.__get__('getRandomLowerCaseLetter');
const getRandomNumber = pwGenRewire.__get__('getRandomNumber');
const getRandomSymbol = pwGenRewire.__get__('getRandomSymbol');

const setSettings = pwGenRewire.__get__('setSettings');
const sub = pwGenRewire.__get__('sub');
const shuffle = pwGenRewire.__get__('shuffle');

const UPPER_CASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';

test('getRandomUpperCaseLetter', () => {
    const except = 'ABCDFHIKLMVW';
    setSettings({upperCaseLetters: {except: except}});
    for(let i = 0; i < 10; i++) {
        expect(getRandomUpperCaseLetter()).toEqual(expect.stringMatching(new RegExp('[' + sub(UPPER_CASE_LETTERS, except) + ']')));
    }
});

test('getRandomLowerCaseLetter', () => {
    const except = 'asxdf';
    setSettings({lowerCaseLetters: {except: except}});
    for(let i = 0; i < 10; i++) {
        expect(getRandomLowerCaseLetter()).toEqual(expect.stringMatching(new RegExp('[' + sub(LOWER_CASE_LETTERS, except) + ']')));
    }
});

test('getRandomNumber', () => {
    const except = '0';
    setSettings({numbers: {except: except}});
    for(let i = 0; i < 10; i++) {
        expect(getRandomNumber()).toEqual(expect.stringMatching(new RegExp('[' + sub(NUMBERS, except) + ']')));
    }
});

test('getRandomSymbol', () => {
    const available = '-+:';
    setSettings({symbols: {available: available}});
    for(let i = 0; i < 10; i++) {
        expect(getRandomSymbol()).toEqual(expect.stringMatching(new RegExp('[' + available + ']')));
    }
});

test('shuffle', () => {
    const str = 'hogehoge';
    expect(shuffle(str)).not.toBe(str);
    expect(shuffle(str).length).toBe(str.length);
});

test('sub', () => {
    expect(sub('ABCDEFG', 'BDG')).toEqual('ACEF');
    expect(sub('ABCDEFG', 'BDGH')).toEqual('ACEF');
    expect(sub('ABCDEFG', 'BdG')).toEqual('ACDEF');
    expect(sub('ABCDEFG', '')).toEqual('ABCDEFG');
    expect(sub('ABCDEFG', '12IJ0')).toEqual('ABCDEFG');
    expect(sub('', 'BdG')).toEqual('');
});

test('validate with default settings', () => {
    expect(validate('ABCDEFGH')).toBeFalsy(); //0001
    expect(validate('abcdefgh')).toBeFalsy(); //0010
    expect(validate('abcdEFGH')).toBeFalsy(); //0011
    expect(validate('23456722')).toBeFalsy(); //0100
    expect(validate('234567aa')).toBeFalsy(); //0101
    expect(validate('234567AA')).toBeFalsy(); //0110
    expect(validate('234567aB')).toBeFalsy(); //0111
    expect(validate('--------')).toBeFalsy(); //1000
    expect(validate('-aaaaaaa')).toBeFalsy(); //1001
    expect(validate('-AAAAABB')).toBeFalsy(); //1010
    expect(validate('-aaaaaBB')).toBeFalsy(); //1011
    expect(validate('-2345568')).toBeFalsy(); //1100
    expect(validate('-aaa22bb')).toBeFalsy(); //1101
    expect(validate('-AAA22BB')).toBeFalsy(); //1110
    expect(validate('-AAA22aa')).toBeTruthy(); //1111
    expect(validate('-AAA2a')).toBeFalsy(); //1111
    expect(validate('-AAA22aabb')).toBeTruthy(); //1111
    expect(validate('-AAA22aabb_')).toBeFalsy(); //1111
});

// Validatorが正しく動くことを保証した上で，作成したパスワードすべてがvalidであることを確認する
test('generate with default settings', () => {
    const passwords = generate();
    expect(passwords.length).toBe(DEFAULT_SETTINGS.count);
    for(const password in passwords) {
        expect(validate(password)).toBeTruthy();
    }
});
