import { Command, OptionValues } from "commander"

type CliProgram = {
    options: OptionValues | undefined,
    instance: Command | undefined
}

export { CliProgram }