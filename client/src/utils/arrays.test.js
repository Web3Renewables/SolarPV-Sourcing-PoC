import { removeDuplicates } from "./arrays_helper"

describe('remove duplicate function test', () => {

    it('can remove duplicates successfully', () => {
        const mockData = [
            {key: "test", name: "test name  1"},
            {key: "test2", name: "test name  3"},
            {key: "test3", name: "test name  4"},
            {key: "test4", name: "test name  5"},
            {key: "test4", name: "complete new"},
            {key: "test4", name: "sample two"},
            {key: "test5", name: "one"},
        ]

        const actual = removeDuplicates(mockData, "key")
        expect(actual).toStrictEqual([
            {key: "test", name: "test name  1"},
            {key: "test2", name: "test name  3"},
            {key: "test3", name: "test name  4"},
            {key: "test4", name: "test name  5"},
            {key: "test5", name: "one"},
        ])
    })

    it('can remove duplicates with undefined', () => {
        const mockData = [
            {key: "test", name: "test name  1"},
            {key: "test2", name: "test name  3"},
            {key: "test3", name: "test name  4"},
            {key: undefined, name: "test name  5"},
            {key: "test4", name: "complete new"},
            {key: "test4", name: "sample two"},
            {key: "test5", name: "one"},
            undefined
        ]

        const actual = removeDuplicates(mockData, "key")
        expect(actual).toStrictEqual([
            {key: "test", name: "test name  1"},
            {key: "test2", name: "test name  3"},
            {key: "test3", name: "test name  4"},
            {key: undefined, name: "test name  5"},
            {key: "test4", name: "complete new"},
            {key: "test5", name: "one"},
        ])
    })

    it('success when there are no duplicates', () => {
        const mockData = [
            {key: "test", name: "test name  1"},
            {key: "test1", name: "test name  3"},
            {key: "test2", name: "test name  4"},
            {key: "test3", name: "test name  5"},
            {key: "test4", name: "complete new"},
            {key: "test5", name: "sample two"},
            {key: "test6", name: "one"},
        ]

        const actual = removeDuplicates(mockData, "key")
        expect(actual).toStrictEqual([
            {key: "test", name: "test name  1"},
            {key: "test1", name: "test name  3"},
            {key: "test2", name: "test name  4"},
            {key: "test3", name: "test name  5"},
            {key: "test4", name: "complete new"},
            {key: "test5", name: "sample two"},
            {key: "test6", name: "one"},
        ])
    })

    it('can detect duplicates by name', () => {
        const mockData = [
            {key: "test", name: "test name 1"},
            {key: "test1", name: "test name 1"},
            {key: "test2", name: "test name 1"},
            {key: "test3", name: "test name 1"},
            {key: "test4", name: "complete new"},
            {key: "test5", name: "sample two"},
            {key: "test6", name: "one"},
        ]

        const actual = removeDuplicates(mockData, "name")
        expect(actual).toStrictEqual([
            {key: "test", name: "test name 1"},
            {key: "test4", name: "complete new"},
            {key: "test5", name: "sample two"},
            {key: "test6", name: "one"},
        ])
    })

})