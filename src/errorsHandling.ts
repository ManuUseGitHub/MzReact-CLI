import chalk from "chalk";
import { Command } from "commander";

const log = console.log;

export const manageErrors = (config: Command) => {
    config
        .exitOverride()
        .configureOutput({
            writeErr: (str) => {
                log(chalk.bgRed("Command failed"));
                log(chalk.red(str))
            }
        })
}
export const parseCommand = (config: Command) => {
    try {
        config.parse()
    } catch (err) {
        if (process.argv[2] !== '-V') {
            throw (err);
        }
    }
}
