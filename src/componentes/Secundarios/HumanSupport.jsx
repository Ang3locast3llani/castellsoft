import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { whatsappLink } from '../../lib/whatsapp';
import equipoCastellSoft from '../../assets/servicios/servicio3.jpg';
import './HumanSupport.css';

const HumanSupport = () => {
  return (
    <section className="human-support">
      <motion.div
        className="human-support-copy"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h4>Atención Personalizada</h4>
        <h2>Detrás de la tecnología, hay personas que te entienden</h2>
        <p>Tendrás un ejecutivo asignado que te acompañará en todo el proceso. Comunicación directa y ágil.</p>
        <a
          href={whatsappLink('Hola, quiero conocer al equipo de CastellSoft.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-blue-solid"
        >
          Conoce nuestro equipo <ArrowRight size={16} />
        </a>
      </motion.div>

      <motion.div
        className="human-support-visual"
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <img className="equipo-foto" src={equipoCastellSoft} alt="Equipo de CastellSoft en una reunión de trabajo" loading="lazy" />
      </motion.div>
    </section>
  );
};

export default HumanSupport;
