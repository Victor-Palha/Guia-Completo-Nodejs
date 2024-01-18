import { PrismaClient } from "@prisma/client"
import { execSync } from "child_process"
import { randomUUID } from "node:crypto"
import "dotenv/config"

const prisma = new PrismaClient()
if(!process.env.DATABASE_URL){
    throw new Error("DATABASE_URL is not set. Please set it in .env file")
}

function generateUniqueDatabaseToTest(schemaId: string){
    const url = new URL(process.env.DATABASE_URL as string)
    url.searchParams.set("schema", schemaId)

    return url.toString()
}

const schemaId = randomUUID()

beforeAll(async ()=>{
    const db_url = generateUniqueDatabaseToTest(schemaId)
    process.env.DATABASE_URL = db_url

    execSync(`npx prisma migrate deploy`)
})

afterAll(async ()=>{
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    await prisma.$disconnect()
})