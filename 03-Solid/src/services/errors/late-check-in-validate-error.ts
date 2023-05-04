export class LateCheckInValidateError extends Error{
    constructor(){
        super("You can't validate a check-in after 20 minutes")
    }
}