import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaTrophy, FaAward, FaMedal } from 'react-icons/fa';
import ImagePopup from './ImagePopup';

const AchievementsSection = ({ achievements }) => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return (
    <section id="achievements" className="relative py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Section badge */}
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-medium backdrop-blur-sm">
              🏆 Milestones
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Notable{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
              Achievements
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Recognition and accomplishments that mark my journey in technology
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mt-8 mx-auto w-32 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Achievements Grid */}
        <div className="space-y-8">
          {achievements && achievements.length > 0 ? (
            achievements.map((achievement, index) => {
              const icons = [FaTrophy, FaAward, FaMedal];
              const Icon = icons[index % icons.length];

                return (
                  <motion.div
                    key={achievement.id}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                  >
                    {/* Single Card - No duplicate image */}
                    <motion.div
                      className="w-full max-w-2xl mx-auto group"
                    >
                      <div className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden hover:border-yellow-500/30 transition-colors">
                        {/* Animated gradient border on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-yellow-500/30 via-orange-500/30 to-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <div className="absolute inset-[2px] rounded-3xl bg-[#0a0a14] backdrop-blur-xl" />
                        </motion.div>

                        <div className="relative z-10">
                          {/* Icon and Year */}
                          <div className="flex items-center justify-between mb-6">
                            <motion.div
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg"
                            >
                              <Icon className="text-white text-2xl sm:text-3xl" />
                            </motion.div>

                            <motion.span
                              className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold shadow-lg"
                            >
                              {achievement.year}
                            </motion.span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 transition-all">
                            {achievement.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-400 mb-6 leading-relaxed text-base sm:text-lg">
                            {achievement.description}
                          </p>

                          {/* View Certificate Button */}
                          {achievement.image && (
                            <motion.button
                              onClick={() => setSelectedAchievement(achievement)}
                              className="group/btn relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold overflow-hidden border-2 border-yellow-500 text-yellow-400 hover:text-white hover:bg-yellow-500/10 transition-all"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="relative z-10 flex items-center gap-2 text-base sm:text-lg">
                                <Icon /> View Certificate
                              </span>
                            </motion.button>
                          )}
                        </div>

                        {/* Decorative glow */}
                        <motion.div
                          className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center text-gray-400 py-20">
                No achievements available
              </div>
            )}
          </div>
        </div>
      

      {/* Achievement popup */}
      {selectedAchievement && (
        <ImagePopup
          isOpen={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
          imageSrc={selectedAchievement.image}
          title={selectedAchievement.title}
        />
      )}

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
};

export default AchievementsSection;
