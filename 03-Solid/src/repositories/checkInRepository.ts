import { Prisma, CheckIn } from "@prisma/client"

export interface CheckInsRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(user_id: string, page: number): Promise<CheckIn[]>
    countByUserId(user_id: string): Promise<number>
    findById(checkIn_id: string): Promise<CheckIn | null>
    save(checkIn: CheckIn): Promise<CheckIn>
}