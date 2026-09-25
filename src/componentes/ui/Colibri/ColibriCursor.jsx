import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';

// Support both ESM and CommonJS interop: some bundlers return a module namespace object
const LottieComponent = (Lottie && Lottie.default) ? Lottie.default : Lottie;
import hummingbirdAnimation from '../../../assets/Colibri.json';
import './ColibriCursor.css';

const ColibriCursor = () => {
  const cursorRef = useRef(null);
  const wingsRef = useRef(null);
  const lottieRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    isHoveringRef.current = isHovering;
    // Al posarse sobre algo interactivo, el aleteo se calma un poco,
    // como si el colibrí estuviera realmente observando el botón.
    if (lottieRef.current && typeof lottieRef.current.setSpeed === 'function') {
      lottieRef.current.setSpeed(isHovering ? 0.55 : 1);
    }
  }, [isHovering]);

  // --- LÓGICA DE MOVIMIENTO DEL CURSOR ---
  // Un colibrí real nunca se mueve en línea recta ni a velocidad constante:
  // avanza a golpes, corrige de rumbo, se inclina en los giros y se queda
  // "flotando" con pequeñas vibraciones cuando está quieto. Ese es el
  // comportamiento que buscamos aquí en vez de un simple lerp uniforme.
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    let facing = 1; // -1..1, se interpola suave en vez de voltearse de golpe
    let tilt = 0; // grados de inclinación (banking) en los giros
    let idleClock = 0;
    let lastTime = performance.now();
    let rafId = null;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      idleClock = 0;
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .interactive')) setIsHovering(true);
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('button, a, .interactive')) setIsHovering(false);
    };

    const follow = (now) => {
      // Normalizamos el paso de tiempo para que el movimiento no dependa
      // del refresco de pantalla (evita el efecto "tembloroso" en monitores 144Hz+)
      const dt = Math.min(now - lastTime, 48) / 16.67;
      lastTime = now;
      idleClock += dt;

      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Resorte suave: acelera cuando está lejos del cursor real y se asienta
      // con delicadeza al llegar, en vez de una velocidad fija y mecánica.
      const pull = (isHoveringRef.current ? 0.14 : 0.11) * dt;
      currentX += dx * pull;
      currentY += dy * pull;

      const stepX = dx * pull;
      const stepY = dy * pull;
      const speed = Math.hypot(stepX, stepY);

      // Micro-vibración de "vuelo estacionario" cuando el mouse está quieto,
      // igual que un colibrí real sostenido en el aire.
      let hoverX = 0;
      let hoverY = 0;
      if (speed < 0.12) {
        hoverX = Math.sin(idleClock * 0.09) * 2.6;
        hoverY = Math.cos(idleClock * 0.14) * 2;
      }

      // El giro se interpola en vez de voltearse instantáneamente: al pasar
      // por el punto medio se "achica" un instante, como un viraje real.
      if (stepX > 0.06) facing += (1 - facing) * 0.16 * dt;
      else if (stepX < -0.06) facing += (-1 - facing) * 0.16 * dt;

      const targetTilt = Math.max(-14, Math.min(14, stepY * 2.4 - stepX * 0.8));
      tilt += (targetTilt - tilt) * 0.18 * dt;
      const appliedTilt = facing < 0 ? -tilt : tilt;

      const offsetX = isHoveringRef.current ? 6 : 16;
      const offsetY = isHoveringRef.current ? -8 : 16;

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${Math.round(currentX + offsetX + hoverX)}px, ${Math.round(currentY + offsetY + hoverY)}px, 0)`;
      }
      if (wingsRef.current) {
        wingsRef.current.style.transform = `scaleX(${facing.toFixed(3)}) rotate(${appliedTilt.toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(follow);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId = requestAnimationFrame(follow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={cursorRef} className={`custom-cursor-colibri ${isHovering ? 'posado' : ''}`}>
      <div ref={wingsRef} className="colibri-wings">
        <LottieComponent
          lottieRef={lottieRef}
          animationData={hummingbirdAnimation}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default ColibriCursor;
