const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Registrar nuevo usuario
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login  
// @desc    Login de usuario
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Obtener datos del usuario actual
// @access  Private (requiere token)
router.get('/me', protect, getMe);

module.exports = router;