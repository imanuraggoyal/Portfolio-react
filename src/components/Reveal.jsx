import { motion } from 'framer-motion';

export default function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
  viewport = { once: true, margin: '-40px' },
}) {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 32, x: 0 };
      case 'down':
        return { y: -32, x: 0 };
      case 'left':
        return { x: 32, y: 0 };
      case 'right':
        return { x: -32, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
