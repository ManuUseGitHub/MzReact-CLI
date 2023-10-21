import * as files from "../utils/files";

describe("files", () => {
    it.each([
        ["..mzr.md",".mzr.md"],
        ["/.mzr.md","/.mzr.md"],
        ["/////////.mzr.md","/.mzr.md"],
    ])("test %p", (path: string|boolean, expected:string) => {
        const rooted = files.rootifyFilePath(path);
        expect(rooted).toBe(expected);
    })
})