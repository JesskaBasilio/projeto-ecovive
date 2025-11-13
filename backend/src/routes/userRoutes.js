const router = require('express').Router()
const { getUserById } = require('../controllers/userController')
const { checkToken } = require('../middlewares/checkToken')

router.get('/:id', checkToken, getUserById)

module.exports = router