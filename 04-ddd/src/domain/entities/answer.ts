import { randomUUID } from "crypto";

export class Answer {

    constructor(
        public content: string, 
        public id?: string
    ){
        this.id = id ?? randomUUID();
        this.content = content;
    }
}