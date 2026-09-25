import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../componentes/layout/NavBar/Navbar';
import HeroEcosystem from '../../componentes/layout/Hero/HeroEcosystem'; 

// El componente del simulador, según tu carpeta
import Simulacion from '../../componentes/gamificacion/Simulacion/Simulacion'; 

// Componentes secundarios
import ComoFunciona from '../../componentes/Secundarios/ComoFunciona';
import ServiciosPreview from '../../componentes/Secundarios/ServiciosPreview';
import ValueProps from '../../componentes/Secundarios/ValueProps';
import HumanSupport from '../../componentes/Secundarios/HumanSupport'; 
import TrustBadges from '../../componentes/Secundarios/TrustBadges'; 
import Footer from '../../componentes/Secundarios/footer'; // Nota: tu archivo está en minúscula (footer.jsx)

import './Home.css';

const Home = () => {
  const { hash } = useLocation();

  // Permite que links como "/#simulador" (desde Servicios u otras rutas)
  // aterricen en la sección correcta en vez de solo cambiar la URL.
  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="home-page-container">
      {/* 1. Navegación superior/lateral */}
      <Navbar />

      {/* 2. El Hero oscuro con el Robot y Nodos flotantes */}
      <HeroEcosystem />

      {/* 3. La historia: qué es un Agente de IA y por qué le sirve a una pyme */}
      <ComoFunciona />

      {/* 4. Qué ofrecemos en concreto: vista previa de los 4 servicios reales */}
      <ServiciosPreview />

      {/* 5. Pilares de la marca (Somos tu Socio Tecnológico) */}
      <ValueProps />

      {/* 6. Nuestro plato fuerte: El simulador Drag & Drop / Clics */}
      <Simulacion />

      {/* 7. Validación humana (Foto de soporte) */}
      <HumanSupport />

      {/* 8. Confianza (Logos y Estadísticas en carrusel) */}
      <TrustBadges />

      {/* 9. Pie de página */}
      <Footer />
    </div>
  );
};

export default Home;