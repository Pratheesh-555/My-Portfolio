import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaHome, FaLaptopCode, FaBrain, FaTrophy, FaEnvelope } from 'react-icons/fa';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef(null);

  const { scrollY } = useScroll();
  const scrollProgress = useTransform(
    scrollY, 
    [0, document.documentElement.scrollHeight - window.innerHeight], 
    [0, 1]
  );

  const navItems = [
    { id: 'hero', label: 'Home', icon: FaHome },
    { id: 'projects', label: 'Projects', icon: FaLaptopCode },
    { id: 'skills', label: 'Skills', icon: FaBrain },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy },
    { id: 'contact', label: 'Contact', icon: FaEnvelope },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
      
      // Show navbar while scrolling, hide after 2 seconds of no scrolling
      setIsVisible(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        if (window.scrollY > 100) {
          setIsVisible(false);
        }
      }, 2000);
      
      // Active section detection
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // If at the very top (first 100px), always set to hero
      if (scrollPosition < 100) {
        setActiveSection('hero');
        return;
      }
      
      // Find which section is currently most visible
      let maxVisibility = 0;
      let mostVisibleSection = 'hero';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          // Calculate visibility ratio
          const sectionHeight = rect.height;
          const visibilityRatio = visibleHeight / Math.min(sectionHeight, windowHeight);
          
          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisibleSection = sectionId;
          }
        }
      }
      
      setActiveSection(mostVisibleSection);
    };

    // Run immediately on mount and scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also check on resize
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* TOP CENTER Navigation - Mobile Optimized */}
      <motion.nav
        className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto max-w-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onMouseEnter={() => setIsVisible(true)}
      >
        <motion.div
          className="px-2 sm:px-4 py-2 sm:py-3 rounded-full backdrop-blur-2xl bg-black/60 sm:bg-black/40 border border-white/20 sm:border-white/10 shadow-2xl"
          whileHover={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)' }}
        >
          <div className="flex items-center justify-between sm:gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-2 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all group flex-1 sm:flex-initial"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Active background */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/20 sm:bg-white/20"
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Content */}
                  <span className={`relative z-10 flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}>
                    <Icon className="text-sm sm:text-base" />
                    <span className="text-[10px] sm:text-sm hidden xs:inline">{item.label}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.nav>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 sm:h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ scaleX: scrollProgress }}
      />
    </>
  );
};

export default Navigation;
