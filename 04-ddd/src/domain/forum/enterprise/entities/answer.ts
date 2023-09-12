import { Optional } from "../../../../@types/optional";
import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";

interface AnswerProps{
    authorID: UniqueEntityId, 
    questionID: UniqueEntityId,
    content: string, 
    createdAt: Date,
    updatedAt?: Date,
}
export class Answer extends Entity<AnswerProps>{

    get content(){
        return this.props.content;
    }

    get authorID(){
        return this.props.authorID;
    }
    get questionID(){
        return this.props.questionID;
    }
    get createdAt(){
        return this.props.createdAt;
    }
    get updatedAt(){
        return this.props.updatedAt;
    }
    get excerpt(){
        return this.content.substring(0, 120).trim().concat("...")
    }
    set content(content: string){
        this.props.content = content
        this.touch()
    }
    private touch(){
        this.props.updatedAt = new Date()
    }

    static create(
        props: Optional<AnswerProps, 'createdAt'>,
        id?: UniqueEntityId
    ){
        const answer = new Answer({
            ...props,
            createdAt: new Date(),
        }, id)

        return answer
    }
}