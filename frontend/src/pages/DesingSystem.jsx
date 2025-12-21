//Página de prueba diseño


import React from 'react';
import { Button, Card, CardHeader, CardBody, Input, Badge } from '../components/common';

const DesignSystem = () => {
  return (
    <div className="min-h-screen bg-4e-light p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-4e-primary">4E - Sistema de Diseño</h1>
          <p className="text-gray-600 mt-2">Componentes reutilizables para Vida por Vida</p>
        </header>

        {/* Sección: Botones */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-4e-dark">Botones</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primario</Button>
              <Button variant="secondary">Secundario</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>Deshabilitado</Button>
              <Button variant="primary" size="large">Grande</Button>
              <Button variant="primary" size="small">Pequeño</Button>
              <Button variant="primary" fullWidth>Ancho Completo</Button>
            </div>
          </Card>
        </section>

        {/* Sección: Tarjetas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-4e-dark">Tarjetas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="primary">
              <CardHeader>
                <h3 className="text-lg font-bold">Líder de Grupo</h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600">Juan Pérez - Grupo: Jóvenes</p>
                <p className="text-gray-600">Horario: Domingos 18:00</p>
              </CardBody>
            </Card>
            
            <Card variant="purple">
              <CardHeader>
                <h3 className="text-lg font-bold">Evento Especial</h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600">Retiro de Evangelismo</p>
                <p className="text-gray-600">15-17 Noviembre 2024</p>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Sección: Formularios */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-4e-dark">Formularios</h2>
          <Card className="p-6 max-w-md">
            <form className="space-y-4">
              <Input 
                label="Nombre completo"
                placeholder="Ej: María González"
              />
              <Input 
                label="Email"
                type="email"
                placeholder="usuario@iglesia.com"
              />
              <Input 
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                error="La contraseña debe tener al menos 8 caracteres"
              />
              <Button variant="primary" fullWidth>Enviar</Button>
            </form>
          </Card>
        </section>

        {/* Sección: Badges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-4e-dark">Badges (Estados)</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">Nuevo Discípulo</Badge>
              <Badge variant="success">Establecido</Badge>
              <Badge variant="warning">Reconectado</Badge>
              <Badge variant="danger">Inactivo</Badge>
              <Badge variant="info">En Proceso</Badge>
              <Badge variant="gray">En Espera</Badge>
            </div>
          </Card>
        </section>

        {/* Sección: Paleta de Colores */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-4e-dark">Paleta de Colores 4E</h2>
          <Card className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'primary', hex: '#1e40af', desc: 'Principal' },
                { name: 'primary-light', hex: '#3b82f6', desc: 'Azul medio' },
                { name: 'primary-lighter', hex: '#60a5fa', desc: 'Azul claro' },
                { name: 'gold', hex: '#d4af37', desc: 'Dorado' },
                { name: 'purple', hex: '#7c3aed', desc: 'Púrpura' },
                { name: 'green', hex: '#10b981', desc: 'Verde' },
                { name: 'dark', hex: '#1f2937', desc: 'Texto' },
                { name: 'gray', hex: '#6b7280', desc: 'Secundario' },
              ].map((color) => (
                <div key={color.name} className="text-center">
                  <div 
                    className="h-20 w-full rounded-lg mb-2 border border-gray-200"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <p className="font-medium">4e-{color.name}</p>
                  <p className="text-sm text-gray-500">{color.hex}</p>
                  <p className="text-xs text-gray-400">{color.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default DesignSystem;