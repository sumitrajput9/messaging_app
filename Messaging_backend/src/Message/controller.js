const sequelize = require('sequelize');
const Message = require('../model/messageModel');
const User = require('../model/userModel');

// Send a message
const sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const senderId = req.body.user.id;
        
        

        // Check if receiver exists
        const receiver = await User.findByPk(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }

        const message = await Message.create({ senderId, receiverId, content });
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get messages for a user
const getMessages = async (req, res) => {
    try {
      const { senderId, receiverId } = req.query;
      const messages = await Message.findAll({
        where: {
          [sequelize.Op.or]: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId }
          ]
        },
        order: [['createdAt', 'ASC']]
      });
      res.json(messages);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = { sendMessage, getMessages };