import React from 'react';
import { motion } from 'framer-motion';
import { Bot, BarChart3, MessageCircle, Database, TrendingUp, Plug } from 'lucide-react';
import './HeroEcosystem.css';

const NODES = [
  { slot: 'slot-1', float: 'float-a', Icon: BarChart3, label: 'ERP / CRM' },
  { slot: 'slot-2', float: 'float-b', Icon: MessageCircle, label: 'WhatsApp / Email' },
  { slot: 'slot-3', float: 'float-c', Icon: Database, label: 'Bases de Datos' },
  { slot: 'slot-4', float: 'float-d', Icon: TrendingUp, label: 'Reportes' },
  { slot: 'slot-5', float: 'float-a', Icon: Plug, label: 'API' },
];

// Los nodos "llegan" a su lugar uno por uno cuando el Hero aparece,
// en vez de estar ya flotando desde el primer frame.
const nodesContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};

const nodeArrive = {
  hidden: { opacity: 0, y: 26, scale: 0.6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

const HeroEcosystem = () => {
  return (
    <section className="hero-dark" id="soluciones">
      <div className="hero-grid">

        {/* Columna Izquierda: Textos y CTAs (Fiel al mockup del cliente) */}
        <div className="hero-copy">
          <span className="badge-blue">Desarrollos a la medida</span>
          <h1 className="hero-title-dark">
            Agentes de IA <br />
            <span className="text-highlight">que impulsan tu negocio</span>
          </h1>
          <p className="hero-desc-dark">
            Creamos soluciones inteligentes y automatizaciones que transforman procesos, aumentan la productividad y generan resultados reales para tu empresa.
          </p>

          <ul className="hero-checklist">
            <li>✓ Desarrollos 100% a la medida</li>
            <li>✓ Integración con tus sistemas actuales</li>
            <li>✓ Tecnología que se adapta a ti</li>
          </ul>

          <div className="hero-actions">
            <button className="btn-blue-solid">Conversemos tu proyecto →</button>
            <button className="btn-blue-outline">Ver servicios</button>
          </div>
        </div>

        {/* Columna Derecha: El Ecosistema Interactivo */}
        <motion.div
          className="ecosystem-visual"
          variants={nodesContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="orbit-ring ring-1"></div>
          <div className="orbit-ring ring-2"></div>

          <div className="agent-core pulse-glow">
            <div className="robot-avatar"><Bot size={40} strokeWidth={1.75} /></div>
            <span>CastellSoft IA</span>
          </div>

          {/* Nodos flotantes inspirados en el mockup, conectados al núcleo */}
          <svg className="node-links" aria-hidden="true">
            <line className="link link-1" x1="50%" y1="50%" x2="20%" y2="10%" />
            <line className="link link-2" x1="50%" y1="50%" x2="90%" y2="20%" />
            <line className="link link-3" x1="50%" y1="50%" x2="5%" y2="75%" />
            <line className="link link-4" x1="50%" y1="50%" x2="80%" y2="85%" />
            <line className="link link-5" x1="50%" y1="50%" x2="40%" y2="95%" />
          </svg>

          {NODES.map(({ slot, float, Icon, label }) => (
            <motion.div className={`node-slot ${slot}`} key={slot} variants={nodeArrive}>
              <div className={`node ${float}`}>
                <span className="icon"><Icon size={16} /></span> {label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HeroEcosystem;
