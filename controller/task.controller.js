const db = require('../db')

class TaskController {
    async createTask(req, res) {
        try {
            const { title, date_start, deadline, executor } = req.body
            const newTask = await db.query(`INSERT INTO tasks (title, date_start, deadline, executor) values ($1, $2, $3, $4) RETURNING *`,
                [title, date_start, deadline, executor]
            )
            res.json(newTask.rows[0])
        }
        catch {
            console.error(err.message)
        }
    }
    async getTaskByUser(req, res) {
        const id = req.query.id
        const tasks = await db.query(`SELECT * FROM tasks where executor = $1`, [id])
        res.json(tasks.rows)
    }
    async getTasks(req, res) {
        const tasks = await db.query('SELECT * FROM tasks')
        res.json(tasks.rows)
    }
    async deleteTask(req, res) {
        const id = req.params.id
        const task = await db.query('DELETE FROM tasks where id = $1', [id])
        res.json(task.rows[0])
    }
}

module.exports = new TaskController()