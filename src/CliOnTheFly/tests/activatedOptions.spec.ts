import { Command } from "commander";
import { getActivatedOptions } from "../optionActivations";
const { programConfig } = require("../setup");

const program: Command = programConfig(new Command());
describe("options", () => {
    it.each([
        [
            ["--version","--ff","--gg","-c","Test"],
            ["version","ff","gg","cc"]
        ],
        [
            ["--cc","Test","-V","--ff","--gg"],
            ["version","ff","gg","cc"]
        ],
        [
            ["--cc","Test","-V","-f","-g"],
            ["version","ff","gg","cc"]
        ]
    ])("test", (argvs: string[],expected) => {
        process.argv.length = 2;
        process.argv = [...process.argv, ...argvs];
        const active = getActivatedOptions(program.options);

        expect(Object.keys(active).sort()).toStrictEqual(expected.sort())
    })
});