import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const ImagePopup = ({ image, imageSrc, onClose, darkMode, isOpen, requiresAuth, title, projectLink }) => {
  const imageUrl = image || imageSrc;
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!requiresAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Set your password here
  const CORRECT_PASSWORD = '555';
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      
      // If it's a locked project, redirect to the site
      if (requiresAuth && projectLink) {
        setTimeout(() => {
          window.open(projectLink, '_blank');
          onClose();
        }, 500);
      }
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      // Reset authentication when modal opens
      setIsAuthenticated(!requiresAuth);
      setPassword('');
      setError('');
    }
    
    return () => {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, requiresAuth]);
  
  if (!imageUrl || !isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Certificate Image Viewer"
      >
        {/* Close button at top */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="fixed top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all shadow-2xl flex items-center justify-center"
          aria-label="Close image viewer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative max-w-5xl w-full"
          onClick={e => e.stopPropagation()}
        >
          {!isAuthenticated ? (
            /* Password Form */
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center"
              >
                <FaLock className="text-white text-3xl" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                Protected Project
              </h3>
              <p className="text-gray-400 text-center mb-6">
                {title || 'This project'} requires authentication
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Unlock Project
                </motion.button>
              </form>

              <p className="text-gray-500 text-xs text-center mt-4">
                Contact me if you need access
              </p>
            </div>
          ) : (
            /* Image Display */
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-white/10">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={imageUrl}
                alt={title || "Project Image"}
                className="w-full h-auto rounded-xl"
                style={{ maxHeight: "85vh" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImagePopup;