const express = require('express');
const router = express.Router();
const authenticateToken = require('../MiddileWare/authenticate');
const { sendMessage, getMessages } = require('./controller');

// Send a message
router.post('/send', authenticateToken,sendMessage);

// Get messages for a user
router.get('/inbox',authenticateToken, getMessages);

module.exports = router;