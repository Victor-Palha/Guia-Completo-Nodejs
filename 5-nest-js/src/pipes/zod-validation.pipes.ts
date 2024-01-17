import { ZodError, ZodSchema } from "zod";
import { BadRequestException, PipeTransform } from "@nestjs/common";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema){}

    transform(value: any) {
        try{
            this.schema.parse(value)
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    message: "Invalid data provided.",
                    statusCode: 400,
                    errors: fromZodError(error)
                });
            }
            throw new BadRequestException("Invalid data provided.");
        }

        return value;
    }
}