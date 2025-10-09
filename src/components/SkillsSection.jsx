import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNode, FaDatabase 
} from 'react-icons/fa';
import { 
  SiCplusplus, SiC, SiExpress, SiMongodb, SiMysql, SiPostgresql 
} from 'react-icons/si';

const iconMap = {
  'Python': FaPython,
  'Java': FaJava,
  'C++': SiCplusplus,
  'C': SiC,
  'HTML': FaHtml5,
  'CSS': FaCss3Alt,
  'JavaScript': FaJs,
  'React.js': FaReact,
  'Express.js': SiExpress,
  'Node.js': FaNode,
  'MongoDB': SiMongodb,
  'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql,
};

const colorMap = {
  'Python': { color: '#3776ab', glow: '#ffd343' },
  'Java': { color: '#f89820', glow: '#5382a1' },
  'C++': { color: '#00599c', glow: '#659ad2' },
  'C': { color: '#a8b9cc', glow: '#5c6bc0' },
  'HTML': { color: '#e34f26', glow: '#f06529' },
  'CSS': { color: '#1572b6', glow: '#33a9dc' },
  'JavaScript': { color: '#f7df1e', glow: '#f0db4f' },
  'React.js': { color: '#61dafb', glow: '#21a1c4' },
  'Express.js': { color: '#ffffff', glow: '#68a063' },
  'Node.js': { color: '#339933', glow: '#66cc66' },
  'MongoDB': { color: '#47a248', glow: '#4db33d' },
  'MySQL': { color: '#00758f', glow: '#f29111' },
  'PostgreSQL': { color: '#336791', glow: '#699cc7' },
};

const SkillsSection = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <section id="skills" className="relative py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Skills &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Technologies
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Technologies I work with to build amazing products
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {skills && skills.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Compact Pill Layout */}
        {skills && skills[selectedCategory] && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto"
          >
            {skills[selectedCategory].items.map((skill, index) => {
              const Icon = iconMap[skill.name] || FaDatabase;
              const colors = colorMap[skill.name] || { color: '#3b82f6', glow: '#8b5cf6' };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ y: -2 }}
                  className="group relative"
                >
                  <div 
                    className="relative px-5 py-3 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg flex items-center gap-3 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:bg-white/10"
                    style={{
                      boxShadow: `0 0 20px ${colors.glow}10`,
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="text-xl sm:text-2xl transition-transform duration-300"
                      style={{ color: colors.color }}
                    >
                      <Icon />
                    </motion.div>

                    {/* Skill Name */}
                    <span className="text-white text-sm font-medium whitespace-nowrap">
                      {skill.name}
                    </span>

                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${colors.glow}15, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Floating Tech Names Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          {skills && skills[selectedCategory] && skills[selectedCategory].items.slice(0, 6).map((skill, index) => (
            <motion.div
              key={index}
              className="absolute text-6xl md:text-8xl font-bold text-white"
              style={{
                left: `${(index * 20) % 80}%`,
                top: `${(index * 30) % 70}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.03, 0.08, 0.03],
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {skill.name}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
};

export default SkillsSection;

