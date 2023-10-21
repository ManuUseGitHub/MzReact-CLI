export type TemplateType = { file: string, template: string }

export type TemplateStateType = {
    cpt: number,
    analyser: string,
    descriptions: TemplateType[]
    template: TemplateType | undefined,
    isReadingContent: boolean,
    content: string[]
}