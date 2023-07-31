import { randomUUID } from "node:crypto";

export class Student {
    constructor(
        public name:string, 
        public id?:string
    ){
        this.id = id ?? randomUUID();
        this.name = name;
    }
}