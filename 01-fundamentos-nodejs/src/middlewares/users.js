import {randomUUID} from 'crypto'

export async function PostUsers(req, res, db) {

    const users = db.select('users')

    const user = []
    for await (const chunk of req){
        user.push(chunk)
    }

    try {
        const newUser = JSON.parse(Buffer.concat(user).toString())
        newUser.id = randomUUID()

        const existingUser = Array.isArray(users) && users.find(user => user.name === newUser.name);

        if (existingUser) {
            req.body = null
        } else {
            req.body = newUser;
        }
        
    } catch{
        req.body = null
    }
    
}