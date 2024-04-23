import fs from "fs"
import {pathArgsAsList,getTransformed,createComponent} from "../cmdsComponents"


describe("rex", () => {
    it.each([
        ["/path/pressets","/path/pressets"], //carbon copy

        ["/path/=>src/tests/pressets2","/path/"],
        ["/path/=>whatever","/path/whatever"],
        ["/path/=>../whatever","/path/../whatever"],
    ])("test %p", async (path: string, expected:string) => {
        await fs.writeFile("./src/tests/pressets2","pressets",()=> {})
        const found = pathArgsAsList(path)[0]
        expect(found).toBe(expected);
    })
})

describe("rex", () => {
    it.each([
        ["/path/to/file=>comp1,comp2,comp3",3],
        ["/path/to/file=>(..componnent),comp2,comp3",3],
    ])("test %p", (path: string, expected:number) => {
        const found = pathArgsAsList(path).length
        expect(found).toBe(expected);
    })
})

describe("rex", () => {
    it.each([
        ["x,y,z", "x,y,z"],
    ])("test %p", (description: string, expected:string) => {
        const basePath = "./src/tests/"
        expect(getTransformed(basePath,"TEST_PURPOSE/"+description)).toBe(expected);
    })
})

describe("rex", () => {
    it.each([
        ["javaScript:Documentation", "javaScript:Documentation"],
        ["kotlin-Course-j-course", "kotlinCourseJCourse"],
        ["_lib", "lib"],
        ["other/nested/c", "c"],
        ["[productID]", "product"],
        ["[[...resources]]", "resources"],
        ["[...slug]", "slug"],
        ["(...)watch", "watch"],
        ["(.)yota", "yota"],
        ["(..)zeta", "zeta"],
    ])("test %p", (description: string, expected:string) => {
        const basePath = "/path/to/file"
        expect(getTransformed(basePath,description)).toBe(expected);
    })
})

describe("test",() => {test('adds 1 + 2 to equal 3',()=>{
        const pathArg = "/path/to/file/=>src/tests/pressets,test"
        const list = pathArgsAsList(pathArg);
        expect(list.length).toBe(5);
})})