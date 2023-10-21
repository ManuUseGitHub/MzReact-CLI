import { Reason, SeverityEnum } from "./utils/enums";
import { MzException } from "./utils/exceptions";
import { copyFile, createFolderTree, getFilePathOfRelativeFolder, isFileExists, pathFromExecution, rootifyFilePath } from "./utils/files";
import { finishWithSlash, startWithSlash } from "./utils/strings";

const getMissingFileException = (source: string) => new MzException(
    Reason.RESOURCE_NOT_FOUND,
    SeverityEnum.HIGH,
    `No config file defined for templating. Make one to proceed further (given:${source})`,
    404
)

const launchCopy = (sourceFile: string, destinationFile: string) => {
    if (isFileExists(sourceFile)) {
        copyFile(sourceFile, destinationFile);
    } else {
        throw getMissingFileException(sourceFile);
    }
}

const createTemplateModel = (pathArg: string) => {
    const normalizedPath = pathArg === "/" ? "" : pathArg;
    const sourceFile = getFilePathOfRelativeFolder(`${normalizedPath}/.mzr.md`);
    const destinationFile = pathFromExecution(`/template/.mzr-custom.md`);

    launchCopy(sourceFile, destinationFile);
}

const reclaimTemplateModel = (pathArg: string | boolean) => {
    const normalizedPath = rootifyFilePath(pathArg);
    const sourceFile = rootifyFilePath(pathFromExecution(`/template/.mzr.md`));
    const destinationFile = rootifyFilePath(`${finishWithSlash(normalizedPath)}.mzr.md`);

    createFolderTree(destinationFile);
    launchCopy(startWithSlash(sourceFile), destinationFile);
}

export {
    createTemplateModel,
    reclaimTemplateModel
}
