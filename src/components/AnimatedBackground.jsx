import { memo } from 'react';

const AnimatedBackground = memo(() => {
  return (
    <>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a0d1a] via-[#050810] to-[#000000]" />
      <div 
        className="fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(2px 2px at 20% 30%, white, transparent), radial-gradient(2px 2px at 60% 70%, white, transparent), radial-gradient(1px 1px at 50% 50%, white, transparent)',
          backgroundSize: '200% 200%'
        }}
      />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)', top: '10%', left: '10%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)', bottom: '10%', right: '10%' }} />
      </div>
    </>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
