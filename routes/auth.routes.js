const Router = require('express')
const router = new Router()
const authController = require('../controller/auth.controller')
const { check } = require("express-validator")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

router.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль не менее 6 символов и не более 16').isLength({ min: 6, max: 16 })
], authController.registration)
router.post('/login', authController.login)
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)
router.post('/createuser', authController.createUser)

module.exports = router