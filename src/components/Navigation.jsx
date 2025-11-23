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
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show navbar when scrolling up, hide when scrolling down (desktop only)
          if (window.innerWidth >= 768) {
            if (currentScrollY < lastScrollY || currentScrollY < 100) {
              setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
              setIsVisible(false);
            }
            
            // Auto-hide after 2 seconds
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current);
            }
            
            scrollTimeoutRef.current = setTimeout(() => {
              if (window.scrollY > 100) {
                setIsVisible(false);
              }
            }, 2000);
          }
          
          setLastScrollY(currentScrollY);
          
          // Simple active section detection - check only if near top
          if (currentScrollY < 100) {
            setActiveSection('hero');
          } else {
            // Simplified detection - check which section center is closest to viewport center
            const sections = navItems.map(item => item.id);
            const viewportCenter = window.innerHeight / 2;
            let closestSection = 'hero';
            let closestDistance = Infinity;
            
            for (const sectionId of sections) {
              const element = document.getElementById(sectionId);
              if (element) {
                const rect = element.getBoundingClientRect();
                const sectionCenter = rect.top + rect.height / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);
                
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestSection = sectionId;
                }
              }
            }
            
            setActiveSection(closestSection);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [lastScrollY, navItems]);

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
      {/* Mobile Bottom Navigation (visible on mobile only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom">
        <div className="backdrop-blur-xl bg-black/90 border-t border-white/20 px-1 py-2 shadow-2xl">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-all min-w-[56px] ${
                    isActive ? 'scale-105' : 'active:scale-95'
                  }`}
                >
                  {/* Active background */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse" />
                  )}

                  {/* Icon */}
                  <Icon 
                    className={`relative z-10 text-xl transition-colors ${
                      isActive ? 'text-blue-400' : 'text-gray-400'
                    }`} 
                  />
                  
                  {/* Label */}
                  <span className={`relative z-10 text-[9px] font-medium transition-colors leading-tight ${
                    isActive ? 'text-white font-semibold' : 'text-gray-500'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop Top Navigation (visible on tablet and up) */}
      <motion.nav
        className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onMouseEnter={() => setIsVisible(true)}
      >
        <div className="px-4 py-3 rounded-full backdrop-blur-2xl bg-black/40 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                    isActive ? '' : 'hover:scale-105'
                  } active:scale-95`}
                >
                  {/* Active background */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-white/20" />
                  )}

                  {/* Content */}
                  <span className={`relative z-10 flex items-center gap-2 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}>
                    <Icon className="text-base" />
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 md:h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[60]"
        style={{ 
          transform: `scaleX(${scrollProgress.get()})`,
          transformOrigin: 'left'
        }}
      />
    </>
  );
};

export default Navigation;
