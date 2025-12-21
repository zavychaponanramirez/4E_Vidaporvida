const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


//...........................................
// CONVERTIR URI DE MONGODB+SRV A MONGODB://
if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('mongodb+srv://')) {
  console.log('🔧 Convirtiendo mongodb+srv:// a conexión estándar...');
  
  // Extraer partes de la URI
  const uri = process.env.MONGODB_URI;
  const match = uri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^\/]+)\/([^?]+)(\?.+)?/);
  
  if (match) {
    const [_, username, password, host, database, query] = match;
    
    // Crear URI estándar con puertos explícitos
    const standardURI = `mongodb://${username}:${password}@${host}:27017/${database}${query || ''}`;
    
    console.log('📡 URI convertida:', standardURI.replace(/:([^:]+)@/, ':****@'));
    process.env.MONGODB_URI = standardURI;
  }
}


///////.............................................

// Importar modelos
const User = require('./models/User');
const Disciple = require('./models/Disciple');

// 🔧 SOLUCIÓN DNS PARA WINDOWS
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const app = express();

// Middlewares - CORS permisivo para desarrollo
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// 📍 RUTAS DE AUTENTICACIÓN
app.use('/api/auth', require('./routes/auth')); // ← CORREGIDO

// CONEXIÓN MONGODB
console.log('🔗 Conectando a MongoDB Atlas...');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
})
.then(() => {
  console.log('✅ Conectado a MongoDB Atlas!');
  console.log('📊 Base de datos:', mongoose.connection.name);
  console.log('🏠 Host:', mongoose.connection.host);
})
.catch(err => {
  console.log('❌ Error MongoDB:');
  console.log('   - Mensaje:', err.message);
  console.log('   - Código:', err.code);
  
  if (err.message.includes('auth') || err.message.includes('authentication')) {
    console.log('🔐 PROBLEMA: Error de autenticación');
    console.log('💡 SOLUCIÓN: Verifica:');
    console.log('   1. Password en MONGODB_URI es correcta');
    console.log('   2. Carácter "!" debe ser "%21" en la URL');
    console.log('   3. Usuario tiene permisos en MongoDB Atlas');
  }
});  // ← CIERRE CORRECTO

// Ruta de salud simplificada
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({ 
    message: '🚀 Backend 4E funcionando!', 
    timestamp: new Date(),
    server: 'Express.js',
    port: process.env.PORT,
    database: {
      status: statusMap[dbStatus],
      readyState: dbStatus,
      name: mongoose.connection.name || 'connecting...'
    }
  });
});

// Ruta de ping (sin MongoDB)
app.get('/api/ping', (req, res) => {
  res.json({
    message: '✅ Backend funcionando',
    timestamp: new Date(),
    server: 'Express.js 4E',
    status: 'OK'
  });
});

// Ruta de prueba para crear usuario
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

// Ruta para diagnóstico
app.get('/api/debug-env', (req, res) => {
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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Servidor backend en puerto ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`📡 Ping: http://localhost:${PORT}/api/ping`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`🐞 Debug: http://localhost:${PORT}/api/debug-env`);
});