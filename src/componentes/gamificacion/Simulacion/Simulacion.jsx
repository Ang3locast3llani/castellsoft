import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Store, Package, Bot, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import Counter from '../../ui/Counter/Counter';
import './Simulacion.css';

const CHANNELS = [
  { id: 'TikTok', label: 'TikTok / DMs', Icon: Smartphone },
  { id: 'Tienda', label: 'Tienda Física', Icon: Store },
  { id: 'MercadoLibre', label: 'Mercado Libre', Icon: Package },
];

const Simulacion = () => {
  const [activeModules, setActiveModules] = useState([]);
  const [isDragTarget, setIsDragTarget] = useState(false);
  const dropZoneRef = useRef(null);
  const totalModules = CHANNELS.length;

  // Simula la acción de conectar un módulo al agente (por click o por soltarlo encima)
  const handleConnect = (moduleName) => {
    setActiveModules((prev) => (prev.includes(moduleName) ? prev : [...prev, moduleName]));
  };

  const isPointOverDropZone = (point) => {
    if (!dropZoneRef.current || !point) return false;
    const rect = dropZoneRef.current.getBoundingClientRect();
    return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
  };

  const progress = (activeModules.length / totalModules) * 100;
  const isComplete = activeModules.length === totalModules;

  return (
    <section className="simulator-wrapper" id="simulador">
      <div className="simulator-header">
        <span className="badge-light">Lo que hacemos</span>
        <h2>Desarrollamos <span className="text-blue">Agentes de IA</span> a la medida</h2>
        <p>Automatizamos e integramos. <strong>Arrastra tus canales hasta el agente</strong> (o tócalos) para ver tus resultados proyectados.</p>
      </div>

      <div className="simulator-layout">

        {/* Panel Izquierdo: Canales para conectar */}
        <div className="channels-panel">
          {CHANNELS.map(({ id, label, Icon }) => {
            const connected = activeModules.includes(id);
            return (
              <motion.button
                key={id}
                type="button"
                className={`channel-btn ${connected ? 'connected' : ''}`}
                onClick={() => handleConnect(id)}
                drag={!connected}
                dragSnapToOrigin
                dragElastic={0.18}
                dragMomentum={false}
                whileDrag={{ scale: 1.08, boxShadow: '0 18px 34px rgba(37, 99, 235, 0.35)', zIndex: 5 }}
                onDrag={(_, info) => setIsDragTarget(isPointOverDropZone(info.point))}
                onDragEnd={(_, info) => {
                  setIsDragTarget(false);
                  if (isPointOverDropZone(info.point)) handleConnect(id);
                }}
                style={{ touchAction: connected ? 'auto' : 'none' }}
              >
                <Icon size={18} className="channel-icon" /> {label}
                {connected && <span className="channel-check">✓</span>}
              </motion.button>
            );
          })}
        </div>

        {/* Panel Central: El Agente Procesando (zona de "soltar") */}
        <div className="agent-processor">
          <div
            ref={dropZoneRef}
            className={`processor-ring ${isComplete ? 'success' : ''} ${isDragTarget ? 'drag-hover' : ''}`}
          >
             {isComplete ? <Sparkles size={34} /> : <Bot size={34} />}
          </div>
          <div className="progress-bar-container">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="status-text">
            {isComplete ? "¡Ecosistema Integrado!" : "Esperando conexiones..."}
          </p>
        </div>

        {/* Panel Derecho: Recompensa (Los stats del Mockup del cliente) */}
        <div className={`dashboard-reveal ${isComplete ? 'visible' : 'hidden'}`}>
          <h3>Tu Resumen de Gestión Proyectado</h3>

          <div className="stats-grid">
            <div className="stat-card">
              <h4>Ahorro de Tiempo</h4>
              <span className="stat-number">
                <Counter to={120} start={isComplete} suffix="h" />
              </span>
              <span className="stat-trend positive"><TrendingUp size={13} /> +30%</span>
            </div>

            <div className="stat-card">
              <h4>Satisfacción</h4>
              <span className="stat-number">
                <Counter to={96} start={isComplete} suffix="%" />
              </span>
              <span className="stat-trend positive"><TrendingUp size={13} /> +12%</span>
            </div>
          </div>

          <button className="btn-blue-solid mt-4">Implementar ahora <ArrowRight size={16} /></button>
        </div>

      </div>
    </section>
  );
};

export default Simulacion;
