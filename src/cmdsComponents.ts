import chalk from "chalk";
import { getContentsOfTemplateFiles } from "./templateAnalyser";
import { CliProgram, CommandMatch } from "./types";
import { checkFolderTree, findAncestorFile, findDirBackNavigation, isFileExists, readContentOfFile, writefile } from "./utils/files";
import { capitalize, isAName, isBem, isIdentifier } from "./utils/strings";

// exemple : myProject/src/components/some/nested/Path:Folder:ComponentName:prefix
const COMPONENT_PATH_DEFINITION_PATTERN =
    /(?<base>[^:]*):?(?<custFolder>[^:]*):?(?<custPrefix>[^:]*)/;

const COMPONENT_PATH_HAVING_MULTIPLE_DEFINITIONS =
    /(?<base>.*)=>(?<subPathDefinitions>.*)$/;

const cli: CliProgram = { options: undefined, instance: undefined }

type Definitions = {
    name: string;
    prefix: string;
};

const verifyNames = (m: RegExpExecArray, folder: string) => {
    const { custFolder, custPrefix } = m.groups as CommandMatch

    if ((custFolder && !isAName(custFolder)) || (
        !custFolder && !isIdentifier(folder))) {

        //cli.instance?.error("error")
        throw new Error("The component name is incorrect ! By default, the CLI applies the folder name as the component name. Consider reading the customization (https://www.npmjs.com/package/mzreact-cli#customization) to maybe tacle this issue ")
    }

    else if (custPrefix && !isBem(custPrefix)) {
        throw new Error("The prefix is invalid ! It should follow the BEM convention for blocks")
    }
}

const getComponentName = (m: RegExpExecArray, folder: string): Definitions => {
    const { custFolder, custPrefix } = m.groups as CommandMatch
    if (custPrefix) {
        return {
            name: capitalize(custFolder),
            prefix: custPrefix,
        };
    }
    if (custFolder) {
        return {
            name: capitalize(custFolder),
            prefix: custFolder,
        };
    }
    return {
        name: capitalize(folder),
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

const pathArgsAsList = (pathArg: string) => {
    const m = COMPONENT_PATH_HAVING_MULTIPLE_DEFINITIONS.exec(pathArg);
    if (m) {
        let { base, subPathDefinitions } = m.groups as any;

        if (isFileExists(subPathDefinitions)) {
            subPathDefinitions = readContentOfFile(subPathDefinitions)
                .split("\n").join(",").replace(",,", ',');
        }

        return subPathDefinitions
            .split(",")
            .map((sub: string) => (base + "/" + sub).replace("//", "/"));
    }
    return [pathArg];
}

const createComponent = (pathArg: string) => {
    const messages: { success: string[], fail:{[x:string]:string} } = {
        success: [],
        fail:{}
    };
    pathArgsAsList(pathArg).forEach((definition: string) => {
        const m = COMPONENT_PATH_DEFINITION_PATTERN.exec(definition);
        if (m) {
            
            const filepath = m[1];
                const folder = capitalize(
                    filepath.substring(filepath.lastIndexOf("/") + 1)
                );
            try {
                verifyNames(m, folder);
                const folderTree = checkFolderTree(filepath, onReadFile);
                let componentNames = getComponentName(m, folder);

                writeComponentFiles(folderTree, createReplacementsMapping(folderTree, componentNames));
                messages.success.push(`${componentNames.name}`);
            } catch (err:any) {
                messages.fail[folder] = chalk.red(err.message || err);
            }
        }
    });

    return commandConclusion(messages);
}

export {
    createComponent,
    cli
}

function commandConclusion(messages: { success: string[]; fail: { [x: string]: string; }; }) {
    let result = ["Command executed ..."];
    const failures = Object.keys(messages.fail);
    if(messages.success.length > 0) {
        result.push(`\x1b[37m[\x1b[32m✔\x1b[37m] \x1b[32m ${messages.success.length} components sucessfuly created :\n${
            messages.success.map(n => `\x1b[37m${n}\x1b[32m`).join(", ")
        }`);
    }
    if(messages.success.length && failures.length) {
        result.push('\x1b[37m\n----------------------------\n')
    }
    if(failures.length) {
        result.push(`\x1b[37m[\x1b[31mx\x1b[37m] \x1b[31m ${failures.length} component(s) failed to be created\n${
            Object.entries(messages.fail).map(x => {
                const [name,message] = x
                return `\x1b[31m    x \x1b[41m\x1b[37m${name}\n\x1b[31m\x1b[49m      ${message}\n`
            }).join("\n")}`)
    }
    return result.join("\n")
}
