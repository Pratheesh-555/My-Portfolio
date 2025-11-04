import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload, FaCode } from 'react-icons/fa';

const HeroSection = ({ personalInfo }) => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 px-4">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Greeting - simplified */}
            <motion.div
              className="inline-block"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-base sm:text-lg md:text-xl font-medium">
                👋 Hello, I'm
              </span>
            </motion.div>

            {/* Name - simple fade in, no shimmer */}
            <div className="relative">
              <h1
                className="relative text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-3 sm:mb-4 text-white"
              >
                {personalInfo?.name}
              </h1>

              {/* Static underline */}
              <div
                className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              />
            </div>

            {/* Title */}
            <p
              className="text-xl md:text-2xl text-gray-300"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                {personalInfo?.title}
              </span>
            </p>

            {/* Description */}
            <p
              className="text-gray-400 text-lg max-w-xl leading-relaxed"
            >
              Crafting innovative solutions with cutting-edge technologies. 
              Passionate about building scalable applications and solving complex problems.
            </p>

            {/* CTA Buttons - reduced animations */}
            <div
              className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              {/* Contact Button */}
              <a
                href={`mailto:${personalInfo?.email}`}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold text-white overflow-hidden text-center text-sm sm:text-base transition-transform active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaEnvelope /> Get In Touch
                </span>
              </a>

              {/* Download Resume */}
              <a
                href={personalInfo?.resumeFile}
                download
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-500 rounded-full font-semibold text-white hover:bg-blue-500/10 transition-all backdrop-blur-sm text-center text-sm sm:text-base active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaFileDownload /> Resume
                </span>
              </a>
            </div>

            {/* Social Links - simpler animations */}
            <div
              className="flex gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              {personalInfo?.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-blue-400 hover:bg-white/10 transition-colors"
                >
                  <FaGithub size={18} className="sm:w-5 sm:h-5" />
                </a>
              )}
              {personalInfo?.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-blue-400 hover:bg-white/10 transition-colors"
                >
                  <FaLinkedin size={18} className="sm:w-5 sm:h-5" />
                </a>
              )}
              {personalInfo?.leetcode && (
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-amber-400 hover:bg-white/10 transition-colors"
                >
                  <FaCode size={18} className="sm:w-5 sm:h-5" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right side - Clean Profile Card - simplified */}
          <div
            className="relative flex justify-center items-center mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-md">
              {/* Glassmorphism Card */}
              <div
                className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/20 p-6 sm:p-8 shadow-2xl transition-all hover:border-white/30"
              >
                {/* Simple gradient accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Profile Image */}
                  <div
                    className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6"
                  >
                    {/* Static ring - no animation */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-75"
                    />
                    
                    {/* Image container */}
                    <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-[#0a0a14]">
                      <img
                        src={personalInfo?.profileImage}
                        alt={personalInfo?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Stats - no animations */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
                    {[
                      { label: 'Projects', value: '3+' },
                      { label: 'Experience', value: '1yr+' },
                      { label: 'Recognitions', value: '5+' },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-2 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          {stat.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-400 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
