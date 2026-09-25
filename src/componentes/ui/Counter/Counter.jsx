import React, { useEffect, useState } from 'react';
import { useMotionValue, animate } from 'framer-motion';

/**
 * Cuenta de 0 hasta `to` cuando `start` pasa a true (pensado para dispararse
 * junto con la revelación del panel de resultados del simulador).
 */
const Counter = ({ to, start, prefix = '', suffix = '', duration = 1.1 }) => {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [start, to, duration, motionValue]);

  return <>{prefix}{start ? display : 0}{suffix}</>;
};

export default Counter;
