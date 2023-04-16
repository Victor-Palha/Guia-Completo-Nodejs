import { knex } from "../database";
import { z } from "zod";
import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { env } from "../env";

export async function UsersRoutes(app: FastifyInstance){
    app.post('/', async (req, res) => {
        const createUserSchema = z.object({
            username: z.string(),
            password: z.string(),
        })
        const { username, password } = createUserSchema.parse(req.body)
        const passwordHash = await hash(password, 8)

        await knex('users').insert({
            id_user: randomUUID(),
            username,
            password: passwordHash,
        })

        return res.status(201).send({ message: 'User Created!' })
    })

    //Login

    app.post('/login', async (req, res) => {
        const LoginUserSchema = z.object({
            username: z.string(),
            password: z.string(),
        })
        // verify if user exists
        const {username, password} = LoginUserSchema.parse(req.body)
        const userExists = await knex('users').where('username', username).first()
        if(!userExists) {
            return res.status(401).send({ error: "Email/Password incorrect" })
        }
        // verify if password is correct
        const passwordMatch = await compare(password, userExists.password)
        if(!passwordMatch) {
            return res.status(401).send({ error: "Email/Password incorrect" })
        }
        // if its all okay, return a token
        const token = sign(
            { username: userExists.username },
            env.JWT_SECRET,
            {
                subject: userExists.id_user,
                expiresIn: '30d',
            }
        )
        return res.status(200).send( {
            id: userExists.id_user,
            name: userExists.username,
            token,
        } )
    })
}