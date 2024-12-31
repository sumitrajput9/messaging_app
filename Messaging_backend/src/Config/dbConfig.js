const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.dbname, process.env.dbuser, process.env.dbpassword, {
    host: process.env.dbhost,
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;