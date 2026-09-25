import { Warehouse, Network, SearchCheck, Bot, ShoppingCart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import servicio1 from '../assets/servicios/servicio1.jpg';
import servicio2 from '../assets/servicios/servicio2.jpg';
import servicio3 from '../assets/servicios/servicio4.jpg';
import servicio4 from '../assets/servicios/servicio5.jpg';

export type Servicio = {
  icon: LucideIcon;
  numero: string;
  titulo: string;
  resumen: string;
  texto: string;
  cta: string;
  // Los primeros 4 tienen foto real (castellsoft.cl); los que se agreguen
  // después pueden no tenerla todavía, y se muestran con un panel de ícono.
  imagen?: string;
  // Chips de integraciones puntuales, para servicios que no son "una sola cosa"
  // (ej: E-commerce integra con Shopify, Transbank, Mercado Pago).
  integraciones?: string[];
};

// Fuente única de verdad para los servicios reales (los 4 originales de
// castellsoft.cl/servicios.html, más los que se van agregando). La usan
// tanto la página /servicios (detalle completo) como la vista previa en el Home.
export const servicios: Servicio[] = [
  {
    icon: Warehouse,
    numero: '01',
    titulo: 'ERP y Sistemas de Gestión para Logística',
    resumen: 'Software a medida para controlar inventario, rutas y flotas.',
    texto: 'Desarrollamos sistemas integrales de gestión específicamente para empresas de logística y transporte. Con más de 35 años de experiencia, creamos soluciones que controlan inventario, optimizan rutas, gestionan flotas y automatizan tus procesos operativos críticos. Software estable en .NET y SQL que crece con tu negocio.',
    cta: 'Consultar Desarrollo de ERP',
    imagen: servicio1,
  },
  {
    icon: Network,
    numero: '02',
    titulo: 'Integración de Sistemas Logísticos',
    resumen: 'Conectamos TMS, WMS, GPS y facturación en una sola plataforma.',
    texto: 'Conectamos tus sistemas existentes (TMS, WMS, GPS flota, facturación) en una plataforma unificada. Eliminamos islas de información y creamos flujos de datos automatizados que optimizan cada etapa de tu operación logística. Maximiza el ROI de tu tecnología actual.',
    cta: 'Consultar Integración',
    imagen: servicio2,
  },
  {
    icon: SearchCheck,
    numero: '03',
    titulo: 'Consultoría en Automatización de Procesos',
    resumen: 'Detectamos dónde perdés tiempo y diseñamos cómo resolverlo.',
    texto: 'Identificamos cuellos de botella y oportunidades de automatización en tu operación. No solo escribimos código: analizamos tus procesos y diseñamos la estrategia tecnológica que más impacto genere en tu eficiencia y reducción de costos.',
    cta: 'Solicitar Auditoría de Procesos',
    imagen: servicio3,
  },
  {
    icon: Bot,
    numero: '04',
    titulo: 'Automatización Inteligente para Operaciones',
    resumen: 'Agentes de IA que atienden, reportan y alertan sin parar.',
    texto: 'Implementamos agentes de IA y flujos de trabajo automatizados con N8N para tareas repetitivas: notificaciones, reportes automáticos, seguimiento de órdenes, alertas de stock. Reducimos errores manuales y liberamos a tu equipo para tareas de mayor valor.',
    cta: 'Consultar Automatización con IA',
    imagen: servicio4,
  },
  {
    icon: ShoppingCart,
    numero: '05',
    titulo: 'E-commerce y Medios de Pago',
    resumen: 'Tiendas online a tu medida, con Shopify o pasarelas de pago ya integradas.',
    texto: 'Creamos tiendas online propias y totalmente personalizadas, o integramos tu operación con Shopify si ya trabajas ahí. Conectamos pasarelas de pago como Transbank y Mercado Pago para que cobres sin fricción, con pedidos y stock sincronizados con el resto de tu negocio.',
    cta: 'Consultar E-commerce',
    integraciones: ['Shopify', 'Transbank', 'Mercado Pago'],
  },
];
