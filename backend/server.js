const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar modelos (agregar estas líneas)
const User = require('./models/User');
const Disciple = require('./models/Disciple');

const app = express();

// Middlewares
app.use(cors({
   origin: ['http://localhost:5173', 'http://192.168.1.8:5173'],
  credentials: true
}));
app.use(express.json());

// Conexión a MongoDB CON MEJOR DIAGNÓSTICO
console.log('🔗 Intentando conectar a MongoDB...');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/iglesia-4e', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
})
.then(() => {
  console.log('✅ Conectado a MongoDB Atlas!');
  console.log('📊 Base de datos:', mongoose.connection.name);
  console.log('🏠 Host:', mongoose.connection.host);
})
.catch(err => {
  console.log('❌ ERROR conectando a MongoDB:');
  console.log('   - Mensaje:', err.message);
  console.log('   - Código:', err.code);
  
  // Diagnóstico específico para tu caso
  if (err.message.includes('auth') || err.message.includes('authentication')) {
    console.log('🔐 PROBLEMA: Error de autenticación');
    console.log('💡 SOLUCIÓN: Verifica:');
    console.log('   1. Password en MONGODB_URI es correcta');
    console.log('   2. Carácter "!" debe ser "%21" en la URL');
    console.log('   3. Usuario tiene permisos en MongoDB Atlas');
  }
});

// Ruta de prueba MEJORADA
app.get('/api/health', async (req, res) => {
  try {
    // Contar documentos en cada colección para verificar modelos
    const usersCount = await User.countDocuments();
    const disciplesCount = await Disciple.countDocuments();
    
    res.json({ 
      message: '🚀 Backend 4E funcionando!', 
      timestamp: new Date(),
      database: {
        status: 'Connected',
        name: mongoose.connection.name,
        collections: {
          users: usersCount,
          disciples: disciplesCount
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error verificando base de datos',
      error: error.message
    });
  }
});

// NUEVA RUTA: Crear usuario de prueba (eliminar después)
app.post('/api/test-user', async (req, res) => {
  try {
    const testUser = new User({
      name: 'Líder de Prueba',
      email: 'leader@test.com',
      password: 'password123',
      role: 'leader',
      groupLife: {
        name: 'Grupo Vida Prueba',
        schedule: 'Lunes 19:00',
        gender: 'mixed'
      }
    });
    
    await testUser.save();
    res.json({ message: 'Usuario de prueba creado', user: testUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta adicional para diagnóstico (OPCIONAL)
app.get('/api/debug-env', (req, res) => {
  // Mostrar info segura (sin password completa)
  const safeMongoURI = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@')
    : 'No configurada';
    
  res.json({
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongodb_uri: safeMongoURI,
    database_connected: mongoose.connection.readyState === 1
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Servidor backend corriendo en puerto ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});