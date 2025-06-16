import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cardHover } from '../utils/animations';

const ProjectCard = memo(({ project, darkMode, onClick, a11yLabels, isMobile }) => {
  const cardAnimation = cardHover(isMobile);
  return (
    <motion.div
      className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300
        ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      whileHover={cardHover.hover}
      initial="rest"
      animate="rest"
      onClick={() => onClick(project)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
      role="button"
      tabIndex={0}
      aria-label={a11yLabels.projectCard(project.title)}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)"
      }}
    >
      <div className="h-48 md:h-56 relative overflow-hidden group">
        <img 
          src={project.image} 
          alt={`${project.title} project thumbnail`}
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          style={{ 
            objectFit: 'cover',
            backfaceVisibility: 'hidden'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:opacity-0 transition-opacity duration-300"/>
        {project.requiresAuth && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-bold mb-3">{project.title}</h3>
        <p className={`mb-4 text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {project.description}
        </p>
        <p className="text-sm font-medium text-blue-500">{project.tech}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;