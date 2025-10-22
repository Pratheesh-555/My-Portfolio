import { useEffect } from 'react';
import { usePortfolioData } from './hooks/usePortfolioData';
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Loader from './components/Loader';

function App() {
  const { data, loading, error } = usePortfolioData();

  // Check if admin route
  const isAdmin = window.location.hash === '#admin';

  useEffect(() => {
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>Error loading portfolio: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a14] overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content - Add bottom padding for mobile nav */}
      <main className="relative z-10 pb-20 md:pb-0">
        <HeroSection personalInfo={data.personalInfo} />
        <ProjectsSection projects={data.projects} />
        <SkillsSection skills={data.skills} />
        <AchievementsSection achievements={data.achievements} />
        <ContactSection personalInfo={data.personalInfo} />
      </main>

      {/* Footer - Add bottom padding for mobile nav */}
      <div className="pb-0 md:pb-0">
        <Footer personalInfo={data.personalInfo} />
      </div>
    </div>
  );
}

export default App;
