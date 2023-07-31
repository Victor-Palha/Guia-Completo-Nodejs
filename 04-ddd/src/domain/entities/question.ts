import { randomUUID } from "node:crypto";

export class Question {

    constructor(
        public title: string, 
        public content: string, 
        public id?:string
    ){
        this.id = id ?? randomUUID();
        this.content = content;
        this.title = title;
    }
}