"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBem = exports.isIdentifier = exports.isAName = exports.startWithSlash = exports.finishWithSlash = exports.removeDoubledSlashes = exports.removeLeadingSlashes = exports.transformBooleanToDotString = exports.capitalize = void 0;
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
exports.capitalize = capitalize;
const transformBooleanToDotString = (pathArg) => {
    return pathArg === true ? '.' : pathArg;
};
exports.transformBooleanToDotString = transformBooleanToDotString;
const removeLeadingSlashes = (path) => {
    const m = /^(?:[\/]+)(?<rest>\/.+)/.exec(path);
    if (m) {
        return m.groups.rest;
    }
    return path;
};
exports.removeLeadingSlashes = removeLeadingSlashes;
const removeDoubledSlashes = (path) => path.replaceAll("//", "/");
exports.removeDoubledSlashes = removeDoubledSlashes;
const finishWithSlash = (path) => !/\/$/.test(path) ? path + "/" : path;
exports.finishWithSlash = finishWithSlash;
const startWithSlash = (path) => !/^\//.test(path) ? "/" + path : path;
exports.startWithSlash = startWithSlash;
/**
 * Check upon the name and expect it to be an alphanumerical name (+)
 * @param string the string
 * @returns
 */
const isAName = (string) => /^[a-zA-Z][a-zA-Z0-9]+$/.test(string);
exports.isAName = isAName;
/**
 * Check upon the name and expect it starts at least by an alphabetical letter (*)
 * @param string the string
 * @returns
 */
const isIdentifier = (string) => /^[a-zA-Z][a-zA-Z0-9]*$/.test(string);
exports.isIdentifier = isIdentifier;
/**
 * Check upon the name and expect it to follow the BEM convention
 * @param string
 * @returns
 * @see https://getbem.com/introduction/
 */
const isBem = (string) => /^(?:(?:[a-z](?:-?[a-z0-9]+)*-?[a-z0-9])|([a-z]))$/.test(string);
exports.isBem = isBem;
//# sourceMappingURL=strings.js.map