import { Command, OptionValues } from "commander"

export type CliProgram = {
    options: OptionValues | undefined,
    instance: Command | undefined
}