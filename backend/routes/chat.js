const express = require('express');

const chatController = require('../controller/chat');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/message',authMiddleware.authenticate, chatController.chatPost);

module.exports = router;