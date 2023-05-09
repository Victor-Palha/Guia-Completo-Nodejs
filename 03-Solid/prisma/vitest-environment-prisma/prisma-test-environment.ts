import {Environment} from "vitest"

export default <Environment>{
    name: "prisma",
    async setup() {
        // setup prisma
        console.log("Start")

        return {
            async teardown(){
                // teardown prisma
                console.log("Finish")
            }
        }
    },
}