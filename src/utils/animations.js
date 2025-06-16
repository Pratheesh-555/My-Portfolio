// Common animation configurations
export const SPRING_CONFIG = { stiffness: 800, damping: 30, mass: 0.5 };
export const BUTTON_SPRING = { type: "spring", stiffness: 1000, damping: 30, mass: 0.2, restSpeed: 0.2 };
export const CARD_SPRING = { type: "spring", stiffness: 800, damping: 35, mass: 0.4 };

export const fadeInUp = (isMobile) => ({
  hidden: { 
    opacity: 0, 
    y: isMobile ? 20 : 30, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: isMobile ? 0.5 : 0.7,
      ease: isMobile ? [0.25, 0.1, 0.25, 1] : [0.22, 1, 0.36, 1]
    }
  }
});

export const staggerContainer = (isMobile) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isMobile ? 0.1 : 0.15,
      delayChildren: isMobile ? 0.1 : 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
});

export const cardHover = (isMobile, cardSpring) => ({
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
});

export const buttonHover = {
  whileHover: { 
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
    y: 1,
    transition: { 
      type: "spring",
      stiffness: 1000,
      damping: 15,
      mass: 0.1
    }
  }
};
