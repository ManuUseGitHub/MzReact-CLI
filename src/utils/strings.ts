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

export const removeDoubledSlashes = (path: string) => {
    return path.replaceAll("//", "/");
}

export const finishWithSlash = (path: string) => {
    return !/\/$/.test(path) ? path + "/" : path;
}

export const startWithSlash = (path: string) => {
    return !/^\//.test(path) ? "/" + path : path;
}