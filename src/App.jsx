import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AppleInspiredPortfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Determine active section
      const sections = ["home", "skills", "projects", "achievements", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 300 && rect.bottom >= 300;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    programming: ['C', 'C++', 'Java'],
    webDev: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Express.js', 'Node.js'],
    tools: ['Git', 'GitHub', 'APIs'],
    languages: ['Tamil', 'English', 'Telugu', 'Hindi', 'German']
  };

  const projects = [
    {
      title: "Stress Analyzer",
      description: "AI-powered stress analysis platform using facial recognition",
      tech: "React · Node.js · Express.js · AI",
      link: "#"
    },
    {
      title: "Mental Wellness Platform",
      description: "AI-driven mental wellness support system",
      tech: "React · Node.js · AI APIs",
      link: "#"
    },
    {
      title: "Glacier Analysis",
      description: "GLOF analysis using Landsat satellite data",
      tech: "Python · GIS · NDWI",
      link: "#"
    }
  ];

  const achievements = [
    "DAKSH AI Hackathon 2nd Place (2025)",
    "Smart India Hackathon College-Level Selection (2024)",
    "PayPal Career Academy Student",
    "Best Student Award (Twice)"
  ];

  const navItems = ["Home", "Skills", "Projects", "Achievements", "Contact"];
  
  // Apple-inspired animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardHover = {
    rest: { scale: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    hover: { scale: 1.02, transition: { duration: 0.2, ease: "easeInOut" } }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen font-sans`}>
      {/* Navigation - Apple style with blur effect */}
      <motion.nav 
        className={`fixed w-full z-50 ${darkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-black'}`}
            >
              portfolio.
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition duration-300 ${
                    activeSection === item.toLowerCase() 
                      ? darkMode ? 'text-white' : 'text-black' 
                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`rounded-full p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            className={`md:hidden ${darkMode ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-xl`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left py-2 px-3 rounded-lg ${
                    activeSection === item.toLowerCase()
                      ? darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
                      : darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-28 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl md:text-7xl font-bold mb-4 tracking-tight"
              animate={{ 
                backgroundPosition: ["0% center", "100% center"],
                backgroundSize: ["100% 100%", "200% 100%"] 
              }}
              transition={{ 
                duration: 8, 
                ease: "linear", 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              style={{
                backgroundImage: darkMode ? 
                  "linear-gradient(90deg, #fff, #6e6e73, #fff)" : 
                  "linear-gradient(90deg, #1d1d1f, #6e6e73, #1d1d1f)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 100%"
              }}
            >
              Hi, I'm Pratheesh Krishnan
            </motion.h1>
            
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full my-8"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            
            <motion.p 
              className="text-xl md:text-2xl max-w-2xl mb-12"
              variants={fadeInUp}
            >
              B.Tech Computer Science Student at SASTRA University
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="https://github.com/Pratheesh-555"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-full font-medium transition-all 
                ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                GitHub
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/pratheesh-krishnan-30b08a282"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-4"
              animate={{ 
                color: darkMode ? 
                  ["#ffffff", "#a2aaad", "#ffffff"] : 
                  ["#000000", "#6e6e73", "#000000"] 
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Technical Arsenal
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {Object.entries(skills).map(([category, items]) => (
              <motion.div
                key={category}
                className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <motion.span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-4"
              animate={{ 
                color: darkMode ? 
                  ["#ffffff", "#a2aaad", "#ffffff"] : 
                  ["#000000", "#6e6e73", "#000000"] 
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                variants={fadeInUp}
                whileHover={cardHover.hover}
                initial="rest"
                animate="rest"
                viewport={{ once: true }}
              >
                <div className={`h-48 ${
                  index % 3 === 0 ? 'bg-gradient-to-br from-blue-500 to-purple-600' :
                  index % 3 === 1 ? 'bg-gradient-to-br from-emerald-500 to-blue-600' :
                  'bg-gradient-to-br from-amber-500 to-rose-600'
                }`}>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <p className="text-sm font-medium text-blue-500">{project.tech}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-4"
              animate={{ 
                color: darkMode ? 
                  ["#ffffff", "#a2aaad", "#ffffff"] : 
                  ["#000000", "#6e6e73", "#000000"] 
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Achievements
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className={`mb-6 rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center">
                  <div className={`mr-4 h-12 w-12 flex items-center justify-center rounded-full ${
                    darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium">{achievement}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-4"
              animate={{ 
                color: darkMode ? 
                  ["#ffffff", "#a2aaad", "#ffffff"] : 
                  ["#000000", "#6e6e73", "#000000"] 
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Let's Connect
            </motion.h2>
            <motion.div
              className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            
            <motion.p 
              className="text-xl mb-10"
              variants={fadeInUp}
            >
              Available for interesting projects and collaborations.
            </motion.p>

            <motion.a
              href="mailto:pratheeshkrishnan595@gmail.com"
              className={`inline-block px-8 py-4 rounded-full text-lg font-medium 
              ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}
              transition-all shadow-lg`}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.98 }}
              variants={fadeInUp}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <motion.p 
            className={darkMode ? 'text-gray-400' : 'text-gray-600'}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Pratheesh Krishnan. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}