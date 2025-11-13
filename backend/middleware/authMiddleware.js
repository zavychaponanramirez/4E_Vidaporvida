const jwt = require('jsonwebtoken');
const User = require('../models/User');

/* Verifica las credenciales
    Identifica quién hace la petición
    Controla acceso a rutas pivadas
    Previene acceso no autorizado
*/

const protect = async (req, res, next) => {
  try {
    let token;

    // Verificar si el token viene en el header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No se proporcionó token, acceso denegado'
      });
    }

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Verificar si el usuario aún existe
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no existe, token inválido'
        });
      }

      // Agregar usuario al request
      req.userId = decoded.userId;
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token no válido'
      });
    }
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor en autenticación'
    });
  }
};

// Middleware para verificar roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Acceso denegado - usuario no autenticado'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Acceso denegado - rol ${req.user.role} no autorizado`
      });
    }

    next();
  };
};

module.exports = { protect, authorize };