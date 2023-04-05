import {randomUUID} from 'crypto'
import { Database } from '../db.js';

const db = new Database();
const users = db.select('users')

export async function PostUsers(req, res) {

    const user = []
    for await (const chunk of req){
        user.push(chunk)
    }

    try {
        const newUser = JSON.parse(Buffer.concat(user).toString())
        newUser.id = randomUUID()
        //console.log(newUser)

        const existingUser = Array.isArray(users) && users.find(user => user.name === newUser.name);
        //console.log(existingUser)
        console.log(users)

        if (existingUser) {
            req.body = null
        } else {
            req.body = newUser;
        }
        
    } catch{
        req.body = null
    }
    // res.setHeader('content-type','application/json')
    
}