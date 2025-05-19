import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation, useMotionValue, useSpring } from 'framer-motion';

export default function UltraModernPortfolio() {
  // State hooks
  const [darkMode, setDarkMode] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };
  
  // Refs
  const mainRef = useRef(null);
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

  // Enhanced animations with snappier physics
  const springConfig = { 
    stiffness: 800, 
    damping: 30, 
    mass: 0.5
  };

  const buttonSpring = { 
    type: "spring", 
    stiffness: 1000,
    damping: 30,
    mass: 0.2,
    restSpeed: 0.2
  };

  const cardSpring = { 
    type: "spring", 
    stiffness: 800, 
    damping: 35,
    mass: 0.4
  };

  // Button hover configuration
  const buttonHover = {
    whileHover: { 
      scale: 1.05, 
      y: -2,
      transition: { 
        type: "spring",
        stiffness: 800,
        damping: 15,
        mass: 0.2,
        velocity: 2
      }
    },
    whileTap: { 
      scale: 0.98,
      transition: { 
        type: "spring",
        stiffness: 1000,
        damping: 15,
        mass: 0.1
      }
    }
  };

  // Magnetic effect configuration
  const magneticConfig = {
    strength: 25,
    transition: {
      type: "spring",
      stiffness: 900,
      damping: 30,
      mass: 0.2
    }
  };

  const magneticStrength = 0.35;  // Increased from 0.2 for more responsive movement

  // Responsive animations with enhanced transitions
  const mobileAnimations = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const desktopAnimations = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const fadeInUp = isMobile ? mobileAnimations : desktopAnimations;

  // Enhanced stagger container with fluid animations
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.1 : 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Improved card hover with dynamic effects
  const cardHover = {
    rest: { 
      scale: 1,
      y: 0,
      transition: cardSpring
    },
    hover: { 
      scale: isMobile ? 1.02 : 1.04,
      y: isMobile ? -8 : -12,
      transition: {
        ...cardSpring,
        stiffness: 400,
        damping: 10
      }
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
    const x = (event.clientX - rect.left - rect.width / 2) * magneticStrength;
    const y = (event.clientY - rect.top - rect.height / 2) * magneticStrength;
    
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

  // Enhanced cursor variants with better performance
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
      height: isMobile ? 36 : 48,
      width: isMobile ? 36 : 48,
      x: cursorX,
      y: cursorY,
      backgroundColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
      mixBlendMode: "difference",
      transition: buttonSpring
    },
    button: {
      height: isMobile ? 48 : 64,
      width: isMobile ? 48 : 64,
      x: cursorX,
      y: cursorY,
      backgroundColor: darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
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
    tools: ['Git', 'GitHub', 'APIs']
  };

  const projects = [
    {
      title: "Mental Wellness AI",
      description: "AI-powered mental wellness support platform with real-time analysis",
      tech: "React · Node.js · AI · TensorFlow",
      link: "https://mental-wellness-xi.vercel.app/",
      image: "https://img.freepik.com/free-vector/mental-health-awareness-concept_23-2148514654.jpg",
      requiresAuth: true
    },
    {
      title: "AttendeAze",
      description: "QR-based attendance management system",
      tech: "React · Node.js · QR Technology",
      link: "https://attendeaze.netlify.app/",
      image: "https://img.freepik.com/free-vector/qr-code-concept-illustration_114360-5853.jpg",
      requiresAuth: true
    },
    {
      title: "Stress Analyzer",
      description: "AI-powered stress analysis platform using facial recognition",
      tech: "React · Node.js · Express.js · AI",
      link: "#",
      image: "https://img.freepik.com/free-vector/facial-recognition-concept-illustration_114360-7072.jpg",
      requiresAuth: false
    }
  ];

  const handleProjectClick = (project) => {
    if (project.requiresAuth && !isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    window.open(project.link, '_blank');
  };

  const handleAuthentication = () => {
    if (password === '555') {
      setIsAuthenticated(true);
      setShowAuthDialog(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

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
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen font-sans relative overflow-hidden`}>
      {/* Custom Cursor - Only show on non-touch devices */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
          variants={cursorVariants}
          animate={cursorVariant}
          ref={cursorRef}
        />
      )}
        {/* Optimized Animated Background - Reduce particles on mobile */}      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Classic Wave Effect */}
        <svg className="absolute bottom-0 left-0 w-full opacity-20" 
          viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path
            initial={{ d: "M0,320L1440,320" }}
            animate={{
              d: [
                "M0,320L48,304C96,288,192,256,288,240C384,224,480,224,576,213.3C672,203,768,181,864,181.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,320L48,304C96,288,192,256,288,229.3C384,203,480,181,576,181.3C672,181,768,203,864,213.3C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 8,
              ease: "easeInOut"
            }}
            fill={darkMode ? "#1f2937" : "#f3f4f6"}
          />
        </svg>
        
        {/* Optimized Particles */}
        {Array.from({ length: isMobile ? 10 : 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.3 + 0.2
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
              duration: isMobile ? Math.random() * 2 + 4 : Math.random() * 3 + 5,
              repeat: Infinity,
              ease: [0.43, 0.13, 0.23, 0.96],
              repeatType: "mirror"
            }}
          />
        ))}
      </div>
      
      {/* Navigation with improved mobile experience */}
      <motion.nav 
        className={`fixed w-full z-50 ${darkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`font-bold text-lg md:text-xl ${darkMode ? 'text-white' : 'text-black'}`}
            >
              portfolio.
            </motion.div>
            
            {/* Desktop Menu with improved animations */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm lg:text-base font-medium transition duration-300 ${
                    activeSection === item.toLowerCase() 
                      ? darkMode ? 'text-white' : 'text-black' 
                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                  {...buttonHover}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                {...buttonHover}
                onClick={() => setDarkMode(!darkMode)}
                className={`rounded-full p-2 md:p-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
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
              
              {/* Improved mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  {...buttonHover}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`text-gray-300 focus:outline-none p-2 rounded-lg ${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced mobile menu with smooth animations */}
        {isMenuOpen && (
          <motion.div 
            className={`md:hidden ${darkMode ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-xl`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left py-3 px-4 rounded-xl ${
                    activeSection === item.toLowerCase()
                      ? darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
                      : darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  {...buttonHover}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>      {/* Optimized scroll progress indicator */}
      <motion.div
        className={`fixed top-0 left-0 h-1 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} z-50`}
        style={{ 
          transformOrigin: "0% 50%",
          width: "100%",
          scaleX: scrollProgress
        }}
      />

      {/* Hero Section */}
      <section id="home" className="pt-28 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <motion.div              className="w-40 h-40 md:w-48 md:h-48 mb-8 rounded-full relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated gradient border */}
              <motion.div 
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  backgroundImage: darkMode ? 
                    "linear-gradient(90deg, #fff, #6e6e73, #fff, #fff, #6e6e73, #fff)" : 
                    "linear-gradient(90deg, #1d1d1f, #6e6e73, #1d1d1f, #1d1d1f, #6e6e73, #1d1d1f)",
                  backgroundSize: "200% 100%"
                }}
                animate={{ 
                  backgroundPosition: ["0% center", "200% center"]
                }}
                transition={{ 
                  duration: 15, 
                  ease: "linear", 
                  repeat: Infinity,
                }}
              />
              
              {/* Photo container */}
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <img
                  src="profile.jpg"
                  alt="Pratheesh Krishnan"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>            <motion.h1 
              className="text-4xl md:text-7xl font-bold mb-4 tracking-tight"              animate={{ 
                backgroundPosition: ["0% center", "200% center"]
              }}
              transition={{ 
                duration: 15, 
                ease: "linear", 
                repeat: Infinity,
              }}
              style={{
                backgroundImage: darkMode ? 
                  "linear-gradient(90deg, #fff, #6e6e73, #fff, #fff, #6e6e73, #fff)" : 
                  "linear-gradient(90deg, #1d1d1f, #6e6e73, #1d1d1f, #1d1d1f, #6e6e73, #1d1d1f)",
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
            </motion.p>            <motion.div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="https://github.com/Pratheesh-555"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 group
                ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/pratheesh-krishnan-30b08a282"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section with improved responsiveness */}
      <section id="skills" className={`py-16 md:py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-12 md:mb-16 text-center"
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
              className="h-1 w-20 md:w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: isMobile ? 80 : 96 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                initial="rest"
                animate="rest"
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-4 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <motion.span
                      key={skill}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        darkMode ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600'
                      }`}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
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

      {/* Projects Section with enhanced mobile experience */}
      <section id="projects" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-12 md:mb-16 text-center"
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
              className="h-1 w-20 md:w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: isMobile ? 80 : 96 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer
                  ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                variants={fadeInUp}
                whileHover={cardHover.hover}
                initial="rest"
                animate="rest"
                viewport={{ once: true }}
                onClick={() => handleProjectClick(project)}
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
                    alt={project.title}
                    loading="lazy"
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
                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{project.title}</h3>
                  <p className={`mb-4 text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <p className="text-sm font-medium text-blue-500">{project.tech}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Authentication Dialog */}
        {showAuthDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-2xl shadow-xl max-w-md w-full mx-4`}
            >
              <h3 className="text-xl font-bold mb-4">Enter Password</h3>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg mb-4 ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
                }`}
                placeholder="Enter password"
                onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowAuthDialog(false);
                    setPassword('');
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAuthentication}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* Achievements Section */}
      <section id="achievements" className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px", amount: 0.3 }}
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
              {...buttonHover}
              variants={fadeInUp}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} relative`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <motion.p 
            className={darkMode ? 'text-gray-400' : 'text-gray-600'}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Pratheesh Krishnan. All rights reserved.
          </motion.p>
          
          <motion.button
            className={`mt-4 p-3 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} hover:scale-110 transition-transform`}
            onClick={triggerConfetti}
            whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </motion.button>
        </div>

        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500'][Math.floor(Math.random() * 4)]
                }`}
                initial={{ 
                  top: "-10%",
                  left: `${Math.random() * 100}%`,
                  scale: 0
                }}
                animate={{
                  top: "110%",
                  scale: [0, 1, 1, 0.5, 0],
                  x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: Math.random() * 0.5
                }}
              />
            ))}
          </div>
        )}
      </footer>
    </div>
  );
}