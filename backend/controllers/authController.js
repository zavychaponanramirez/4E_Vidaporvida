const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Registrar usuario
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, groupLife } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, email y contraseña son requeridos'
      });
    }

    // Verificar si usuario existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password, // Se hashea automáticamente por el modelo
      role: role || 'leader',
      phone,
      groupLife
    });

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        groupLife: user.groupLife
      },
      token: generateToken(user._id)
    });

  } catch (error) {
    console.error('Error en registro:', error);
    
    // Manejar error de duplicado de email
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

// @desc    Login usuario
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Verificar usuario y password
    const user = await User.findOne({ email });
    
    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        message: 'Login exitoso',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          groupLife: user.groupLife
        },
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

// @desc    Obtener usuario actual
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        groupLife: user.groupLife
      }
    });
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};