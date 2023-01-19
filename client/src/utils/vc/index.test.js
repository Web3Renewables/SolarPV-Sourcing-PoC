import { filterByClaimType } from "./index"

describe("vc helper functions behave as expected", () => {

    test("filter claims by two by claimType", () => {
        const requestor = [{claimType: "electrician", "id": 1}, {claimType: "installer", "id": 2}, {claimType: "contractor", "id": 3}, {claimType: "builder", "id": 4}, {claimType: "admin", "id": 5}]

        for (let i = 0; i < 20; i++) {
            // Randomly select 3 claims that will need to be published
            const published = [{claimType: "electrician", "id": 30}, {claimType: "installer", "id": 50}, {claimType: "contractor", "id": 27}, {claimType: "builder", "id": 60}, {claimType: "admin", "id": 909}]
            const first = Math.floor(Math.random() * requestor.length);
            const second = Math.floor(Math.random() * requestor.length);
            const third = Math.floor(Math.random() * requestor.length);

            // Remove those test claims from the published array
            const testList = published.filter((el) => {
                return (el.id !==  published[first].id && el.id !== published[second].id && el.id !== published[third].id)
            })

            // From the two arrays, determine which claims need to be published
            const needsPublishing = filterByClaimType(requestor, testList)

            expect(needsPublishing).toContain(requestor[first])
            expect(needsPublishing).toContain(requestor[second])
            expect(needsPublishing).toContain(requestor[third])

        }
    })

})
