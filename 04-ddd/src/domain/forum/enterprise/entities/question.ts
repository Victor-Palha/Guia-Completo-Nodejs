import { Slug } from "./value-objects/slug";
import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../../@types/optional";
import dayjs from "dayjs";

interface QuestionProps{
    bestAnswerID?: UniqueEntityId,
    authorID: UniqueEntityId, 
    title: string, 
    content: string, 
    slug: Slug,
    createdAt: Date,
    updatedAt?: Date,
}

export class Question extends Entity<QuestionProps>{
    get bestAnswerID(){
        return this.props.bestAnswerID;
    }
    get authorID(){
        return this.props.authorID;
    }
    get title(){
        return this.props.title;
    }
    get content(){
        return this.props.content;
    }
    get slug(){
        return this.props.slug;
    }
    get createdAt(){
        return this.props.createdAt;
    }
    get updatedAt(){
        return this.props.updatedAt;
    }
    get isNew():boolean{
        return dayjs().diff(this.createdAt, 'days') <= 3
    }
    get excerpt(){
        return this.content.substring(0, 120).trim().concat("...")
    }
    set content(content: string){
        this.props.content = content
        this.touch()
    }
    set title(title: string){
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
    }

    set bestAnswerID(id: UniqueEntityId | undefined){
        this.props.bestAnswerID = id
        this.touch()
    }
    private touch(){
        this.props.updatedAt = new Date()
    }

    static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: UniqueEntityId){
        const question = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            createdAt: new Date(),
        }, id)

        return question
    }
}