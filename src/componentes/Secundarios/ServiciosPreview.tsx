import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicios } from '../../data/servicios';
import './ServiciosPreview.css';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// Vista previa de los 4 servicios reales (la fuente completa está en
// src/data/servicios.ts, compartida con /servicios) para que el Home
// muestre en concreto qué ofrece CastellSoft, no solo el concepto general.
const ServiciosPreview = () => {
  return (
    <section className="servicios-preview">
      <motion.span
        className="badge-light"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        Lo que ofrecemos
      </motion.span>

      <motion.h2
        className="servicios-preview-title"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        4 formas de modernizar tu operación
      </motion.h2>

      <motion.p
        className="servicios-preview-subtitle"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Del ERP a la automatización con IA: esto es exactamente lo que construimos para empresas de logística y PYMES.
      </motion.p>

      <motion.div
        className="servicios-preview-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {servicios.map(({ numero, icon: Icon, titulo, resumen }) => (
          <motion.div className="servicio-mini-card" key={numero} variants={item}>
            <span className="servicio-mini-numero">{numero}</span>
            <div className="servicio-mini-icon">
              <Icon size={22} strokeWidth={1.75} />
            </div>
            <h3>{titulo}</h3>
            <p>{resumen}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Link to="/servicios" className="btn-blue-solid servicios-preview-cta">
          Ver todos los servicios <ArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
};

export default ServiciosPreview;
