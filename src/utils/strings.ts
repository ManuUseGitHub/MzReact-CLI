export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const transformBooleanToDotString = (pathArg: string | boolean) => {
    return pathArg === true ? '.' : pathArg as string;
}
export const removeLeadingSlashes = (path: string) => {
    const m = /^(?:[\/]+)(?<rest>\/.+)/.exec(path);
    if (m) {
        return m.groups!.rest
    }
    return path;
}

export const removeDoubledSlashes = (path: string) => 
    path.replaceAll("//", "/");

export const finishWithSlash = (path: string) => 
    !/\/$/.test(path) ? path + "/" : path;

export const startWithSlash = (path: string) => 
    !/^\//.test(path) ? "/" + path : path;

/**
 * Check upon the name and expect it to be an alphanumerical name (+)
 * @param string the string
 * @returns 
 */
export const isAName = (string: string) => 
    /^[a-zA-Z][a-zA-Z0-9]+$/.test(string);

/**
 * Check upon the name and expect it starts at least by an alphabetical letter (*)
 * @param string the string
 * @returns 
 */
export const isIdentifier = (string: string) => 
    /^[a-zA-Z][a-zA-Z0-9]*$/.test(string);

/**
 * Check upon the name and expect it to follow the BEM convention
 * @param string 
 * @returns 
 * @see https://getbem.com/introduction/
 */
export const isBem = (string:string) => 
    /^(?:(?:[a-z](?:-?[a-z0-9]+)*-?[a-z0-9])|([a-z]))$/.test(string);