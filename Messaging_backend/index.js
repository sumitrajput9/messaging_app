require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/Users/route');
const messageRoutes = require('./src/Message/route');
const sequelize = require('./src/Config/Dbconfig');
const cors = require('cors');
const app = express();
const port =process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
// Test database connection and sync models
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});