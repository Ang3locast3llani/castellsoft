import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../../componentes/layout/NavBar/Navbar';
import Footer from '../../componentes/Secundarios/footer';
import { whatsappLink } from '../../lib/whatsapp';
import { servicios } from '../../data/servicios';

import './Servicios.css';

const Servicios = () => {
  return (
    <div className="servicios-page">
      <Navbar />

      <section className="servicios-hero">
        <span className="badge-blue">Especialistas en logística y PYMES</span>
        <h1>
          Servicios para <span className="text-highlight">Logística y PYMES</span>
        </h1>
        <p>
          Más de 35 años de experiencia diseñando el software que mueve tu operación:
          gestión, integración, automatización e IA aplicada a procesos reales.
        </p>
      </section>

      <section className="servicios-list">
        {servicios.map((s, i) => (
          <motion.article
            className={`servicio-row ${i % 2 === 1 ? 'reverse' : ''}`}
            key={s.titulo}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div className="servicio-copy">
              <span className="servicio-numero">{s.numero}</span>
              <div className="servicio-icon">
                <s.icon size={26} strokeWidth={1.75} />
              </div>
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
              <a
                href={whatsappLink(`Hola, quiero consultar sobre: ${s.titulo}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-blue-solid"
              >
                {s.cta} <ArrowRight size={16} />
              </a>
            </div>

            <div className="servicio-media">
              {s.imagen ? (
                <img src={s.imagen} alt={s.titulo} loading="lazy" />
              ) : (
                <div className="servicio-media-fallback">
                  <s.icon size={48} strokeWidth={1.5} />
                  {s.integraciones && (
                    <div className="servicio-integraciones">
                      {s.integraciones.map((nombre) => (
                        <span key={nombre} className="servicio-integracion-chip">{nombre}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Servicios;
