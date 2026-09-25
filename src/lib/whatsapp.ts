// Número real de WhatsApp Empresarial de CastellSoft (castellsoft.cl/contacto.html)
export const WHATSAPP_NUMBER = '56977423647';

// Arma un link de WhatsApp con un mensaje pre-cargado según el contexto
// desde el que se hizo click (botón, servicio, sección, etc.)
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
