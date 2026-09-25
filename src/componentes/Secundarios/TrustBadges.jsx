import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Smartphone, Package, Database, BarChart3, Plug, Store } from 'lucide-react';
import './TrustBadges.css';

const integrations = [
  { icon: MessageCircle, label: 'WhatsApp / Email' },
  { icon: Smartphone, label: 'TikTok / DMs' },
  { icon: Package, label: 'Mercado Libre' },
  { icon: Store, label: 'Tienda Física' },
  { icon: Database, label: 'Bases de Datos' },
  { icon: BarChart3, label: 'ERP / CRM' },
  { icon: Plug, label: 'APIs propias' },
];

const loop = [...integrations, ...integrations];

const TrustBadges = () => (
  <section className="trust-badges">
    <motion.h4
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
    >
      Se integra con las herramientas que ya usas
    </motion.h4>

    <div className="trust-marquee">
      <div className="trust-track">
        {loop.map(({ icon: Icon, label }, i) => (
          <div className="trust-chip" key={`${label}-${i}`}>
            <Icon size={18} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
