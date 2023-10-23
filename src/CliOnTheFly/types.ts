import { ActivationOptionType } from "./optionActivations";

interface Combinable {
    /**
     * 
     * @param activations 
     * @returns 
     */
    isViableOptions: (activations: ActivationOptionType) => number;
}

type MaskConfig = {
    combination: { [k: string]: string };
    pureUnaries: string[];
    orderKeys: string[];
}

export { Combinable, MaskConfig }