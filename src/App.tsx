import { useState, useLayoutEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import FullscreenMenu from "./componentes/layout/FullscreenMenu";
import IntroSplash from "./componentes/layout/Hero"; // Tu Hero actual renombrado
import Home from "./Paginas/Home/Home"; // La página que creamos con el cliente
import Servicios from "./Paginas/Servicios/Servicios";
import Agentes from "./Paginas/Agentes/Agentes";
import NotFound from "./Paginas/NotFound/NotFound";
import ColibriCursor from "./componentes/ui/Colibri/ColibriCursor";
import './App.css';

// La intro con "Comenzar a Jugar" solo vive en la ruta "/".
// El resto de las páginas (como /servicios) se muestran directo, sin este portón.
const Landing = () => {
  // Si se llega con un ancla (ej. desde el link "Servicios" -> "/#historia"),
  // el usuario ya quiere ver esa sección: nos saltamos la intro.
  const [hasStarted, setHasStarted] = useState(() => Boolean(window.location.hash));

  return (
    <div className="landing-shell">
      {/* Solo durante la intro: dentro del Home, el Navbar ya trae su propio menú */}
      {!hasStarted && <FullscreenMenu />}

      {/* Contenedor de la introducción (Se desliza hacia arriba) */}
      <div className={`intro-wrapper ${hasStarted ? 'slide-up-exit' : ''}`}>
        <IntroSplash onPlay={() => setHasStarted(true)} />
      </div>

      {/* Contenedor del Home principal (Se revela debajo) */}
      <div className={`main-content-wrapper ${hasStarted ? 'fade-in-enter' : 'hidden'}`}>
        {hasStarted && <Home />}
      </div>
    </div>
  );
};

// Envuelve cada página con un fundido + leve desplazamiento al entrar/salir,
// para que cambiar de ruta no sea un corte seco.
const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AppRoutes = () => {
  const location = useLocation();

  // Al cambiar de página (no de ancla dentro de la misma página) volvemos
  // arriba antes de que corra la animación, para no arrancar a mitad de scroll.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/servicios" element={<PageTransition><Servicios /></PageTransition>} />
        <Route path="/agentes" element={<PageTransition><Agentes /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Cursor personalizado (colibrí), visible en toda la app */}
        <ColibriCursor />

        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
