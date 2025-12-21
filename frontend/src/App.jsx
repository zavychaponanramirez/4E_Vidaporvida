import { useEffect, useState } from 'react';
import { api } from './services/api'; 
import './styles/globals.css'; // Cambiado de App.css a globals.css

function App() {
  const [backendStatus, setBackendStatus] = useState('Probando conexión...');
  const [healthData, setHealthData] = useState(null);
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  useEffect(() => {
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

  // Componente de Sistema de Diseño
  const DesignSystemView = () => {
    const DesignSystem = require('./pages/DesignSystem').default;
    return <DesignSystem />;
  };

  // Si queremos ver el sistema de diseño
  if (showDesignSystem) {
    return <DesignSystemView />;
  }

  return (
    // 🎨 CON ESTILOS TAILWIND DEL SISTEMA DE DISEÑO
    <div className="min-h-screen bg-4e-light p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-4e-primary mb-2">
            <span className="text-4e-gold">4E</span> - Vida por Vida
          </h1>
          <p className="text-gray-600 text-lg">
            Sistema de Gestión de Discipulado
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Enseñar • Equipar • Empoderar • Establecer
          </p>
        </header>

        {/* Grid Principal */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Columna 1: Estado del Sistema */}
          <div className="md:col-span-2">
            <div className="card-4e-primary">
              <h2 className="text-2xl font-bold text-4e-dark mb-6">
                Estado del Sistema
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 mt-1"></div>
                  <div>
                    <p className="font-medium text-gray-800">Frontend</p>
                    <p className="text-gray-600 text-sm">React + Vite + Tailwind CSS</p>
                    <p className="text-green-600 text-sm">✅ Funcionando en puerto 5173</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`w-3 h-3 rounded-full mr-3 mt-1 ${backendStatus.includes('✅') ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-medium text-gray-800">Backend</p>
                    <p className="text-gray-600 text-sm">Node.js + Express + MongoDB</p>
                    <p className={backendStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                      {backendStatus}
                    </p>
                  </div>
                </div>

                {/* Datos del backend */}
                {healthData && (
                  <div className="mt-4 p-4 bg-4e-primary/5 rounded-lg border border-4e-primary/20">
                    <h3 className="font-medium text-4e-primary mb-2">Respuesta del Backend:</h3>
                    <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-40">
                      {JSON.stringify(healthData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna 2: Acciones Rápidas */}
          <div>
            <div className="card-4e-purple mb-6">
              <h3 className="text-lg font-bold text-4e-dark mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <button 
                  className="btn-4e-primary w-full justify-center"
                  onClick={() => setShowDesignSystem(true)}
                >
                  🎨 Ver Sistema de Diseño
                </button>
                
                <button className="btn-4e-secondary w-full justify-center">
                  🔐 Ir al Login
                </button>
                
                <button className="btn-4e-outline w-full justify-center">
                  📊 Ver Dashboard
                </button>
              </div>
            </div>

            {/* Estado de Componentes */}
            <div className="card-4e">
              <h3 className="text-lg font-bold text-4e-dark mb-4">
                Componentes Listos
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Sistema de Diseño', status: '✅', color: 'green' },
                  { name: 'Autenticación Backend', status: '✅', color: 'green' },
                  { name: 'Componentes UI', status: '🔄', color: 'blue' },
                  { name: 'Login Frontend', status: '⏳', color: 'yellow' },
                  { name: 'Dashboard', status: '⏳', color: 'yellow' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{item.name}</span>
                    <span className={`text-${item.color}-600 font-medium`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Backend URL:</span> http://localhost:5000
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Frontend URL:</span> http://localhost:5173
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <BadgeDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para mostrar badges
const BadgeDisplay = () => {
  const badges = [
    { label: 'Desarrollo', variant: 'primary' },
    { label: 'Equipo', variant: 'purple' },
    { label: 'v0.1.0', variant: 'gold' },
  ];
  
  return (
    <div className="flex gap-2">
      {badges.map((badge, index) => (
        <span 
          key={index}
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${badge.variant === 'primary' ? 'bg-4e-primary-light/20 text-4e-primary' : ''}
            ${badge.variant === 'purple' ? 'bg-4e-purple/20 text-4e-purple' : ''}
            ${badge.variant === 'gold' ? 'bg-4e-gold/20 text-amber-700' : ''}
          `}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
};

export default App;