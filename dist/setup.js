"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionMaskConfig = exports.programConfig = void 0;
const errorsHandling_1 = require("./errorsHandling");
const chalk_1 = __importDefault(require("chalk"));
// @ts-ignore
const { version, name } = require('../package.json');
const programConfig = (program) => {
    (0, errorsHandling_1.parseCommand)(program
        .version(chalk_1.default.blue(`${name} ${version}`), "-V, --version", "display the version")
        .description("A CLI to help with React TS/JS")
        .option("-g, --generate", "introduces the generation of something. try coupling it with [-c,...]")
        .option("-r, --reclaim", "reclaim a resource template. try coupling it with [-m,...]")
        .option("-c, --component  <value>", "The component")
        .option("-m, --modeling   [value]", "Updates the component design model")
        .option("-f, --force", "force the action")
        .option("-h, --help", "display help for command"));
    (0, errorsHandling_1.manageErrors)(program);
    return program;
};
exports.programConfig = programConfig;
const optionMaskConfig = {
    combinations: {
        m: "001100",
        c: "010100"
    },
    pureUnaries: [
        "help",
        "version"
    ],
    orderKeys: ["force", "reclaim", "generate", "version", "help"]
};
exports.optionMaskConfig = optionMaskConfig;
//# sourceMappingURL=setup.js.map