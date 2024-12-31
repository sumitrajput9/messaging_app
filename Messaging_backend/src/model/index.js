const Sequelize = require('sequelize');
const sequelize = require('../Config/Dbconfig');

const User = require('./userModel')(sequelize, Sequelize);
const Message = require('./messageModel')(sequelize, Sequelize);

sequelize.sync();

module.exports = {
    User,
    Message,
    sequelize,
};