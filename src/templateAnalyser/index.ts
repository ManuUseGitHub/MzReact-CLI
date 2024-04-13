import fs from "fs";
import { TemplateStateType, TemplateType } from "./types";
import { ReadingProcess } from "./analyseProcess";
import { BuiltTemplateState } from "./builds";
import { readContentOfFile } from "../utils/files";

export type templateFileType = {
    file: string,
    template: string
};
export const getContentsOfTemplateFiles = (
    replacements: Map<string, string>, configFilePath: string
) => {
    const log = readContentOfFile(configFilePath);
    return analyse(log, replacements);

};

const onMarker = (state: TemplateStateType) => {
    let m = null;
    if (m = /^(# (\w+))\n/.exec(state.analyser)) {
        state.template = { file: m[2].toLowerCase(), template: "" };
        state.analyser = "";
        return true;
    }
    return false;
}

const analyse = (log: string, replacements: Map<string, string>): TemplateType[] => {
    const state = BuiltTemplateState();

    processTheAnalyse(
        new ReadingProcess(state, replacements),
        state,
        log
    );

    return state.descriptions;
}

function processTheAnalyse(rProcess: ReadingProcess, state: TemplateStateType, log: string) {
    while (state.cpt < log.length) {
        if (onMarker(state) || rProcess.onReadingTemplateStart()) {
            continue;
        };
        continueAnalyse(rProcess, state, log)
    }
}

function continueAnalyse(rProcess: ReadingProcess, state: TemplateStateType, log: string) {
    rProcess.onReadingTemplate(log);
    state.analyser += log[state.cpt];
    rProcess.onStopReadingTemplate();
    state.cpt++;
}

