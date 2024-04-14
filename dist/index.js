#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.program = void 0;
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const cmdsComponents_1 = require("./cmdsComponents");
const chalk_1 = __importDefault(require("chalk"));
const errorsHandling_1 = require("./errorsHandling");
const cmdsTemplateModel_1 = require("./cmdsTemplateModel");
const files_1 = require("./utils/files");
const setup_1 = require("./setup");
const enums_1 = require("./utils/enums");
const exceptions_1 = require("./utils/exceptions");
const mzclionfly_1 = require("mzclionfly");
const log = console.log;
const program = new commander_1.Command();
exports.program = program;
const check = new mzclionfly_1.Checker(setup_1.optionMaskConfig);
try {
    const config = (0, setup_1.programConfig)(program);
    const activated = (0, mzclionfly_1.getActivatedOptions)(program.options);
    if (check.isViableOptions(activated)) {
        (0, errorsHandling_1.parseCommand)(config);
    }
    else {
        throw new exceptions_1.MzException(enums_1.Reason.BAD_COMBINATION, enums_1.SeverityEnum.MODERATE, "You may have requested a non-existing option or badly combined two distint purposes", 403);
    }
    const options = program.opts();
    // we copy the options into dedicated object from components module 
    // since we do not have access the local global options before we import
    cmdsComponents_1.cli.options = options;
    cmdsComponents_1.cli.instance = config;
    if (options.force) {
        log(chalk_1.default.bgYellow.bold("May the force be with you"));
        log(chalk_1.default.yellow("You used the force flag. We hope you know your doings ... We'll pray for you otherwise, R.I.P."));
    }
    if (options.generate) {
        if (options.component) {
            log(chalk_1.default.green((0, cmdsComponents_1.createComponent)(path_1.default.resolve(__dirname, options.component))));
        }
        if (options.modeling) {
            (0, cmdsTemplateModel_1.createTemplateModel)((0, files_1.rootifyFilePath)(options.modeling));
            log("[\x1b[32m✔\x1b[37m] " + chalk_1.default.bgGreen.bold("Custom component modele successfully (Re)generated at CLI"));
        }
    }
    if (options.reclaim) {
        if (options.modeling) {
            (0, cmdsTemplateModel_1.reclaimTemplateModel)(options.modeling);
            log("[\x1b[32m✔\x1b[37m] " + chalk_1.default.bgGreen.bold("Component modele successfully (Re)claimed"));
        }
    }
    if (!process.argv.slice(2).length || options.help) {
        program.outputHelp();
    }
}
catch (err) {
    if (err instanceof exceptions_1.MzException) {
        const except = err;
        log(chalk_1.default.bgRed.bold(except.getTitle()));
        log('\n', chalk_1.default.red(except.getMessage()));
    }
    log(chalk_1.default.bgRed.bold(err));
    process.exit(1);
}
//# sourceMappingURL=index.js.map