import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { whatsappLink } from '../../../lib/whatsapp';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para abrir/cerrar el menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Bloquear el scroll del fondo cuando el menú está abierto (Mejora de UX)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {/* Cabecera Minimalista */}
      <header className="minimal-header">
        <Link to="/" className="logo">CastellSoft</Link>

        {/* Navegación entre páginas, visible en escritorio */}
        <nav className="header-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink>
          <NavLink to="/servicios" className={({ isActive }) => isActive ? 'active' : ''}>Servicios</NavLink>
          <NavLink to="/agentes" className={({ isActive }) => isActive ? 'active' : ''}>Agentes</NavLink>
        </nav>

        {/* Botón Hamburguesa Animado */}
        <button 
          className={`menu-toggle ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </header>

      {/* Overlay oscuro para enfocar la atención en el menú */}
      <div 
        className={`menu-overlay ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      ></div>

      {/* Menú Lateral Flotante */}
      <aside className={`floating-sidebar ${isOpen ? 'active' : ''}`}>
        <nav className="sidebar-links">
          <p className="sidebar-subtitle">Menú de Navegación</p>
          
          <Link to="/#historia" onClick={toggleMenu}>
            <span>01.</span> Nuestro Enfoque
          </Link>
          <Link to="/#simulador" onClick={toggleMenu}>
            <span>02.</span> Simulador PYME 2.0
          </Link>
          <Link to="/#soluciones" onClick={toggleMenu}>
            <span>03.</span> Soluciones Inteligentes
          </Link>
          <NavLink to="/servicios" onClick={toggleMenu} className={({ isActive }) => isActive ? 'active' : ''}>
            <span>04.</span> Servicios
          </NavLink>
          <NavLink to="/agentes" onClick={toggleMenu} className={({ isActive }) => isActive ? 'active' : ''}>
            <span>05.</span> Conoce a Nuestros Agentes
          </NavLink>

          <div className="sidebar-footer">
            <p>¿Listo para dar el salto digital?</p>
            <a
              href={whatsappLink('Hola, quiero hablar con un experto de CastellSoft sobre mi negocio.')}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-cta"
              onClick={toggleMenu}
            >
              Hablar con un Experto
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;