import { Link } from 'react-router-dom';
import './NotFound.css';

// Mascota simple en SVG, en la paleta de marca (el mismo azul del "agent-core"
// del Hero), con el brazo derecho animado en un saludo vía CSS.
const RobotMascot = () => (
  <svg viewBox="0 0 300 300" className="not-found-svg" role="img" aria-label="Robot confundido saludando">
    <defs>
      <linearGradient id="robotFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>

    {/* Antena */}
    <line x1="150" y1="18" x2="150" y2="42" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
    <circle cx="150" cy="14" r="7" fill="#93C5FD" className="antenna-dot" />

    {/* Pierna y brazo izquierdos (estáticos) */}
    <rect x="100" y="228" width="22" height="48" rx="10" fill="#1E3A8A" />
    <rect x="178" y="228" width="22" height="48" rx="10" fill="#1E3A8A" />
    <ellipse cx="111" cy="280" rx="18" ry="8" fill="#0B1120" />
    <ellipse cx="189" cy="280" rx="18" ry="8" fill="#0B1120" />
    <line x1="82" y1="150" x2="58" y2="195" stroke="#2563EB" strokeWidth="16" strokeLinecap="round" />
    <circle cx="56" cy="200" r="11" fill="#1E3A8A" />

    {/* Cuerpo */}
    <rect x="80" y="130" width="140" height="100" rx="20" fill="url(#robotFill)" stroke="#60A5FA" strokeWidth="2" />
    <circle cx="150" cy="166" r="13" fill="#93C5FD" className="chest-light" />
    <rect x="104" y="200" width="20" height="6" rx="3" fill="#0B1120" opacity="0.5" />
    <rect x="176" y="200" width="20" height="6" rx="3" fill="#0B1120" opacity="0.5" />

    {/* Cabeza */}
    <rect x="95" y="42" width="110" height="88" rx="22" fill="url(#robotFill)" stroke="#60A5FA" strokeWidth="2" />
    <rect x="112" y="64" width="76" height="44" rx="14" fill="#0B1120" />
    <circle cx="134" cy="86" r="7" fill="#60A5FA" />
    <circle cx="166" cy="86" r="7" fill="#60A5FA" />
    <rect x="138" y="98" width="24" height="5" rx="2.5" fill="#60A5FA" opacity="0.7" />

    {/* Brazo derecho: saluda (pivota desde el hombro) */}
    <g className="waving-arm" style={{ transformOrigin: '220px 150px' }}>
      <line x1="220" y1="150" x2="246" y2="100" stroke="#2563EB" strokeWidth="16" strokeLinecap="round" />
      <circle cx="248" cy="94" r="12" fill="#1E3A8A" />
      <line x1="248" y1="94" x2="240" y2="76" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
      <line x1="248" y1="94" x2="252" y2="74" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
      <line x1="248" y1="94" x2="264" y2="82" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
);

const NotFound = () => {
  return (
    <section className="hero-section not-found-section">
      <div className="glow-orb cyan-orb"></div>
      <div className="glow-orb violet-orb"></div>

      <div className="hero-content not-found-content">
        <div className="not-found-robot-wrap">
          <div className="orbit-ring ring-1"></div>
          <div className="orbit-ring ring-2"></div>
          <div className="not-found-robot float-a">
            <RobotMascot />
          </div>
        </div>

        <span className="badge-blue not-found-eyebrow">Oops</span>
        <h1 className="glitch not-found-code" data-text="404">404</h1>
        <p className="hero-subtitle not-found-subtitle">
          El agente no encontró esta ruta. Puede que el enlace esté roto o que la página se haya movido.
        </p>

        <div className="cta-group">
          <Link to="/" className="btn-primary">Volver al inicio</Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
