import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star class - simplified, no mouse tracking needed
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.speed = 0.05 + Math.random() * 0.1;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.twinkleSpeed = 0.01 + Math.random() * 0.02;
        this.twinkleOffset = Math.random() * Math.PI * 2;
      }

      update() {
        // Move stars towards viewer
        this.z -= this.speed;
        if (this.z <= 0) {
          this.reset();
        }

        // Calculate position based on perspective
        const sx = (this.x - canvas.width / 2) * (canvas.width / this.z);
        const sy = (this.y - canvas.height / 2) * (canvas.width / this.z);
        
        this.screenX = sx + canvas.width / 2;
        this.screenY = sy + canvas.height / 2;
        this.size = (1 - this.z / canvas.width) * 2.5;

        // Twinkling effect
        this.opacity = 0.5 + Math.sin(Date.now() * this.twinkleSpeed + this.twinkleOffset) * 0.5;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.arc(this.screenX, this.screenY, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle glow for larger stars
        if (this.size > 1.5) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(100, 150, 255, ${this.opacity * 0.2})`;
          ctx.arc(this.screenX, this.screenY, this.size * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Shooting Star class
    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.length = Math.random() * 80 + 20;
        this.speed = Math.random() * 8 + 4;
        this.opacity = 1;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.01;

        if (this.opacity <= 0 || this.x > canvas.width || this.y > canvas.height) {
          this.reset();
        }
      }

      draw(ctx) {
        ctx.save();
        ctx.strokeStyle = `rgba(100, 200, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();

        // Glow effect
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();
      }
    }

    // Initialize stars - reduce count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 100 : 250;
    starsRef.current = Array.from({ length: starCount }, () => new Star());
    
    // Initialize shooting stars - fewer on mobile
    const shootingStarCount = isMobile ? 2 : 3;
    shootingStarsRef.current = Array.from({ length: shootingStarCount }, () => new ShootingStar());

    // Animation loop
    const animate = () => {
      // Dark space background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, '#0a0d1a');
      gradient.addColorStop(0.5, '#050810');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      // Update and draw shooting stars
      shootingStarsRef.current.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Minimal nebula effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(100, 150, 255, 0.3) 0%, transparent 70%)',
            top: '10%',
            left: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(150, 100, 255, 0.3) 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </>
  );
};

export default AnimatedBackground;
