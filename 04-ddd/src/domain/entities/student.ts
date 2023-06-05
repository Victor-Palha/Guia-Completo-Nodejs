import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface StudantProps {
    name: string
}

export class Student extends Entity<StudantProps> {
    static create(props: StudantProps, id?: UniqueEntityID){
        const studant = new Student({
            ...props
        }, id)

        return studant
    }
}