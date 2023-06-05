import { Slug } from "./value-objects/slug"
import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import dayjs from "dayjs"

interface QuestionProps {
    authorId: UniqueEntityID
    bestAnswerId?: UniqueEntityID
    title: string
    content: string
    slug: Slug
    createdAt: Date
    updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {

    get authorId(){
        return this.props.authorId
    }

    get bestAnswerId(){
        return this.props.bestAnswerId
    }

    get title(){
        return this.props.title
    }

    get content(){
        return this.props.content
    }

    get slug(){
        return this.props.slug
    }

    get createdAt(){
        return this.props.createdAt
    }

    get updatedAt(){
        return this.props.updatedAt
    }

    get isNew():boolean {
        return dayjs().diff(this.props.createdAt, "day") <= 3
    }

    get excerpt(){
        return this.props.content.substring(0, 120).trimEnd().concat("...")
    }

    set title(title:string){
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
    }

    set content(content:string){
        this.props.content = content
        this.touch()
    }

    set bestAnswerId(id: UniqueEntityID | undefined){
        this.props.bestAnswerId = id
        this.touch()
    }

    private touch(){
        this.props.updatedAt = new Date()
    }

    static create(props: Optional<QuestionProps, "createdAt" | "slug">, id?: UniqueEntityID){
        const question = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            createdAt: new Date(),
        }, id)

        return question
    }
}