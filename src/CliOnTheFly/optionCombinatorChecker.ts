import { OptionValues } from "commander"
import { ActivationOptionType } from "./optionActivations"
import { Combinable, MaskConfig } from "./types";

class Checker implements Combinable {
    constructor(private maskConfig: MaskConfig) { }

    public isViableOptions = (options: ActivationOptionType) => {
        const keys: string[] = Object.keys(options);
        if (keys.length == 1) {
            const result = this.isViableUnary(options);
            return result;
        } else if (keys.length > 1) {
            return this.isViableCombination(options);
        }
        return 0;
    }

    private combinationToPick = (options: OptionValues): string[] => {
        return Object.keys(options)
            .map(o => o.charAt(0))
            .filter(x => this.maskConfig.combination[x]);
    }

    private findCombination = (options: OptionValues) => {
        const toPick = this.combinationToPick(options);
        if (toPick.length > 1) {
            return "0";
        }

        if (toPick.length) {
            const entry: string = toPick[0];
            return this.maskConfig.combination[entry] || "0";
        }
    }

    private isViableUnary = (options: ActivationOptionType) => {

        const selectiveWordsPipeSeparated = `(${this.maskConfig.pureUnaries.join("|")})`;
        const firstOption: string = Object.keys(options)[0];
        return RegExp(selectiveWordsPipeSeparated)
            .test(firstOption) ? 1 : 0;
    }

    private setIfMatches = (options: ActivationOptionType, ...keys: any[]) => {
        return keys
            .map(x => options[x] ? "1" : "0")
            .join("");
    }

    private isViableCombination = (options: ActivationOptionType) => {

        const combinatory = this.findCombination(options)!;
        const mask = this.setIfMatches(options, ...this.maskConfig.orderKeys);

        return parseInt(combinatory, 2) & parseInt(mask, 2)
    }
}

export { Checker }