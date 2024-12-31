const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, role, password } = req.body;
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, phoneNumber, role, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, 'sumit', { expiresIn: '1h' });
            user.status = true; // Set status to online
            await user.save();
            res.json({ user, token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Logout a user
const logoutUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.body.id);
        if (user) {
            user.status = false; // Set status to offline
            await user.save();
            res.status(200).json({ message: 'User logged out successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user by ID
const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// getAllusers
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, role } = req.body;
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.name = name;
            user.email = email;
            user.phoneNumber = phoneNumber;
            user.role = role;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser, getUser, updateUser, deleteUser,getAllUsers };