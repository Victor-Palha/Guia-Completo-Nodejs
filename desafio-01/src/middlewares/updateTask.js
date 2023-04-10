export async function updateTask(req, res){

    let newTask = []
    for await (const chunk of req){
        newTask.push(chunk)
    }
    console.log(newTask.length)
    const {title, description} = newTask.length !== 0 ? JSON.parse(Buffer.concat(newTask).toString()) : {title: undefined, description: undefined}

    console.log(title, description)
    if(title === undefined && description === undefined ){
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