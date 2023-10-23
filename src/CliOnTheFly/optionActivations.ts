import { Option } from "commander";
import { removeCharacterRepetition, startsAsAShortOption, startsNotHyphenized, toObejct } from "./utils";

type ActivationOptionType =
    { [x: string]: boolean }

const hyphenIzeArgv = () => {

    let argv = process.argv;

    if(argv[2]){
        if (startsNotHyphenized(argv[2])) {
            argv[2] = '-' + removeCharacterRepetition(argv[2]);
            
        }
    
        if(startsAsAShortOption(argv[2])){
            argv[2] = removeCharacterRepetition(argv[2])
        }
    }

    return argv;
}

const defined = (x: string) => x !== undefined;
const activate = (x: string) => ({ [x!]: true });

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

const getActivationWithShortNames = (argv: string, options: readonly Option[]): string[] => {

    const optionsByLetter = toObejct(getOptionsByLetters(options));

    return argv.substring(1).split('')
        .map(x => (optionsByLetter[x]));
}


const makeListOfEffectiveLongOptions = (effectives: string[]): any[] => {
    return effectives.map(x => {
        let m = null;
        return (m = /^--(?<option>.+)/.exec(x)) ?
            m.groups!.option :
            x
    });
}

const makeListOfShortsEffectiveOptions = (effectives: string[], cb: (x: string) => any) => {
    let activatedShortOptions: ActivationOptionType = {};
    effectives.map(x => {
        if (/^\-[^\-]/.test(x)) {
            activatedShortOptions = Object.assign(activatedShortOptions, cb(x))
        }
    })
    return activatedShortOptions;
}

const collectShortOptions = (effectives: string[], options: readonly Option[]) => {
    return makeListOfShortsEffectiveOptions(effectives,
        x => toObejct(getActivationWithShortNames(x, options)
            .filter(defined)
            .map(activate)
        )
    );
}

const collectLongOptions = (effectives: string[], optionsLongNames: (string | undefined)[]) => {
    return toObejct(makeListOfEffectiveLongOptions(effectives)
        .filter(x => optionsLongNames.includes(x))
        .map(activate)
    );
}

const getActivationWithLongNames = (effectives: string[], options: readonly Option[]) => {
    return Object.assign(
        collectShortOptions(effectives, options),
        collectLongOptions(effectives, getOptionsByLongName(options))
    );
}

export { ActivationOptionType, getActivatedOptions }