const router = require('express').Router()
const auth = require("../middleware/auth")
const userController = require("../controllers/userController")



router.get('/Search', auth, userController.searchUser)

router.get('/user/:id', auth, userController.getUser)

module.exports = router