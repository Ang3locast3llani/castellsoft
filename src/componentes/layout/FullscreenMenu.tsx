import { useState } from 'react';
import { Link } from 'react-router-dom';

const FullscreenMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Bloquear scroll de la página cuando el menú está abierto
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Botón Flotante */}
      <button 
        className={`float-menu-btn glass-btn ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      {/* Overlay a Pantalla Completa */}
      <nav className={`fullscreen-overlay ${isOpen ? 'active' : 'hidden'}`}>
        <div className="menu-content">
          <ul className="menu-links">
            {/* Los retrasos de animación se manejan mejor en CSS iterando índices, 
                pero aquí usamos inline styles para simplicidad en la migración */}
            <li><a href="#hero" className="menu-item" onClick={handleLinkClick} style={{ transitionDelay: isOpen ? '0.1s' : '0s' }}>01. Inicio</a></li>
            <li><a href="#dolores" className="menu-item" onClick={handleLinkClick} style={{ transitionDelay: isOpen ? '0.2s' : '0s' }}>02. El Desafío</a></li>
            <li><a href="#soluciones" className="menu-item" onClick={handleLinkClick} style={{ transitionDelay: isOpen ? '0.3s' : '0s' }}>03. Soluciones</a></li>
            <li><a href="#contacto" className="menu-item" onClick={handleLinkClick} style={{ transitionDelay: isOpen ? '0.4s' : '0s' }}>04. Juguemos</a></li>
            <li><Link to="/servicios" className="menu-item" onClick={handleLinkClick} style={{ transitionDelay: isOpen ? '0.5s' : '0s' }}>05. Servicios</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default FullscreenMenu;