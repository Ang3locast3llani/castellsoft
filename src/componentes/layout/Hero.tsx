import { useEffect, useRef } from 'react';
import { whatsappLink } from '../../lib/whatsapp';

// Recibimos la función onPlay desde App.jsx
const IntroSplash = ({ onPlay }: { onPlay: () => void }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const orb1Ref = useRef<HTMLDivElement | null>(null);
  const orb2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
      }
      if (orb1Ref.current) {
         orb1Ref.current.style.transform = `translate(${xAxis * -2}px, ${yAxis * -2}px)`;
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${xAxis * -2}px, ${yAxis * -2}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="intro" className="hero-section splash-screen">
      {/* Luces Neón */}
      <div ref={orb1Ref} className="glow-orb cyan-orb"></div>
      <div ref={orb2Ref} className="glow-orb violet-orb"></div>

      <div ref={contentRef} className="hero-content">
        <h1 className="hero-title" style={{color:"#ffffff", textShadow: '0px 2px 10px rgba(0,0,0,0.5)'}}>
          El mundo digital es un patio de juegos aterrador...
        </h1>
        <p className="hero-subtitle">
          Pero sigue siendo un patio de juegos. Y en <span className="text-gradient">CastellSoft</span>, te acompañamos a jugar.
        </p>
        <div className="cta-group">
          {/* Aquí ejecutamos la función que cambia el estado en App.jsx */}
          <button className="btn-primary" onClick={onPlay}>Comenzar a Jugar</button>
          <a
            href={whatsappLink('Hola, quiero conocer a Catalina y ver cómo puede ayudar a mi negocio.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Conocer a Catalina
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntroSplash;