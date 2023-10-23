import { Option } from "commander";
import { detailCommand } from "./commandDetailer";

type ActivationOptionType =
    { [x: string]: boolean }

const hyphenIzeArgv = () => {

    let argv = process.argv;

    if (argv[2] && /^[^\-]/.test(argv[2])) {
        argv[2] = '-' + argv[2];
    }

    detailCommand(argv);

    return argv;
}

const getActivatedOptions = (options: readonly Option[]): ActivationOptionType => {
    const argv = hyphenIzeArgv();
    const effectives = argv.slice(2);

    const activated = getActivationWithLongNames(effectives, options)
    return activated
}

const getOptionsByLetters = (options: readonly Option[]) => {
    return options.map(o => ({ [o.short!.charAt(1)]: o.long?.substring(2) })!);
}

const getOptionsByLongName = (options: readonly Option[]) => {
    return options.map(o => (o.long?.substring(2)));
}

const getActivationWithShortNames = (argv: string, options: readonly Option[]) => {

    const optionsByLetter = Object.assign({}, ...getOptionsByLetters(options));

    return Object.assign({}, ...argv.substring(1).split('')
        .map(x => (optionsByLetter[x]))
        .filter(x => x !== undefined)
        .map(x => ({ [x!]: true })));
}

const getActivationWithLongNames = (effectives: string[], options: readonly Option[]) => {
    const optionsLongNames = getOptionsByLongName(options);
    let activatedShortOptions = {}

    const activatedLongOptions = Object.assign({}, ...effectives.map(x => {
        let m = null;
        if ((m = /^--(?<option>.+)/.exec(x))) {
            return m.groups!.option
        }
        else if (/^\-[^\-]/.test(x)) {
            activatedShortOptions = Object.assign(activatedShortOptions, getActivationWithShortNames(x, options));
        }
    })
        .filter(x => optionsLongNames.includes(x))
        .map(x => ({ [x!]: true })));

    const result = Object.assign(activatedLongOptions, activatedShortOptions)
    return result;
}

export { ActivationOptionType, getActivatedOptions }