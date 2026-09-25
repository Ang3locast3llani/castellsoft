import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, ShieldCheck, Star } from 'lucide-react';
import './ValueProps.css';

const pillars = [
  {
    icon: Handshake,
    title: 'Entendemos tu negocio',
    text: 'Escuchamos y proponemos soluciones alineadas a tus objetivos.',
  },
  {
    icon: ShieldCheck,
    title: 'Compromiso real',
    text: 'Nos involucramos como parte de tu equipo.',
  },
  {
    icon: Star,
    title: 'Calidad y profesionalismo',
    text: 'Procesos sólidos y resultados medibles.',
  },
];

const ValueProps = () => {
  return (
    <section className="value-props" id="historia">
      <motion.span
        className="value-props-eyebrow"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        Más que proveedores
      </motion.span>

      <motion.h2
        className="value-props-title"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        Somos tu <span className="text-blue">Socio Tecnológico</span>
      </motion.h2>

      <div className="value-props-grid">
        {pillars.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            className="value-card"
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="value-card-icon">
              <Icon size={26} strokeWidth={1.75} />
            </div>
            <h4>{title}</h4>
            <p>{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ValueProps;
