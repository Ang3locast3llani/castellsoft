import sofiaImg from '../assets/agentes/Sofia.webp';
import sofiaVideo from '../assets/agentes/sofia saludo.mp4';
import camilaImg from '../assets/agentes/Camila.webp';
import valentinaImg from '../assets/agentes/Valentina.webp';
import maxImg from '../assets/agentes/Max.webp';
import martinaImg from '../assets/agentes/Martina.webp';
import isabellaImg from '../assets/agentes/Isabella.webp';
import alejandroImg from '../assets/agentes/Alejandro.webp';

export type Agente = {
  id: string;
  nombre: string;
  color: string;
  rol: string;
  rasgos: string;
  imagen?: string;
  video?: string;
};

// Cada agente tiene su propio color de identidad (el de su polera).
// Por ahora solo Sofía tiene animación; el resto se completa a medida
// que estén listas.
export const agentes: Agente[] = [
  {
    id: 'sofia',
    nombre: 'Sofía',
    color: '#38BDF8',
    rol: 'Atención al Cliente',
    rasgos: 'Amable, empática y siempre lista para ayudar.',
    imagen: sofiaImg,
    video: sofiaVideo,
  },
  {
    id: 'camila',
    nombre: 'Camila',
    color: '#8B5CF6',
    rol: 'Agenda y Reservas',
    rasgos: 'Organizada, práctica y eficiente. Tu tiempo siempre en buenas manos.',
    imagen: camilaImg,
  },
  {
    id: 'valentina',
    nombre: 'Valentina',
    color: '#EAB308',
    rol: 'Finanzas',
    rasgos: 'Seria, ordenada y cuidadosa. Experta en números y en hacer crecer tu negocio.',
    imagen: valentinaImg,
  },
  {
    id: 'max',
    nombre: 'Max',
    color: '#16A34A',
    rol: 'Asistente de Ventas',
    rasgos: 'Persuasivo, proactivo y orientado a cerrar negocios.',
    imagen: maxImg,
  },
  {
    id: 'martina',
    nombre: 'Martina',
    color: '#F97316',
    rol: 'Logística y Operaciones',
    rasgos: 'Práctica, rápida y resolutiva. Se asegura que todo llegue a su destino.',
    imagen: martinaImg,
  },
  {
    id: 'isabella',
    nombre: 'Isabella',
    color: '#EC4899',
    rol: 'Marketing',
    rasgos: 'Creativa, entusiasta y estratégica. Hace que tu marca brille siempre.',
    imagen: isabellaImg,
  },
  {
    id: 'alejandro',
    nombre: 'Alejandro',
    color: '#2563EB',
    rol: 'Gestión e Inteligencia Comercial',
    rasgos: 'Analítico, estratégico y orientado a resultados. Convierte datos en decisiones inteligentes.',
    imagen: alejandroImg,
  },
];
