// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoBlanco from '../../assets/logos/Logo_nuevo_transparente_blanco.png';
import './footer.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer-inner">
      <div className="site-footer-brand">
        <img className="site-footer-logo" src={logoBlanco} alt="CastellSoft" />
        <p>Agentes de IA y automatizaciones a la medida para tu negocio.</p>
      </div>

      <nav className="site-footer-links">
        <Link to="/#historia">Nuestro Enfoque</Link>
        <Link to="/#simulador">Simulador</Link>
        <Link to="/#soluciones">Soluciones Inteligentes</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/agentes">Nuestros Agentes</Link>
      </nav>
    </div>

    <p className="site-footer-copy">© 2026 CastellSoft SPA. Todos los derechos reservados.</p>
  </footer>
);

export default Footer;
