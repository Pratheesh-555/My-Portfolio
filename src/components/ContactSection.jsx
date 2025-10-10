import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';

const ContactSection = ({ personalInfo }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${personalInfo?.email}?subject=Contact from Portfolio&body=${message}`;
  };

  return (
    <section id="contact" className="relative py-12 sm:py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          {/* Section badge */}
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium backdrop-blur-sm">
              📧 Get in Touch
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
              Work Together
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind or just want to chat? I'm always open to new opportunities and collaborations.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mt-8 mx-auto w-32 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-start">
          {/* Left side - Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Email */}
            <motion.a
              href={`mailto:${personalInfo?.email}`}
              className="group flex items-center gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.02, x: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm text-gray-400 mb-1">Email Me</h3>
                <p className="text-white font-medium group-hover:text-green-400 transition-colors">
                  {personalInfo?.email}
                </p>
              </div>
            </motion.a>

            {/* GitHub */}
            {personalInfo?.github && (
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.02, x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <FaGithub className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-gray-400 mb-1">GitHub</h3>
                  <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                    @{personalInfo.github.split('/').pop()}
                  </p>
                </div>
              </motion.a>
            )}

            {/* LinkedIn */}
            {personalInfo?.linkedin && (
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.02, x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <FaLinkedin className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-gray-400 mb-1">LinkedIn</h3>
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                    Connect with me
                  </p>
                </div>
              </motion.a>
            )}

            {/* LeetCode */}
            {personalInfo?.leetcode && (
              <motion.a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.02, x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <FaGithub className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-gray-400 mb-1">LeetCode</h3>
                  <p className="text-white font-medium group-hover:text-amber-400 transition-colors">
                    View my solutions
                  </p>
                </div>
              </motion.a>
            )}
          </motion.div>

          {/* Right side - Quick Message */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-[2px] rounded-2xl bg-[#0a0a14] backdrop-blur-xl" />
            </motion.div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    rows={4}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 group overflow-hidden relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-green-500"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Availability Status */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-sm">
            <motion.div
              className="w-3 h-3 rounded-full bg-green-400"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-green-400 font-medium">Available for new opportunities</span>
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
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

export default ContactSection;
