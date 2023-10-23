import { Command } from "commander";
import { manageErrors, parseCommand } from "./errorsHandling";
import chalk from "chalk";

// @ts-ignore
const { version, name } = require('../package.json');

const programConfig = (program: Command) => {

    parseCommand(program
        .version(chalk.blue(`${name} ${version}`),"-V, --version","display the version")
        .description("A CLI to help with React TS/JS")
        .option("-g, --generate", "introduces the generation of something. try coupling it with [-c,...]")
        .option("-r, --reclaim", "reclaim a resource template. try coupling it with [-m,...]")
        .option("-c, --component  <value>", "The component")
        .option("-m, --modeling   [value]", "Updates the component design model")
        .option("-f, --force", "force the action")
        .option("-h, --help", "display help for command")
    )
    manageErrors(program);
    
    return program;
};

const optionMaskConfig = {
    combination:  {
        m: "001100",
        c: "010100"
    },
    pureUnaries : [
        "help",
        "version"
    ],
    orderKeys : [ "force", "reclaim", "generate", "version", "help" ]
}

export { programConfig, optionMaskConfig };