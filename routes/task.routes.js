const Router = require('express')
const router = new Router()
const taskController = require('../controller/task.controller')

router.post('/task', taskController.createTask)
router.get('/task/:id', taskController.getTaskByUser)
router.get('/tasks', taskController.getTasks)
router.delete('/task/:id', taskController.deleteTask)

module.exports = router