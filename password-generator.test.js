import * as main from './password-generator';

const constrains1 = {
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
        chars: '-_',
        required: true,
        allowSpace: false
    }
};

const constrains2 = {
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
        chars: '-_',
        required: true,
        allowSpace: false
    }
};

test('validate', () => {
    main.setConstrains(constrains1);
    expect(main.validate('1A3-56a')).toBeFalsy();
    expect(main.validate('1A3-56ab')).toBeTruthy();
    expect(main.validate('1A3-56abc')).toBeFalsy();
    expect(main.validate('1A3-56AB')).toBeFalsy();
    expect(main.validate('1A3456aB')).toBeFalsy();
});

test('getRandomUpperCaseLetter', () => {
    expect(main.getRandomUpperCaseLetter()).toEqual(expect.stringMatching(/[A-Z]/));
    expect(main.getRandomUpperCaseLetter()).toEqual(expect.stringMatching(/[A-Z]/));
    expect(main.getRandomUpperCaseLetter()).toEqual(expect.stringMatching(/[A-Z]/));
});

test('getRandomLowerCaseLetter', () => {
    expect(main.getRandomLowerCaseLetter()).toEqual(expect.stringMatching(/[a-z]/));
    expect(main.getRandomLowerCaseLetter()).toEqual(expect.stringMatching(/[a-z]/));
    expect(main.getRandomLowerCaseLetter()).toEqual(expect.stringMatching(/[a-z]/));
});

test('getRandomAlphabetLetter', () => {
    expect(main.getRandomAlphabetLetter()).toEqual(expect.stringMatching(/[A-Za-z]/));
    expect(main.getRandomAlphabetLetter()).toEqual(expect.stringMatching(/[A-Za-z]/));
    expect(main.getRandomAlphabetLetter()).toEqual(expect.stringMatching(/[A-Za-z]/));
});

test('shuffle', () => {
    const str = 'hogehoge';
    expect(main.shuffle(str)).not.toEqual(str);
    expect(main.shuffle(str).length).toBe(str.length);
});

test('generate', () => {
    expect(main.validate(main.generate(constrains1))).toBeTruthy();
});