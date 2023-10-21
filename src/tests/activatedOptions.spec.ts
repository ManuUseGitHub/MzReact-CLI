import { Command } from "commander";
import { getActivatedOptions } from "../optionActivations";
const { programConfig } = require("../setup");

const program: Command = programConfig(new Command());
describe("options", () => {
    it.each([
        [
            ["--version","--force","--generate","-c","Test"],
            ["version","force","generate","component"]
        ],
        [
            ["--component","Test","-V","--force","--generate"],
            ["version","force","generate","component"]
        ],
        [
            ["--component","Test","-V","-f","-g"],
            ["version","force","generate","component"]
        ]
    ])("test", (argvs: string[],expected) => {
        process.argv.length = 2;
        process.argv = [...process.argv, ...argvs];
        const active = getActivatedOptions(program.options);

        expect(Object.keys(active).sort()).toStrictEqual(expected.sort())
    })
});