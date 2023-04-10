export async function updateTask(req, res){

    let newTask = []
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
        task.updated_at = new Date()

        req.body = task;

    } catch{
        req.body = null
    }


}