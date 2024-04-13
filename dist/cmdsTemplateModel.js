"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reclaimTemplateModel = exports.createTemplateModel = void 0;
const enums_1 = require("./utils/enums");
const exceptions_1 = require("./utils/exceptions");
const files_1 = require("./utils/files");
const strings_1 = require("./utils/strings");
const getMissingFileException = (source) => new exceptions_1.MzException(enums_1.Reason.RESOURCE_NOT_FOUND, enums_1.SeverityEnum.HIGH, `No config file defined for templating. Make one to proceed further (given:${source})`, 404);
const launchCopy = (sourceFile, destinationFile) => {
    if ((0, files_1.isFileExists)(sourceFile)) {
        (0, files_1.copyFile)(sourceFile, destinationFile);
    }
    else {
        throw getMissingFileException(sourceFile);
    }
};
const createTemplateModel = (pathArg) => {
    const normalizedPath = pathArg === "/" ? "" : pathArg;
    const sourceFile = (0, files_1.getFilePathOfRelativeFolder)(`${normalizedPath}/.mzr.md`);
    const destinationFile = (0, files_1.pathFromExecution)(`/template/.mzr-custom.md`);
    launchCopy(sourceFile, destinationFile);
};
exports.createTemplateModel = createTemplateModel;
const reclaimTemplateModel = (pathArg) => {
    const normalizedPath = (0, files_1.rootifyFilePath)(pathArg);
    const sourceFile = (0, files_1.rootifyFilePath)((0, files_1.pathFromExecution)(`/template/.mzr.md`));
    const destinationFile = (0, files_1.rootifyFilePath)(`${(0, strings_1.finishWithSlash)(normalizedPath)}.mzr.md`);
    (0, files_1.createFolderTree)(destinationFile);
    launchCopy((0, strings_1.startWithSlash)(sourceFile), destinationFile);
};
exports.reclaimTemplateModel = reclaimTemplateModel;
//# sourceMappingURL=cmdsTemplateModel.js.map