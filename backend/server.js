const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Ruta de prueba SIN MongoDB por ahora
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '🚀 Backend 4E funcionando!', 
    timestamp: new Date(),
    status: 'OK'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎯 Servidor backend corriendo en puerto ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});