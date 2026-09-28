import { useEffect, useRef } from 'react';

type ChromaKeyVideoProps = {
  src: string;
  className?: string;
  /** Luminancia (0-255) bajo la cual un pixel neutro se considera "fondo" */
  threshold?: number;
  /** Ancho de la zona de transición suave, en el mismo rango que threshold */
  softness?: number;
  /** Segundos a ignorar al arrancar y en cada vuelta del loop (para saltar
   * cuadros iniciales corruptos que a veces deja el render de IA) */
  skipStart?: number;
};

/**
 * Reproduce un video y borra en vivo su fondo negro de estudio (cuadro a
 * cuadro, vía canvas), en vez de simular la transparencia con mix-blend-mode.
 * Solo descarta pixeles "neutros" (gris/negro, R≈G≈B) y oscuros, para no
 * comerse detalles oscuros pero con color como el pelo o los lentes.
 */
const ChromaKeyVideo = ({ src, className, threshold = 32, softness = 18, skipStart = 0.15 }: ChromaKeyVideoProps) => {
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

    const draw = () => {
      if (cancelled) return;
      if (video.videoWidth && video.videoHeight) {
        // Limitamos la resolución interna del canvas: no necesitamos más
        // píxeles de los que se van a mostrar, y procesar menos acelera
        // el filtrado por frame. Esto lo hacemos siempre (aunque este
        // cuadro se vaya a saltar) para que el canvas nunca se quede en
        // su tamaño por defecto de 300x150.
        const scale = Math.min(1, 640 / Math.max(video.videoWidth, video.videoHeight));
        const w = Math.round(video.videoWidth * scale);
        const h = Math.round(video.videoHeight * scale);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }

        // Mientras el video está en el tramo inicial corrupto (recién
        // arrancó o acaba de reiniciar el loop nativo), no pintamos ese
        // cuadro: se queda con el último cuadro bueno hasta que pase.
        if (video.currentTime < skipStart) {
          rafId = requestAnimationFrame(draw);
          return;
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
          const isNeutral = max - min < 14; // descarta tonos con color (pelo, piel, tela)
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
      // El atributo HTML `autoPlay` no siempre alcanza a arrancar la
      // reproducción por sí solo; lo forzamos acá para asegurar que el
      // video realmente se mueva (ignoramos el error si el navegador
      // llegara a bloquearlo, aunque al estar muted no debería pasar).
      video.play().catch(() => {});
      rafId = requestAnimationFrame(draw);
    };

    video.addEventListener('loadeddata', start);
    if (video.readyState >= 2) start();

    return () => {
      cancelled = true;
      video.removeEventListener('loadeddata', start);
      cancelAnimationFrame(rafId);
    };
  }, [src, threshold, softness, skipStart]);

  return (
    <>
      {/* display:none frena el autoplay en varios navegadores (tratan el
          video como si no estuviera "visible"). Lo sacamos de pantalla en
          vez de ocultarlo, así decodifica y reproduce con normalidad. */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />
      <canvas ref={canvasRef} className={className} />
    </>
  );
};

export default ChromaKeyVideo;
