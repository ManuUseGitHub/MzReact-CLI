import { TemplateStateType } from "./types";

export const BuiltTemplateState = (): TemplateStateType => ({
    cpt: 0,
    analyser: "",
    descriptions: [],
    template: undefined,
    isReadingContent: false,
    content: []
})