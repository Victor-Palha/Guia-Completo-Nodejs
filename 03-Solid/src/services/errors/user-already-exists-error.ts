export class userAlreadyExistsError extends Error {
    constructor(){
        super("User already exists")
    }
}