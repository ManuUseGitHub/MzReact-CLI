"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePathOfRelativeFolder = exports.findDirBackNavigation = exports.findAncestorFile = exports.checkFolderTree = exports.createDir = exports.createFolderTree = exports.writefile = exports.readContentOfFile = exports.isFileExists = exports.copyFile = exports.rootifyFilePath = exports.pathFromExecution = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const strings_1 = require("./strings");
const findAncestorDirectory = (currentPath, target, ups = []) => {
    const parentPath = path_1.default.dirname(currentPath);
    if (parentPath === currentPath) {
        return [];
    }
    if (fs_1.default.readdirSync(parentPath)
        .includes(target) && fs_1.default.statSync(path_1.default.join(parentPath, target))
        .isDirectory()) {
        return ups;
    }
    return findAncestorDirectory(parentPath, target, ups.concat('../'));
};
const createDir = (filepath, onReadFile) => {
    if (fs_1.default.existsSync(filepath)) {
        fs_1.default.readdirSync(filepath)
            .forEach((pathString) => {
            const fileName = path_1.default.join(filepath, pathString);
            const fileStats = fs_1.default.lstatSync(fileName);
            if (fileStats.isFile()) {
                onReadFile(fileName);
            }
        });
    }
    else
        fs_1.default.mkdirSync(filepath, { recursive: true });
};
exports.createDir = createDir;
const createFolderTree = (filepath) => {
    fs_1.default.mkdirSync(path_1.default.dirname(filepath), { recursive: true });
};
exports.createFolderTree = createFolderTree;
const findAncestorFile = (search) => {
    let cpt = 0;
    let moveUps = "";
    const testPattern = (ups) => `${process.cwd()}/${ups}${search}`;
    const find = (ups) => fs_1.default.existsSync(testPattern(ups));
    while (cpt < 10) {
        if (find(moveUps)) {
            return testPattern(moveUps);
        }
        moveUps += "../";
        cpt++;
    }
    return null;
};
exports.findAncestorFile = findAncestorFile;
const checkFolderTree = (filepath, onReadFileCB) => {
    let f;
    let folderTree = "/";
    if ((f = /.*[\/]dist([\/].*)/.exec(filepath))) {
        folderTree = "./" + f[1];
        createDir(folderTree, onReadFileCB);
    }
    return folderTree;
};
exports.checkFolderTree = checkFolderTree;
const findDirBackNavigation = (folderTree, target) => {
    let search = rootifyFilePath(folderTree);
    const challenge = `${process.cwd()}/${search}`;
    const backPath = findAncestorDirectory(challenge, target).join('');
    return backPath;
};
exports.findDirBackNavigation = findDirBackNavigation;
const rootifyFilePath = (pathArg) => {
    let normalizedPath = (0, strings_1.transformBooleanToDotString)(pathArg);
    normalizedPath = (0, strings_1.removeLeadingSlashes)(normalizedPath);
    normalizedPath = normalizedPath.replace("./", "");
    let m = /^[.]{2}(?<rest>[^\/].+)/.exec(normalizedPath);
    if (m) {
        normalizedPath = '.' + m.groups.rest;
    }
    return (0, strings_1.removeDoubledSlashes)(normalizedPath);
};
exports.rootifyFilePath = rootifyFilePath;
const readContentOfFile = (filePath) => fs_1.default.readFileSync(filePath).toString();
exports.readContentOfFile = readContentOfFile;
const writefile = (fileName, content) => {
    fs_1.default.writeFileSync(fileName, content);
};
exports.writefile = writefile;
const copyFile = (filePath, destination) => {
    fs_1.default.copyFileSync(filePath, destination);
    return `${filePath} was copied to ${destination}`;
};
exports.copyFile = copyFile;
const isFileExists = (filePath) => {
    return fs_1.default.existsSync(filePath);
};
exports.isFileExists = isFileExists;
const pathFromExecution = (filePath) => {
    return rootifyFilePath(path_1.default.join(__dirname, filePath));
};
exports.pathFromExecution = pathFromExecution;
const getFilePathOfRelativeFolder = (filePath) => {
    return rootifyFilePath(path_1.default.join(process.cwd(), filePath));
};
exports.getFilePathOfRelativeFolder = getFilePathOfRelativeFolder;
//# sourceMappingURL=files.js.map