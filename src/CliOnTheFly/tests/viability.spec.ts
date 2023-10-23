import { Command } from "commander";
import { getActivatedOptions } from "../optionActivations";
import { Checker } from "../optionCombinatorChecker";
const { programConfig, optionMaskConfig } = require("../setup");

const program: Command = programConfig(new Command());

const expectViable = (args: string): jest.JestMatchers<number> => {
    process.argv[2] = args;
    process.argv[3] = "test"
    const activated = getActivatedOptions(program.options);
    const check: Checker = new Checker(optionMaskConfig);

    return expect(check.isViableOptions(activated));
}

afterEach(() => {
    process.argv = [];
});

const getCombination = () => {
    const result = Object.keys(optionMaskConfig.combination)
        .map(l => "jklmnopqrstu wxyz".split('')
            .map((c, i) => {
                if (c !== " " && optionMaskConfig.combination[l][i + 9] === "1") {
                    return `-${l}${c}`
                }
            }).filter(x => x !== undefined)
        ).flat();
    return result;
}

describe('Options rejection', function () {
    it.each(getCombination())('[A]ccepts combination %p', (x: string | undefined) => {
        expectViable(x!).toBeTruthy();
    })

    it.each([optionMaskConfig.pureUnaries])('[A]ccepts unary %p', (x: string) => {
        expectViable(x).toBeTruthy();
        
    })
    it.each(["-a", "-b", "-c", "-d", "-e", "-f", "-g", "-i"])('[R]ejects Unary %p', (x: string) => {
        expectViable(x).toBeFalsy();
    })

    it.skip.each(["-ajl", "-anp","-art"])('[R]ejects combination %p', (x: string) => {
        expectViable(x).toBeFalsy();
    })

    it.skip.each(["-gmc", "-gcm"])('[R]ejects ambiguous combinations %p', (x: string) => {
        expectViable(x).toBeFalsy();
    })
});

describe('Options rejection combined with version', function () {
    it.each([
        ...'abcdefghijklmnopqrstuwxyz'.split('').map(x => (`-V${x}`))])('[R]ejects [A]nything with [V]ersion %p', (x: string) => {
            expectViable(x).toBeFalsy();
        })
});