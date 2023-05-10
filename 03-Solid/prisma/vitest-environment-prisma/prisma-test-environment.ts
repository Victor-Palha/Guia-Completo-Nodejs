import { PrismaClient } from "@prisma/client"
import "dotenv/config"
import { execSync } from "node:child_process"
import { randomUUID } from "node:crypto"
import {Environment} from "vitest"

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string){
    if(!process.env.DATABASE_URL){
        throw new Error("DATABASE_URL is not set")
    }
    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set("schema", schema)

    return url.toString()
}

export default <Environment>{
    name: "prisma",
    async setup() {
        // setup prisma
        const schema = randomUUID()

        const databaseUrl = generateDatabaseURL(schema)

        process.env.DATABASE_URL = databaseUrl

        execSync("npx prisma migrate deploy")

        return {
            async teardown(){
                // teardown prisma
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
            }
        }
    },
}