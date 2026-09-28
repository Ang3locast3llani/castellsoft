import { useEffect, useRef } from 'react';

type ChromaKeyVideoProps = {
  src: string;
  className?: string;
  /** Luminancia (0-255) bajo la cual un pixel neutro se considera "fondo" */
  threshold?: number;
  /** Ancho de la zona de transición suave, en el mismo rango que threshold */
  softness?: number;
  /** Segundos a saltar al arrancar y en cada vuelta del loop (para evitar
   * cuadros iniciales corruptos que a veces deja el render de IA) */
  skipStart?: number;
};

/**
 * Reproduce un video y borra en vivo su fondo negro de estudio (cuadro a
 * cuadro, vía canvas), en vez de simular la transparencia con mix-blend-mode.
 * Solo descarta pixeles "neutros" (gris/negro, R≈G≈B) y oscuros, para no
 * comerse detalles oscuros pero con color como el pelo o los lentes.
 */
const ChromaKeyVideo = ({ src, className, threshold = 46, softness = 34, skipStart = 0.15 }: ChromaKeyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let rafId = 0;
    let cancelled = false;

    // Loop manual en vez del atributo `loop`: así cada vuelta también
    // arranca después de skipStart, no justo en el cuadro 0 (donde el
    // render de IA a veces deja un cuadro corrupto).
    video.loop = false;
    const handleEnded = () => {
      video.currentTime = skipStart;
      video.play();
    };
    const handleReady = () => {
      if (video.currentTime < skipStart) video.currentTime = skipStart;
    };
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleReady);

    const draw = () => {
      if (cancelled) return;
      if (video.videoWidth && video.videoHeight) {
        // Limitamos la resolución interna del canvas: no necesitamos más
        // píxeles de los que se van a mostrar, y procesar menos acelera
        // el filtrado por frame.
        const scale = Math.min(1, 640 / Math.max(video.videoWidth, video.videoHeight));
        const w = Math.round(video.videoWidth * scale);
        const h = Math.round(video.videoHeight * scale);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }

        ctx.drawImage(video, 0, 0, w, h);
        const frame = ctx.getImageData(0, 0, w, h);
        const data = frame.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const isNeutral = max - min < 20; // descarta tonos con color (pelo, piel, tela)
          if (!isNeutral) continue;

          const lum = (r + g + b) / 3;
          if (lum < threshold) {
            data[i + 3] = 0;
          } else if (lum < threshold + softness) {
            data[i + 3] = Math.round(((lum - threshold) / softness) * 255);
          }
        }

        ctx.putImageData(frame, 0, 0);
      }
      rafId = requestAnimationFrame(draw);
    };

    const start = () => {
      rafId = requestAnimationFrame(draw);
    };

    video.addEventListener('loadeddata', start);
    if (video.readyState >= 2) start();

    return () => {
      cancelled = true;
      video.removeEventListener('loadeddata', start);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafId);
    };
  }, [src, threshold, softness, skipStart]);

  return (
    <>
      <video ref={videoRef} src={src} autoPlay muted playsInline style={{ display: 'none' }} />
      <canvas ref={canvasRef} className={className} />
    </>
  );
};

export default ChromaKeyVideo;
