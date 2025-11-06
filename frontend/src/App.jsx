import { useEffect, useState } from 'react';
import { api } from './services/api'; 
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('Probando conexión...');
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    // Probar conexión con el backend de Zavy
    api.get('/health')
      .then(response => {
        setBackendStatus('✅ CONECTADO AL BACKEND');
        setHealthData(response.data);
        console.log('🎉 Backend response:', response.data);
      })
      .catch(error => {
        setBackendStatus('❌ ERROR: No se puede conectar al backend');
        console.error('💥 Error:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>4E - Vida por Vida</h1>
      
      <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Estado del Sistema:</h2>
        <p><strong>Frontend:</strong> ✅ Funcionando (puerto 5173)</p>
        <p><strong>Backend:</strong> {backendStatus}</p>
        
        {healthData && (
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f0f8ff' }}>
            <h3>Datos del Backend:</h3>
            <pre>{JSON.stringify(healthData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;