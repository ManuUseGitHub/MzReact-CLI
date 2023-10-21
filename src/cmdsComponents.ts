import { getContentsOfTemplateFiles } from "./templateAnalyser";
import { CliProgram } from "./types";
import { checkFolderTree, findAncestorFile, findDirBackNavigation, isFileExists, writefile } from "./utils/files";
import { capitalize } from "./utils/strings";

// exemple : myProject/src/components/some/nested/Path:Folder:ComponentName:prefix
const COMPONENT_PATH_DEFINITION_PATTERN = /([^:]*):?([^:]*):?([^:]*)/;

const cli: CliProgram = { options: undefined, instance: undefined }

type Definitions = {
    name: string;
    prefix: string;
};

const verifyNames = (m: RegExpExecArray, folder: string) => {
    if (!/^[a-zA-Z0-9].*$/.test(folder)) {
        cli.instance?.error("The destination folder starts illegaly first letter should be in this interval : [a-zA-Z0-9]")
    }

    if ((m[2] && !/^[a-zA-Z][a-zA-Z0-9]+$/.test(m[2])) || (
        !m[2] && !/^[a-zA-Z][a-zA-Z0-9]*$/.test(folder))) {

        cli.instance?.error("The component name is incorrect !")
    }

    else if (m[3] && !/^(?:(?:[a-z](?:-?[a-z0-9]+)*-?[a-z0-9])|([a-z]))$/.test(m[3])) {
        cli.instance?.error("The prefix is invalid ! It should follow the BEM convention for blocks")
    }
}

const getComponentName = (m: RegExpExecArray, folder: string): Definitions => {
    if (m[3]) {
        return {
            name: m[2],
            prefix: m[3],
        };
    }
    if (m[2]) {
        return {
            name: folder,
            prefix: m[2],
        };
    }
    return {
        name: folder,
        prefix: folder.toLowerCase().replace(" ", "-"),
    }
}

const writeComponentFiles = (folderTree: string, replacements: Map<string, string>) => {
    let configFilePath = findAncestorFile('.mzr.md');

    let distTemplateFile = __dirname + "/template/.mzr-custom.md";
    if (!isFileExists(distTemplateFile)) {
        distTemplateFile = __dirname + "/template/.mzr.md";
    }

    getContentsOfTemplateFiles(replacements, configFilePath ? configFilePath : distTemplateFile)
        .forEach(element => {
            writefile(`${folderTree}/${element.file}`, element.template);
        });
};
function onReadFile(fileName: string) {
    if (!cli.options?.force) {
        throw ` ... Aborting because: Files in target directory !!!       
- Make sure to create the component in a directory containing no files! 
- OR you can use the '--force' option or use 'gfc <ComponentName>' 
    - gcf is equivalent to "--generate [--force] --component  <ComponentName> [--force]" 
`;
    }
}

const createReplacementsMapping = (folderTree: string, componentNames: Definitions) => {
    return new Map([
        ["#__TO_ROOT__#", findDirBackNavigation(folderTree, "src")!],
        ["#__COMPONENT__#", componentNames.name],
        ["#__PREFIX__#", componentNames.prefix],
    ]);
}

const createComponent = (pathArg: string) => {
    const m = COMPONENT_PATH_DEFINITION_PATTERN.exec(pathArg);
    if (m) {
        const filepath = m[1];
        const folder = capitalize(
            filepath.substring(filepath.lastIndexOf("/") + 1)
        );

        verifyNames(m, folder);
        const folderTree = checkFolderTree(filepath, onReadFile);
        const componentNames = getComponentName(m, folder);

        writeComponentFiles(folderTree, createReplacementsMapping(folderTree, componentNames));
        return `Your component ${componentNames.name} is ready!`
    }
    return "Command executed ..."
};

export {
    createComponent,
    cli
}