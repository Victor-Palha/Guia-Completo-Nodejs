export async function PostUsers(req, res, users) {
    const user = []
    for await (const chunk of req){
        user.push(chunk)
    }
    try {
        req.body = JSON.parse(Buffer.concat(user).toString())
        users.map((users)=>{
            if(users.name === req.body.name){
                req.body = null
            }
        })
    } catch{
        req.body = null
    }
    res.setHeader('content-type','application/json')
    
}