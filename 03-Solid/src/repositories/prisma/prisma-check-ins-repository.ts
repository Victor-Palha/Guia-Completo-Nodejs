import { Prisma, CheckIn } from "@prisma/client"
import { CheckInsRepository } from "../checkInRepository"
import { prisma } from "@/lib/prisma"
import dayjs from "dayjs"


export class PrismaCheckInsRepository implements CheckInsRepository{

    async create(data: Prisma.CheckInUncheckedCreateInput){
        const checkIn = await prisma.checkIn.create({
            data
        })
        return checkIn
    }
    async findByUserIdOnDate(user_id: string, date: Date){
        //dates
        const startOfDay = dayjs(date).startOf("day").toDate()
        const endOfDay = dayjs(date).endOf("day").toDate()

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id,
                created_at: {
                    gte: new Date(startOfDay),
                    lte: new Date(endOfDay)
                }
            }
        })

        return checkIn
    }
    async findManyByUserId(user_id: string, page: number){
        const checkIns = await prisma.checkIn.findMany({
            where:{
                user_id
            },
            take: 20, skip: (page - 1) * 20
        })

        return checkIns
    }
    async countByUserId(user_id: string){
        const checkIn = await prisma.checkIn.count({
            where:{
                user_id
            }
        })

        return checkIn
    }
    async findById(checkIn_id: string){
        const checkIn = await prisma.checkIn.findUnique({
            where:{
                id: checkIn_id
            }
        })

        return checkIn
    }
    async save(checkIn: CheckIn){
        const checkInSaved = await prisma.checkIn.update({
            where:{
                id: checkIn.id
            }, 
            data: checkIn
        })

        return checkInSaved
    }

}