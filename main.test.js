const main = require('./main');

test('validate', () => {
    expect(main.validate('123456a')).toBeFalsy();
    expect(main.validate('123456ab')).toBeFalsy();
    expect(main.validate('123456AB')).toBeTruthy();
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
    expect(main.validate(main.generate())).toBeTruthy();
});