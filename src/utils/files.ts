import path from "path";
import fs from "fs";
import { removeDoubledSlashes, removeLeadingSlashes, transformBooleanToDotString } from "./strings";

const findAncestorDirectory = (currentPath: string, target: string, ups: string[] = []): string[] => {
    const parentPath = path.dirname(currentPath);

    if (parentPath === currentPath) {
        return [];
    }

    if (fs.readdirSync(parentPath)
        .includes(target) && fs.statSync(path.join(parentPath, target))
            .isDirectory()) {
        return ups;
    }

    return findAncestorDirectory(parentPath, target, ups.concat('../'));
}

const createDir = (filepath: string, onReadFile: (fileName: string) => void) => {
    if (fs.existsSync(filepath)) {
        fs.readdirSync(filepath)
            .forEach((pathString) => {
                const fileName = path.join(filepath, pathString);
                const fileStats: fs.Stats = fs.lstatSync(fileName);
                if (fileStats.isFile()) {
                    onReadFile(fileName);
                }
            });
    } else fs.mkdirSync(filepath, { recursive: true });
};

const createFolderTree = (filepath: string,) => {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
}

const findAncestorFile = (search: string) => {
    let cpt = 0;
    let moveUps = "";
    const testPattern = (ups: string) => `${process.cwd()}/${ups}${search}`
    const find = (ups: string) => fs.existsSync(testPattern(ups))

    while (cpt < 10) {
        if (find(moveUps)) {
            return testPattern(moveUps)
        }
        moveUps += "../"
        cpt++;
    }
    return null;
}

const checkFolderTree = (filepath: string, onReadFileCB: (filepath: string) => void) => {
    let f;
    let folderTree = "/";
    if ((f = /.*[\/]dist([\/].*)/.exec(filepath))) {
        folderTree = "./" + f[1];
        createDir(folderTree, onReadFileCB);
    }
    return folderTree;
};

const findDirBackNavigation = (folderTree: string, target: string) => {

    let search = rootifyFilePath(folderTree);
    const challenge = `${process.cwd()}/${search}`;
    const backPath = findAncestorDirectory(challenge, target).join('');

    return backPath;
}

const rootifyFilePath = (pathArg: string | boolean) => {
    let normalizedPath: string = transformBooleanToDotString(pathArg);

    normalizedPath = removeLeadingSlashes(normalizedPath);

    normalizedPath = normalizedPath.replace("./", "");
    let m = /^[.]{2}(?<rest>[^\/].+)/.exec(normalizedPath)
    if (m) {
        normalizedPath = '.' + m.groups!.rest;
    }

    return removeDoubledSlashes(normalizedPath);
}

const readContentOfFile = (filePath: string) => 
    fs.readFileSync(filePath).toString()

const writefile = (fileName: string, content: string) => {
    fs.writeFileSync(fileName, content);
}

const copyFile = (filePath: string, destination: string) => {
    fs.copyFileSync(filePath, destination);
    return `${filePath} was copied to ${destination}`;
}

const isFileExists = (filePath: string) => {
    return fs.existsSync(filePath);
}

const pathFromExecution = (filePath: string) => {
    return rootifyFilePath(path.join(__dirname, filePath));
}

const getFilePathOfRelativeFolder = (filePath: string) => {
    return rootifyFilePath(path.join(process.cwd(), filePath));
}

export {
    pathFromExecution,
    rootifyFilePath,
    copyFile,
    isFileExists,
    readContentOfFile,
    writefile,
    createFolderTree,
    createDir,
    checkFolderTree,
    findAncestorFile,
    findDirBackNavigation,
    getFilePathOfRelativeFolder
}