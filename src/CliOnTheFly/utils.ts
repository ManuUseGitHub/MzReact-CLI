const toObejct = (arr: any[]) => Object.assign({}, ...arr);
const removeCharacterRepetition = (str: string) => [...new Set(str.split(''))].join("");
const startsNotHyphenized = (str: string) => /^[^\-]/.test(str);
const startsAsAShortOption = (str: string) => /^[\-][^\-]/.test(str);

export { toObejct, removeCharacterRepetition, startsAsAShortOption, startsNotHyphenized }