import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaLock } from 'react-icons/fa';

const ProjectCard = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index || 0) * 0.1 }}
      className="group relative h-full"
    >
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl hover:border-blue-500/30 transition-colors"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative h-full flex flex-col">
          {/* Image Section */}
          <div className="relative h-56 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
            </motion.div>

            {/* Tech badges */}
            <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end max-w-[60%]">
              {project.tech.split('·').slice(0, 3).map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-xs text-white hover:border-blue-400/50 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {tech.trim()}
                </motion.span>
              ))}
            </div>

            {/* Lock icon for auth required */}
            {project.requiresAuth && (
              <motion.div
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/50 flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <FaLock className="text-yellow-400" />
              </motion.div>
            )}

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-6 flex-1">
              {project.description}
            </p>

            {/* Link Button */}
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                // Only prevent default and show popup if auth is required
                if (project.requiresAuth && onClick) {
                  e.preventDefault();
                  onClick(project);
                }
              }}
              className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold overflow-hidden hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Button text */}
              <span className="relative z-10 text-white flex items-center gap-2">
                View Project <FaExternalLinkAlt size={14} />
              </span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;

