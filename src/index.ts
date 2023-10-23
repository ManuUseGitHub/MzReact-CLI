#! /usr/bin/env node

import { Command } from "commander";
import path from "path";
import { cli, createComponent } from "./cmdsComponents";
import chalk from "chalk";
import { parseCommand } from "./errorsHandling";
import { createTemplateModel, reclaimTemplateModel } from "./cmdsTemplateModel";
import { rootifyFilePath } from "./utils/files";
import { optionMaskConfig, programConfig } from "./setup";
import { Reason, SeverityEnum } from "./utils/enums";
import { MzException } from "./utils/exceptions";
import { getActivatedOptions } from "./CliOnTheFly/optionActivations";
import { Checker } from "./CliOnTheFly/optionCombinatorChecker";

const log = console.log;
const program = new Command();
const check: Checker = new Checker(optionMaskConfig);

try {
	const config = programConfig(program)

	const activated = getActivatedOptions(program.options);
	if (check.isViableOptions(activated)) {
		parseCommand(config);
	} else {
		throw new MzException(
			Reason.BAD_COMBINATION,
			SeverityEnum.MODERATE,
			"You may have requested a non-existing option or badly combined two distint purposes", 403);
	}

	const options = program.opts();

	// we copy the options into dedicated object from components module 
	// since we do not have access the local global options before we import

	cli.options = options;
	cli.instance = config;

	if (options.force) {
		log(chalk.bgYellow.bold("May the force be with you"));
		log(chalk.yellow("You used the force flag. We hope you know your doings ... We'll pray for you otherwise, R.I.P."))
	}

	if (options.generate) {
		if (options.component) {
			log(chalk.green(
				createComponent(path.resolve(__dirname, options.component))
			));
		}
		if (options.modeling) {
			createTemplateModel(rootifyFilePath(options.modeling));
			log("[\x1b[32m✔\x1b[37m] "+chalk.bgGreen.bold("Custom component modele successfully (Re)generated at CLI"));
		}
	}

	if(options.reclaim){
		if (options.modeling) {
			reclaimTemplateModel(options.modeling);
			log("[\x1b[32m✔\x1b[37m] "+chalk.bgGreen.bold("Component modele successfully (Re)claimed"));
		}
	}

	if (!process.argv.slice(2).length || options.help) {
		program.outputHelp();
	}

} catch (err) {
	if(err instanceof MzException){
		const except = err as MzException
		log(chalk.bgRed.bold(except.getTitle()));
		log('\n', chalk.red(except.getMessage()));
	}
	log(chalk.bgRed.bold(err));
	process.exit(1);
}

export { program }