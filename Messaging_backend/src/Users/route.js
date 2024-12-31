const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUser, updateUser, deleteUser, getAllUsers } = require('./controller');
const authenticateToken = require('../MiddileWare/authenticate');

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// User logout
router.post('/logout', logoutUser);

// Get all users
router.get('/list',authenticateToken, getAllUsers);
// Get user by ID
router.get('/:id',authenticateToken, getUser);

// Update user by ID
router.put('/:id',authenticateToken, updateUser);

// Delete user by ID
router.delete('/:id',authenticateToken, deleteUser);

module.exports = router;