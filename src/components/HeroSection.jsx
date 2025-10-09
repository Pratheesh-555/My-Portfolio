import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaCode } from 'react-icons/fa';
import { useState } from 'react';

const HeroSection = ({ personalInfo }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Greeting - simplified */}
            <motion.div
              className="inline-block"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-lg md:text-xl font-medium">
                👋 Hello, I'm
              </span>
            </motion.div>

            {/* Name with animated shimmer effect */}
            <div className="relative">
              <motion.h1
                className="relative text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  animate={{
                    backgroundPosition: ['-200% 0', '200% 0'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    background: 'linear-gradient(110deg, #ffffff 0%, #ffffff 45%, rgba(200,200,200,0.8) 50%, #ffffff 55%, #ffffff 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {personalInfo?.name}
                </motion.div>
              </motion.h1>

              {/* Animated underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </div>

            {/* Title with typing effect */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                {personalInfo?.title}
              </span>
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-gray-400 text-lg max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Crafting innovative solutions with cutting-edge technologies. 
              Passionate about building scalable applications and solving complex problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Contact Button */}
              <motion.a
                href={`mailto:${personalInfo?.email}`}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaEnvelope /> Get In Touch
                </span>
              </motion.a>

              {/* Download Resume */}
              <motion.a
                href={personalInfo?.resumeFile}
                download
                className="group px-8 py-4 border-2 border-blue-500 rounded-full font-semibold text-white hover:bg-blue-500/10 transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  <FaFileDownload /> Resume
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {personalInfo?.github && (
                <motion.a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaGithub size={18} className="sm:w-5 sm:h-5" />
                </motion.a>
              )}
              {personalInfo?.linkedin && (
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaLinkedin size={18} className="sm:w-5 sm:h-5" />
                </motion.a>
              )}
              {personalInfo?.leetcode && (
                <motion.a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-amber-400 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <FaCode size={18} className="sm:w-5 sm:h-5" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right side - Clean Profile Card */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div className="relative w-full max-w-md">
              {/* Glassmorphism Card */}
              <motion.div
                className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/20 p-8 shadow-2xl"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {/* Simple gradient accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Profile Image */}
                  <motion.div
                    className="relative w-48 h-48 mx-auto mb-6"
                  >
                    {/* Simple rotating ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    {/* Image container */}
                    <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-[#0a0a14]">
                      <img
                        src={personalInfo?.profileImage}
                        alt={personalInfo?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[
                      { label: 'Projects', value: '3+' },
                      { label: 'Experience', value: '1yr+' },
                      { label: 'Recognitions', value: '5+' },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
