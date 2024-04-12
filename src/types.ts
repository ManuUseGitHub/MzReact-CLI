import { Command, OptionValues } from "commander"

type CliProgram = {
    options: OptionValues | undefined,
    instance: Command | undefined
}

type CommandMatch = {
    path:string,
    custFolder:string,
    custPrefix:string
}

export { CliProgram, CommandMatch }