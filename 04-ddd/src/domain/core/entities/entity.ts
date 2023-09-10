import { UniqueEntityId } from "./unique-entity-id";

export class Entity<T>{
    private _id: UniqueEntityId;
    protected props: T

    get id(){
        return this._id;
    }

    protected constructor(props: T, id?:UniqueEntityId){
        this._id = id ?? new UniqueEntityId(id);
        this.props = props;
    }
}