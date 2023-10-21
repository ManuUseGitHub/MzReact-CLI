import { OptionValues } from "commander"
import { ActivationOptionType } from "./optionActivations"

const HELP_OPTION = "help"
const VERSION_OPTION = "version"

const combination: { [x: string]: string } = {
    m: "001100",
    c: "010100",
    "?": "000000"
}

const findCombination = (options: OptionValues) => {
    const findCombinationToPick: any[] = Object
        .keys(options)
        .map(o => o.charAt(0))
        .filter(x => combination[x]);
    if (findCombinationToPick.length > 1) {
        return combination["?"];
    }

    if (findCombinationToPick.length) {
        const entry: string = findCombinationToPick[0];
        return combination[entry] || combination["?"];
    }
}

const isViableUnary = (options: ActivationOptionType) => {
    return RegExp(`(${[
        HELP_OPTION,
        VERSION_OPTION
    ].join("|")})`).test(Object.keys(options)[0]) ? 1 : 0;
}

const isViableCombination = (options: ActivationOptionType) => {

    const matching: number[] = [0, 0, 0, 0, 0, 0];

    const setIfMatches = (position: number, option: boolean) => {
        if (option) {
            matching[position] = 1;
        }
    }
    setIfMatches(1, options.force);
    setIfMatches(2, options.reclaim);
    setIfMatches(3, options.generate);
    setIfMatches(4, options.version);
    setIfMatches(5, options.help);

    const combinatory = findCombination(options)!;
    const mask = matching.join('');

    return parseInt(combinatory, 2) & parseInt(mask, 2)
}

export const isViableOptions = (options: ActivationOptionType) => {
    const keys: string[] = Object.keys(options);
    if (keys.length == 1) {
        const result = isViableUnary(options);
        return result;
    } else if (keys.length > 1) {
        return isViableCombination(options);
    }
    return 0;
}

