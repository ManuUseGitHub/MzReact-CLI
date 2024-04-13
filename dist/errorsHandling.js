"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = exports.manageErrors = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
const manageErrors = (config) => {
    config
        .exitOverride()
        .configureOutput({
        writeErr: (str) => {
            log(chalk_1.default.bgRed("Command failed"));
            log(chalk_1.default.red(str));
        }
    });
};
exports.manageErrors = manageErrors;
const parseCommand = (config) => {
    try {
        config.parse();
    }
    catch (err) {
        if (process.argv[2] !== '-V') {
            throw (err);
        }
    }
};
exports.parseCommand = parseCommand;
//# sourceMappingURL=errorsHandling.js.map