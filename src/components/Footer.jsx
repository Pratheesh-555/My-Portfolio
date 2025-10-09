import { motion } from 'framer-motion';
import { FaHeart, FaRocket } from 'react-icons/fa';
import { useState, useRef } from 'react';

const Footer = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleHoverStart = () => {
    // Trigger confetti after hovering for 3 seconds
    hoverTimeoutRef.current = setTimeout(() => {
      triggerConfetti();
    }, 3000);
  };

  const handleHoverEnd = () => {
    // Cancel the timeout if user stops hovering before 3 seconds
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  return (
    <footer className="relative py-12 px-4 border-t border-white/10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Portfolio
            </h3>
          </motion.div>

          {/* Made with love */}
          <motion.div
            className="flex items-center justify-center gap-2 text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>Crafted with</span>
            <motion.button
              onClick={triggerConfetti}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              className="inline-flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaHeart className="text-cyan-400" />
            </motion.button>
            <span>by PK</span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>

          {/* Scroll to top button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group"
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FaRocket className="group-hover:-translate-y-1 transition-transform" />
            <span>Back to Top</span>
          </motion.button>
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => {
            const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const startX = Math.random() * 100; // Spread across entire footer width
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  backgroundColor: color,
                  width: `${4 + Math.random() * 4}px`,
                  height: `${4 + Math.random() * 4}px`,
                  left: `${startX}%`,
                  top: '-5%',
                  boxShadow: `0 0 10px ${color}`,
                }}
                initial={{ y: 0, x: 0, opacity: 1, scale: 0 }}
                animate={{
                  y: [0, 150 + Math.random() * 200, 400 + Math.random() * 300],
                  x: [0, (Math.random() - 0.5) * 300],
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1.2, 1, 0],
                  rotate: [0, Math.random() * 360],
                }}
                transition={{
                  duration: 2.5 + Math.random() * 1.5,
                  ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
                  delay: Math.random() * 0.2,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Decorative gradient orbs */}
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
    </footer>
  );
};

export default Footer;
