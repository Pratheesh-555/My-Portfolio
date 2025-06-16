import React from 'react';
import { motion } from 'framer-motion';

const ImagePopup = ({ image, onClose, darkMode }) => {
  if (!image) return null;
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Certificate Image Viewer"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative max-w-5xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className={`absolute -top-4 -right-4 ${
            darkMode 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
          } rounded-full p-2 transition-colors z-10`}
          aria-label="Close image viewer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl p-2 shadow-2xl`}>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            src={image}
            alt="Achievement Certificate"
            className="w-full h-auto rounded-lg"
            style={{ maxHeight: "85vh" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImagePopup;