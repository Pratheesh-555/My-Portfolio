import { useState, useEffect, useCallback } from 'react';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

export const useScrollProgress = (scrollY) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const progress = latest / (document.documentElement.scrollHeight - window.innerHeight);
      setProgress(progress);
    });
    return () => unsubscribe();
  }, [scrollY]);
  
  return progress;
};

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("home");
  
  useEffect(() => {
    const handleScroll = () => {
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
  
  return activeSection;
};

export const useConfetti = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);
  
  return [showConfetti, triggerConfetti];
};
