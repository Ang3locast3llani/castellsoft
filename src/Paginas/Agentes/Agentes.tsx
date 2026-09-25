import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, ArrowRight } from 'lucide-react';
import Navbar from '../../componentes/layout/NavBar/Navbar';
import Footer from '../../componentes/Secundarios/footer';
import { whatsappLink } from '../../lib/whatsapp';
import { agentes } from '../../data/agentes';
import './Agentes.css';

const Agentes = () => {
  const [activeId, setActiveId] = useState(agentes[0].id);
  const [team, setTeam] = useState<string[]>([]);

  const active = agentes.find((a) => a.id === activeId) ?? agentes[0];
  const enEquipo = team.includes(active.id);

  const toggleTeam = (id: string) => {
    setTeam((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const nombresEquipo = team.map((id) => agentes.find((a) => a.id === id)?.nombre).filter(Boolean);

  return (
    <div className="agentes-page">
      <Navbar />

      <section className="agentes-stage">
        <motion.div
          className="agentes-tint"
          animate={{ backgroundColor: active.color }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Riel de "marcapáginas": cada agente vive semi-oculto en el borde
            izquierdo y se asoma al pasar el mouse o al quedar seleccionado. */}
        <nav className="agentes-rail" aria-label="Selección de agentes">
          {agentes.map((a) => {
            const isActive = a.id === active.id;
            const isInTeam = team.includes(a.id);
            return (
              <motion.button
                key={a.id}
                type="button"
                className={`agente-tab ${isActive ? 'active' : ''}`}
                style={{ backgroundColor: a.color }}
                animate={{ x: isActive ? 0 : -150 }}
                whileHover={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                onClick={() => setActiveId(a.id)}
                aria-pressed={isActive}
                aria-label={`Ver a ${a.nombre}, ${a.rol}`}
              >
                <span className="agente-tab-avatar">
                  {a.imagen ? (
                    <img src={a.imagen} alt="" loading="lazy" />
                  ) : (
                    <span className="agente-tab-initial">{a.nombre.charAt(0)}</span>
                  )}
                  {isInTeam && <Check className="agente-tab-check" size={12} strokeWidth={3} />}
                </span>
                <span className="agente-tab-name">{a.nombre}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="agentes-content">
          <span className="agentes-eyebrow">Conoce a nuestros agentes</span>
          <h1 className="agentes-title">Elige el tuyo y arma tu equipo</h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="agente-showcase"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="agente-media">
                <div className="agente-media-glow" style={{ backgroundColor: active.color }} />
                <div className="agente-pedestal" style={{ backgroundColor: active.color }} />

                {active.video ? (
                  <video
                    className="agente-video"
                    src={active.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : active.imagen ? (
                  <img className="agente-foto" src={active.imagen} alt={`${active.nombre}, ${active.rol}`} />
                ) : (
                  <div className="agente-placeholder" style={{ borderColor: active.color }}>
                    <span style={{ color: active.color }}>{active.nombre.charAt(0)}</span>
                    <p>Animación próximamente</p>
                  </div>
                )}
              </div>

              <div className="agente-info">
                <span className="agente-rol-chip" style={{ backgroundColor: active.color }}>{active.rol}</span>
                <h2>{active.nombre}</h2>
                <p className="agente-rasgos">{active.rasgos}</p>

                <button
                  type="button"
                  className={`agente-team-btn ${enEquipo ? 'in-team' : ''}`}
                  style={enEquipo
                    ? { backgroundColor: active.color, borderColor: active.color }
                    : { borderColor: active.color, color: active.color }}
                  onClick={() => toggleTeam(active.id)}
                >
                  {enEquipo ? <Check size={16} /> : <Plus size={16} />}
                  {enEquipo ? 'En tu equipo' : 'Agregar a mi equipo'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />

      <motion.div
        className="team-bar"
        initial={false}
        animate={{ y: team.length ? 0 : 90, opacity: team.length ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <div className="team-bar-inner">
          <div className="team-dots">
            {team.map((id) => {
              const a = agentes.find((x) => x.id === id);
              if (!a) return null;
              return <span key={id} className="team-dot" style={{ backgroundColor: a.color }} title={a.nombre} />;
            })}
          </div>
          <p className="team-bar-text">Tu equipo: {nombresEquipo.join(', ')}</p>
          <a
            href={whatsappLink(`Hola, quiero armar mi equipo con: ${nombresEquipo.join(', ')}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-blue-solid"
          >
            Arma tu equipo con nosotros <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Agentes;
