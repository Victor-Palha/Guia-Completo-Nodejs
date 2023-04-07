export async function updateTask(req, res, db){
    const tasks = db.select('tasks')

    let newTask = []
    for await (const chunk of req){
        newTask.push(chunk)
    }

    try {
        const task = JSON.parse(Buffer.concat(newTask).toString())
        task.updated_at = new Date()

        req.body = task;

    } catch{
        req.body = null
    }


}