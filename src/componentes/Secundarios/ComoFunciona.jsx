import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Workflow, Moon, ArrowRight } from 'lucide-react';
import './ComoFunciona.css';

// La misma historia del material del cliente ("Libera tu negocio con tu
// Agente de IA"), reescrita como 3 tarjetas con el estilo del sitio.
const PASOS = [
  {
    numero: '01',
    icon: Bot,
    titulo: '¿Qué es un Agente de IA?',
    intro: 'Un asistente digital que aprende las tareas repetitivas de tu negocio, para que dejes de hacerlas tú.',
    puntos: [
      'Entiende tus necesidades',
      'Organiza y gestiona tus procesos',
      'Crea estrategias a tu medida',
      'Impulsa el valor de tu pyme',
    ],
  },
  {
    numero: '02',
    icon: Workflow,
    titulo: 'Automatiza lo que te quita tiempo',
    intro: 'Se hace cargo del día a día mientras tú te enfocas en crecer.',
    puntos: [
      'Atiende clientes por chat',
      'Gestiona pedidos e inventario',
      'Genera reportes automáticos',
      'Agenda citas por ti',
    ],
  },
  {
    numero: '03',
    icon: Moon,
    titulo: 'Trabaja 24/7/365, sin descanso',
    intro: 'Responde al instante sea de día, de noche o feriado, y nunca se cansa.',
    puntos: [
      'Trabajo constante e incansable',
      'Nunca se enferma ni se toma vacaciones',
      'Tu negocio no se detiene mientras tú descansas',
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const ComoFunciona = () => {
  return (
    <section className="como-funciona">
      <motion.span
        className="badge-light"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
      >
        Antes de seguir
      </motion.span>

      <motion.h2
        className="como-funciona-title"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        Libera tu negocio con un <span className="text-blue">Agente de IA</span>
      </motion.h2>

      <motion.p
        className="como-funciona-subtitle"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Para pymes que están cansadas de ser esclavas de su propio negocio.
      </motion.p>

      <motion.div
        className="como-funciona-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {PASOS.map(({ numero, icon: Icon, titulo, intro, puntos }) => (
          <motion.article className="paso-card" key={numero} variants={item}>
            <span className="paso-numero">{numero}</span>
            <div className="paso-icon">
              <Icon size={26} strokeWidth={1.75} />
            </div>
            <h3>{titulo}</h3>
            <p>{intro}</p>
            <ul>
              {puntos.map((punto) => (
                <li key={punto}>{punto}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="como-funciona-cierre"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="cierre-pill">Crecimiento</span>
        <ArrowRight size={18} />
        <span className="cierre-pill cierre-pill-solid">Libertad</span>
      </motion.div>
    </section>
  );
};

export default ComoFunciona;
