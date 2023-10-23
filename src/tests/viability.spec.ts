import { Command } from "commander";
import { getActivatedOptions } from "../CliOnTheFly/optionActivations";
import { Checker } from "../CliOnTheFly/optionCombinatorChecker";
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

describe('Options rejection', function () {
    it.each(["-gc", "-gfc", "-gm"])('[A]ccepts combination %p', (x: string) => {
        expectViable(x).toBeTruthy();
    })

    it.each(["-V", "-h"])('[A]ccepts combination %p', (x: string) => {
        expectViable(x).toBeTruthy();
    })
    it.each(["-g", "-r", "-c", "-f", "-m"])('[R]ejects Unary %p', (x: string) => {
        expectViable(x).toBeFalsy();
    })

    it.each(["-mc", "-fm"])('[R]ejects combination %p', (x: string) => {
        expectViable(x).toBeFalsy();
    })

    it.each(["-gmc", "-gcm"])('[R]ejects ambiguous combinations %p', (x: string) => {
        expectViable(x).toBeFalsy();
    })

    it.each([
        ..."hr".split('').map(x => (`-${x}c`)),
        ..."hf".split('').map(x => (`-${x}m`))
    ])('[R]ejects [M]odule or [C]omponent combination %p', (x: string) => {
        expectViable(x).toBeFalsy();
    })
});