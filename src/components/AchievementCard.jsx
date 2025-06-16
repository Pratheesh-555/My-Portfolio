import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { buttonHover } from '../utils/animations';

const AchievementCard = ({ achievement, darkMode, onImageClick, a11yLabels }) => {
  return (
    <motion.div
      className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm shadow-xl`}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onImageClick(achievement.image)}
      role="button"
      tabIndex={0}
      aria-label={a11yLabels.certificate(achievement.title)}
      onKeyDown={(e) => e.key === 'Enter' && onImageClick(achievement.image)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {achievement.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {achievement.year}
              </p>
              <span className={darkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {achievement.description}
              </p>
            </div>
          </div>
        </div>
        {achievement.image && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onImageClick(achievement.image);
            }}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={a11yLabels.certificate(achievement.title)}
          >
            View Certificate →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementCard;