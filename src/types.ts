import { Command, OptionValues } from "commander"

type CliProgram = {
    options: OptionValues | undefined,
    instance: Command | undefined
}

type CommandMatch = {
    path: string,
    custFolder: string,
    custPrefix: string
}

type DefinitionCandidate = {
    definitions: string[];
    definition: string;
    base: string;
};

export { CliProgram, CommandMatch, DefinitionCandidate }