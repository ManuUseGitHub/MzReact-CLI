"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentsOfTemplateFiles = void 0;
const analyseProcess_1 = require("./analyseProcess");
const builds_1 = require("./builds");
const files_1 = require("../utils/files");
const getContentsOfTemplateFiles = (replacements, configFilePath) => {
    const log = (0, files_1.readContentOfFile)(configFilePath);
    return analyse(log, replacements);
};
exports.getContentsOfTemplateFiles = getContentsOfTemplateFiles;
const onMarker = (state) => {
    let m = null;
    if (m = /^(# (\w+))\n/.exec(state.analyser)) {
        state.template = { file: m[2].toLowerCase(), template: "" };
        state.analyser = "";
        return true;
    }
    return false;
};
const analyse = (log, replacements) => {
    const state = (0, builds_1.BuiltTemplateState)();
    processTheAnalyse(new analyseProcess_1.ReadingProcess(state, replacements), state, log);
    return state.descriptions;
};
function processTheAnalyse(rProcess, state, log) {
    while (state.cpt < log.length) {
        if (onMarker(state) || rProcess.onReadingTemplateStart()) {
            continue;
        }
        ;
        continueAnalyse(rProcess, state, log);
    }
}
function continueAnalyse(rProcess, state, log) {
    rProcess.onReadingTemplate(log);
    state.analyser += log[state.cpt];
    rProcess.onStopReadingTemplate();
    state.cpt++;
}
//# sourceMappingURL=index.js.map