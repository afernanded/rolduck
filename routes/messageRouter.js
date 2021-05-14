const router = require('express').Router()
const messageController = require('../controllers/messageController')
const auth = require('../middleware/auth')

router.post('/message', auth, messageController.createMessage)

router.get('/conversations', auth, messageController.getConversations)

router.get('/message/:id', auth, messageController.getMessage)

router.delete('/message/:id', auth, messageController.deleteMessages)




module.exports = router