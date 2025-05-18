import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion';

export default function AppleInspiredPortfolio() {
  // State hooks
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // Refs
  const cursorRef = useRef(null);
  const buttonRefs = useRef([]);
  
  // Animation hooks and responsive setup
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 500, damping: 50 });
  const scrollProgress = useSpring(0);
  
  // Update scroll progress
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const progress = latest / (document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress.set(progress);
    });
    return () => unsubscribe();
  }, [scrollY, scrollProgress]);

  // Handle responsive state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced animations with Apple-like spring physics
  const appleSpringConfig = { stiffness: 300, damping: 30, mass: 0.8 };
  const buttonSpring = { type: "spring", ...appleSpringConfig };
  const cardSpring = { type: "spring", stiffness: 250, damping: 25 };

  // Responsive animations based on device
  const mobileAnimations = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const desktopAnimations = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const fadeInUp = isMobile ? mobileAnimations : desktopAnimations;

  // Enhanced stagger container with Apple-like timing
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.08,
        delayChildren: isMobile ? 0.1 : 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Improved card hover with Apple-like subtlety
  const cardHover = {
    rest: { 
      scale: 1,
      transition: cardSpring
    },
    hover: { 
      scale: isMobile ? 1.01 : 1.02,
      y: isMobile ? -3 : -5,
      transition: cardSpring
    }
  };
  
  // Magnetic effect for buttons with useRef array
  const updateButtonRefs = (element, index) => {
    if (element && !buttonRefs.current[index]) {
      buttonRefs.current[index] = element;
    }
  };

  const handleMagneticMove = (event, index) => {
    if (isMobile) return;
    const button = buttonRefs.current[index];
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.15; // Reduced for subtlety
    const y = (event.clientY - rect.top - rect.height / 2) * 0.15;
    
    button.style.transform = `translate(${x}px, ${y}px)`;
    setCursorVariant("button");
  };

  const handleMagneticLeave = (index) => {
    if (isMobile) return;
    const button = buttonRefs.current[index];
    if (!button) return;
    
    button.style.transform = `translate(0px, 0px)`;
    setCursorVariant("default");
  };

  // Enhanced cursor variants with Apple-like subtlety
  const cursorVariants = {
    default: {
      height: isMobile ? 24 : 32,
      width: isMobile ? 24 : 32,
      x: cursorX,
      y: cursorY,
      backgroundColor: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      mixBlendMode: "difference",
      transition: buttonSpring
    },
    text: {
      height: isMobile ? 32 : 40,
      width: isMobile ? 32 : 40,
      x: cursorX,
      y: cursorY,
      backgroundColor: darkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
      mixBlendMode: "difference",
      transition: buttonSpring
    },
    button: {
      height: isMobile ? 42 : 56,
      width: isMobile ? 42 : 56,
      x: cursorX,
      y: cursorY,
      backgroundColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
      mixBlendMode: "difference",
      transition: buttonSpring
    }
  };

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Update cursor variant based on target element
      const target = e.target;
      if (target.tagName === "BUTTON" || target.tagName === "A") {
        setCursorVariant("button");
      } else if (target.tagName === "P" || target.tagName === "H1" || target.tagName === "H2" || target.tagName === "H3") {
        setCursorVariant("text");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleScroll = () => {
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
      description: "AI-powered stress analysis platform using facial recognition technology to help users monitor and manage their emotional wellbeing.",
      tech: "React · Node.js · Express.js · AI",
      link: "#"
    },
    {
      title: "Mental Wellness Platform",
      description: "AI-driven mental wellness support system that provides personalized insights and guidance for better mental health management.",
      tech: "React · Node.js · AI APIs",
      link: "#"
    },
    {
      title: "Glacier Analysis",
      description: "GLOF analysis using Landsat satellite data to monitor glacial lakes and predict potential outburst floods for early warning systems.",
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
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen font-sans relative overflow-hidden antialiased`}>
      {/* Custom Cursor - Only show on non-touch devices */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 backdrop-blur-sm"
          variants={cursorVariants}
          animate={cursorVariant}
          ref={cursorRef}
        />
      )}
      
      {/* Apple-inspired subtle particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: isMobile ? 8 : 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              darkMode ? 'bg-gray-700/30' : 'bg-gray-200/40'
            }`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.2 + 0.1 // More subtle opacity
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ]
            }}
            transition={{
              duration: isMobile ? Math.random() * 8 + 20 : Math.random() * 15 + 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Navigation with Apple-inspired design */}
      <motion.nav 
        className={`fixed w-full z-50 ${darkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-2xl`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`font-medium text-lg md:text-xl ${darkMode ? 'text-white' : 'text-black'}`}
              style={{ letterSpacing: '-0.02em' }} // Apple-like tight spacing
            >
              pratheesh.
            </motion.div>
            
            {/* Desktop Menu with Apple-inspired spacing and transitions */}
            <div className="hidden md:flex space-x-8 lg:space-x-10">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm lg:text-base font-medium transition duration-300 ${
                    activeSection === item.toLowerCase() 
                      ? darkMode ? 'text-white' : 'text-black' 
                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
                  }`}
                  style={{ letterSpacing: '-0.01em' }} // Apple-like tight spacing
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={buttonSpring}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={buttonSpring}
                onClick={() => setDarkMode(!darkMode)}
                className={`rounded-full p-2 md:p-3 ${darkMode ? 'bg-gray-800/70 text-white' : 'bg-gray-100/70 text-black'} backdrop-blur-lg`}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>
              
              {/* Apple-inspired mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  transition={buttonSpring}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`focus:outline-none p-2 rounded-lg ${
                    darkMode ? 'hover:bg-gray-800/70' : 'hover:bg-gray-100/70'
                  } backdrop-blur-lg`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced mobile menu with Apple-like transitions */}
        {isMenuOpen && (
          <motion.div 
            className={`md:hidden ${darkMode ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-xl`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="px-6 py-5 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left py-3 px-4 rounded-xl ${
                    activeSection === item.toLowerCase()
                      ? darkMode ? 'bg-gray-800/80 text-white' : 'bg-gray-100/80 text-black'
                      : darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  whileTap={{ scale: 0.98 }}
                  transition={buttonSpring}
                  style={{ letterSpacing: '-0.01em' }} // Apple-like tight spacing
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
      
      {/* Optimized scroll progress indicator - Apple-style subtle */}
      <motion.div
        className={`fixed top-0 left-0 h-0.5 ${darkMode ? 'bg-white/20' : 'bg-black/10'} z-50`}
        style={{ 
          transformOrigin: "0% 50%",
          width: "100%",
          scaleX: scrollProgress
        }}
      />

      {/* Hero Section - Apple-inspired minimalism */}
      <section id="home" className="pt-32 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-medium mb-4 tracking-tight"
              animate={{ 
                backgroundPosition: ["0% center", "100% center"],
                backgroundSize: ["100% 100%", "200% 100%"] 
              }}
              transition={{ 
                duration: 10, 
                ease: "linear", 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              style={{
                backgroundImage: darkMode ? 
                  "linear-gradient(90deg, #fff, #a2a2a7, #fff)" : 
                  "linear-gradient(90deg, #1d1d1f, #86868b, #1d1d1f)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 100%",
                letterSpacing: '-0.03em' // Apple-like tight spacing
              }}
            >
              Hi, I'm Pratheesh Krishnan
            </motion.h1>
            
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-full my-8"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
            
            <motion.p 
              className="text-xl md:text-2xl max-w-2xl mb-12"
              variants={fadeInUp}
              style={{ letterSpacing: '-0.02em', lineHeight: 1.4 }} // Apple-like typography
            >
              B.Tech Computer Science Student at SASTRA University
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                ref={(el) => updateButtonRefs(el, 0)}
                href="https://github.com/Pratheesh-555"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-full font-medium transition-all 
                ${darkMode ? 
                  'bg-white text-black hover:bg-gray-100' : 
                  'bg-black text-white hover:bg-gray-900'}`}
                style={{ letterSpacing: '-0.01em' }} // Apple-like tight spacing
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseMove={(e) => handleMagneticMove(e, 0)}
                onMouseLeave={() => handleMagneticLeave(0)}
              >
                GitHub
              </motion.a>
              <motion.a
                ref={(el) => updateButtonRefs(el, 1)}
                href="https://www.linkedin.com/in/pratheesh-krishnan-30b08a282"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
                style={{ letterSpacing: '-0.01em' }} // Apple-like tight spacing
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseMove={(e) => handleMagneticMove(e, 1)}
                onMouseLeave={() => handleMagneticLeave(1)}
              >
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section with Apple-inspired cards */}
      <section id="skills" className={`py-20 md:py-28 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-16 md:mb-20 text-center"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-medium mb-4"
              style={{ letterSpacing: '-0.02em' }} // Apple-like tight spacing
              animate={{ 
                color: darkMode ? 
                  ["#ffffff", "#a2a2a7", "#ffffff"] : 
                  ["#1d1d1f", "#86868b", "#1d1d1f"] 
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Technical Arsenal
            </motion.h2>
            <motion.div
              className="h-px w-16 md:w-20 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: isMobile ? 64 : 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                className={`rounded-2xl p-6 ${
                  darkMode ? 'bg-gray-900/60' : 'bg-white/60'
                } backdrop-blur-lg shadow-sm border ${
                  darkMode ? 'border-gray-800' : 'border-gray-100'
                } hover:shadow-md transition-shadow duration-300`}
                variants={fadeInUp}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
                }}
                initial="rest"
                animate="rest"
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-xl font-medium mb-4 capitalize" style={{ letterSpacing: '-0.01em' }}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <motion.span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode ? 'bg-gray-800/80 text-blue-300' : 'bg-gray-100/80 text-blue-600'
                      }`}
                      whileHover={{ 
                        scale: 1.03,
                        y: -1,
                        transition: buttonSpring
                      }}
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

      {/* Projects Section with Apple-inspired cards */}
      <section id="projects" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-16 md:mb-20 text-center"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-medium mb-4"
              style={{ letterSpacing: '-0.02em' }} // Apple-like tight spacing
              animate={{ 
                color: darkMode ? 
                  ["#ffffff", "#a2a2a7", "#ffffff"] : 
                  ["#1d1d1f", "#86868b", "#1d1d1f"] 
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              className="h-px w-16 md:w-20 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: isMobile ? 64 : 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border ${
                  darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-100 bg-white/50'
                } backdrop-blur-sm`}
                variants={fadeInUp}
                whileHover={cardHover.hover}
                initial="rest"
                animate="rest"
                viewport={{ once: true }}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translate3d(0, 0, 0)",
                  WebkitTransform: "translate3d(0, 0, 0)"
                }}
              >
                <div className={`h-36 md:h-40 relative overflow-hidden ${
                  index % 3 === 0 ? 'bg-gradient-to-br from-blue-500/90 to-purple-600/90' :
                  index % 3 === 1 ? 'bg-gradient-to-br from-emerald-500/90 to-blue-600/90' :
                  'bg-gradient-to-br from-amber-500/90 to-rose-600/90'
                }`}>
                  <motion.div
                    className="absolute inset-0 backdrop-blur-[1px]"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
                    }}
                  />
                </div>
                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <h3 className="text-xl md:text-2xl font-medium mb-3" style={{ letterSpacing: '-0.01em' }}>
                    {project.title}
                  </h3>
                  <p className={`mb-4 text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <p className="text-sm font-medium text-blue-500">{project.tech}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-medium mb-4"
              animate={{ 
                color: darkMode ? 
                  ["#ffffff", "#a2a2a7", "#ffffff"] : 
                  ["#1d1d1f", "#86868b", "#1d1d1f"] 
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Achievements
            </motion.h2>
            <motion.div
              className="h-px w-16 md:w-20 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-medium mb-4"
              animate={{ 
                color: darkMode ? 
                  ["#ffffff", "#a2a2a7", "#ffffff"] : 
                  ["#1d1d1f", "#86868b", "#1d1d1f"] 
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Let's Connect
            </motion.h2>
            <motion.div
              className="h-px w-16 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-full mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
        <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
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
