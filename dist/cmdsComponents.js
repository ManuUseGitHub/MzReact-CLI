"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = exports.createComponent = void 0;
const chalk_1 = __importDefault(require("chalk"));
const templateAnalyser_1 = require("./templateAnalyser");
const files_1 = require("./utils/files");
const strings_1 = require("./utils/strings");
const regexes_1 = require("./utils/regexes");
const cli = { options: undefined, instance: undefined };
exports.cli = cli;
const verifyNames = (m, folder) => {
    const { custFolder, custPrefix } = m.groups;
    if ((custFolder && !(0, strings_1.isAName)(custFolder)) || (!custFolder && !(0, strings_1.isIdentifier)(folder))) {
        //cli.instance?.error("error")
        throw new Error("The component name is incorrect ! By default, the CLI applies the folder name as the component name. Consider reading the customization (https://www.npmjs.com/package/mzreact-cli#customization) to maybe tacle this issue ");
    }
    else if (custPrefix && !(0, strings_1.isBem)(custPrefix)) {
        throw new Error("The prefix is invalid ! It should follow the BEM convention for blocks");
    }
};
const exists = (x) => x !== "" && x !== undefined;
const toCamelCase = (s) => s.replace(/-([a-z])/g, (g) => g[1].toUpperCase()); //
const getTransformed = (basePath, x) => {
    let m;
    if ((m = regexes_1.PARSED_TO_NAME.exec(x))) {
        const groups = m.groups;
        const path = groups.same || groups.nested;
        if (path || groups.nested) {
            return getTransformed(basePath, path === "." ? basePath : path); //
        }
        if (groups.hyphened) {
            return toCamelCase(groups.hyphened);
        }
        return Object.entries(groups)
            .map(([key, value]) => {
            return key !== "qualify" ? value : undefined;
        })
            .find(exists);
    }
    return x;
};
const getComponentName = (m, folder) => {
    const { custFolder, custPrefix } = m.groups;
    if (custPrefix) {
        return {
            name: (0, strings_1.capitalize)(custFolder),
            prefix: custPrefix,
        };
    }
    if (custFolder) {
        return {
            name: (0, strings_1.capitalize)(custFolder),
            prefix: custFolder,
        };
    }
    return {
        name: (0, strings_1.capitalize)(folder),
        prefix: folder.toLowerCase().replace(" ", "-"),
    };
};
const writeComponentFiles = (folderTree, replacements) => {
    let configFilePath = (0, files_1.findAncestorFile)('.mzr.md');
    let distTemplateFile = __dirname + "/template/.mzr-custom.md";
    if (!(0, files_1.isFileExists)(distTemplateFile)) {
        distTemplateFile = __dirname + "/template/.mzr.md";
    }
    (0, templateAnalyser_1.getContentsOfTemplateFiles)(replacements, configFilePath ? configFilePath : distTemplateFile)
        .forEach(element => {
        (0, files_1.writefile)(`${folderTree}/${element.file}`, element.template);
    });
};
function onReadFile(fileName) {
    var _a;
    if (!((_a = cli.options) === null || _a === void 0 ? void 0 : _a.force)) {
        throw ` ... Aborting because: Files in target directory !!!       
- Make sure to create the component in a directory containing no files! 
- OR you can use the '--force' option or use 'gfc <ComponentName>' 
    - gcf is equivalent to "--generate [--force] --component  <ComponentName> [--force]" 
`;
    }
}
const createReplacementsMapping = (folderTree, componentNames) => {
    return new Map([
        ["#__TO_ROOT__#", (0, files_1.findDirBackNavigation)(folderTree, "src")],
        ["#__COMPONENT__#", componentNames.name],
        ["#__PREFIX__#", componentNames.prefix],
    ]);
};
const pathArgsAsList = (pathArg) => {
    const m = regexes_1.COMPONENT_PATH_HAVING_MULTIPLE_DEFINITIONS.exec(pathArg);
    if (m) {
        let { base, subPathDefinitions } = m.groups;
        if ((0, files_1.isFileExists)(subPathDefinitions)) {
            subPathDefinitions = (0, files_1.readContentOfFile)(subPathDefinitions)
                .split("\n").join(",").replace(",,", ',');
        }
        return subPathDefinitions
            .split(",")
            .map((sub) => (base + "/" + sub).replace("//", "/"));
    }
    return [pathArg];
};
const createComponent = (pathArg) => {
    const messages = {
        success: [],
        fail: {}
    };
    // TODO: change here
    const m = regexes_1.COMPONENT_PATH_HAVING_MULTIPLE_DEFINITIONS.exec(pathArg);
    const base = m ? m[1] : pathArg;
    pathArgsAsList(pathArg).forEach((definition) => {
        const m = regexes_1.COMPONENT_PATH_DEFINITION_PATTERN.exec(definition);
        if (m) {
            const filepath = m[1];
            const folder = (0, strings_1.capitalize)(filepath.substring(filepath.lastIndexOf("/") + 1));
            try {
                const transformed = getTransformed(base, folder);
                verifyNames(m, transformed);
                const folderTree = (0, files_1.checkFolderTree)(filepath, onReadFile);
                let componentNames = getComponentName(m, transformed);
                writeComponentFiles(folderTree, createReplacementsMapping(folderTree, componentNames));
                messages.success.push(`${componentNames.name}`);
            }
            catch (err) {
                messages.fail[folder] = chalk_1.default.red(err.message || err);
            }
        }
    });
    return commandConclusion(messages);
};
exports.createComponent = createComponent;
function commandConclusion(messages) {
    let result = ["Command executed ..."];
    const failures = Object.keys(messages.fail);
    if (messages.success.length > 0) {
        result.push(`\x1b[37m[\x1b[32m✔\x1b[37m] \x1b[32m ${messages.success.length} components sucessfuly created :\n${messages.success.map(n => `\x1b[37m${n}\x1b[32m`).join(", ")}`);
    }
    if (messages.success.length && failures.length) {
        result.push('\x1b[37m\n----------------------------\n');
    }
    if (failures.length) {
        result.push(`\x1b[37m[\x1b[31mx\x1b[37m] \x1b[31m ${failures.length} component(s) failed to be created\n${Object.entries(messages.fail).map(x => {
            const [name, message] = x;
            return `\x1b[31m    x \x1b[41m\x1b[37m${name}\n\x1b[31m\x1b[49m      ${message}\n`;
        }).join("\n")}`);
    }
    return result.join("\n");
}
//# sourceMappingURL=cmdsComponents.js.map