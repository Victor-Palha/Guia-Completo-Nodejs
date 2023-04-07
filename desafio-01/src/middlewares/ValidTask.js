import {randomUUID} from 'crypto'
export async function ValidTask(req, res, db) {

    const tasks = db.select('tasks')


    const newTask = []
    for await (const chunk of req){
        newTask.push(chunk)
    }
    const {title, description} = JSON.parse(Buffer.concat(newTask).toString())
    if(!title || !description){
        req.body = null
        return
    }
    try {
        const task = JSON.parse(Buffer.concat(newTask).toString())
        task.id = randomUUID()
        task.created_at = new Date()
        task.updated_at = null
        task.completed_at = null

        const existingTask = Array.isArray(tasks) && tasks.find(item => item.title === task.title);

        if (existingTask) {
            
            req.body = null
        } else {
            req.body = task;
        }
        
    } catch{
        req.body = null
    }
    
}