import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // API base URL
  const API_BASE = 'http://localhost:3001/api';
  const isProduction = !import.meta.env.DEV;

  // Load portfolio data from API
  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const response = await fetch(`${API_BASE}/portfolio`);
      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
      } else {
        console.error('Failed to load portfolio data from API');
        // Fallback to local import if API fails
        const localData = await import('../data/portfolio.json');
        setPortfolioData(localData.default);
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      // Fallback to local import
      try {
        const localData = await import('../data/portfolio.json');
        setPortfolioData(localData.default);
      } catch (localError) {
        console.error('Failed to load local portfolio data:', localError);
      }
    }
  };

  // Auto-save function
  const autoSave = async (newData) => {
    if (!autoSaveEnabled || isSaving || isProduction) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData)
      });

      if (response.ok) {
        setMessage('✅ Changes saved automatically!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Failed to save changes');
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('Auto-save error:', error);
      setMessage('❌ Auto-save failed - API server may be offline');
      setTimeout(() => setMessage(''), 5000);
    }
    setIsSaving(false);
  };

  // Debounced auto-save
  useEffect(() => {
    if (portfolioData && autoSaveEnabled) {
      const timeoutId = setTimeout(() => {
        autoSave(portfolioData);
      }, 1000); // Auto-save 1 second after changes

      return () => clearTimeout(timeoutId);
    }
  }, [portfolioData, autoSaveEnabled]);

  const handleLogin = () => {
    if (password === '555') {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Invalid password');
    }
  };

  const handleManualSave = async () => {
    await autoSave(portfolioData);
  };

  const updatePersonalInfo = (field, value) => {
    const newData = {
      ...portfolioData,
      personalInfo: {
        ...portfolioData.personalInfo,
        [field]: value
      }
    };
    setPortfolioData(newData);
  };

  const addSkillCategory = () => {
    const newData = {
      ...portfolioData,
      skills: [...portfolioData.skills, { title: 'New Category', items: [] }]
    };
    setPortfolioData(newData);
  };

  const updateSkillCategory = (index, field, value) => {
    const newData = {
      ...portfolioData,
      skills: portfolioData.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    };
    setPortfolioData(newData);
  };

  const addSkillItem = (categoryIndex) => {
    const newData = {
      ...portfolioData,
      skills: portfolioData.skills.map((category, i) => 
        i === categoryIndex 
          ? { ...category, items: [...category.items, { name: 'New Skill' }] }
          : category
      )
    };
    setPortfolioData(newData);
  };

  const updateSkillItem = (categoryIndex, itemIndex, value) => {
    const newData = {
      ...portfolioData,
      skills: portfolioData.skills.map((category, i) => 
        i === categoryIndex 
          ? {
              ...category,
              items: category.items.map((item, j) => 
                j === itemIndex ? { name: value } : item
              )
            }
          : category
      )
    };
    setPortfolioData(newData);
  };

  const deleteSkillItem = (categoryIndex, itemIndex) => {
    const newData = {
      ...portfolioData,
      skills: portfolioData.skills.map((category, i) => 
        i === categoryIndex 
          ? {
              ...category,
              items: category.items.filter((_, j) => j !== itemIndex)
            }
          : category
      )
    };
    setPortfolioData(newData);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      description: 'Project description',
      tech: 'Technologies used',
      link: 'https://example.com',
      image: 'https://via.placeholder.com/400x300',
      requiresAuth: false
    };
    
    const newData = {
      ...portfolioData,
      projects: [...portfolioData.projects, newProject]
    };
    setPortfolioData(newData);
  };

  const updateProject = (index, field, value) => {
    const newData = {
      ...portfolioData,
      projects: portfolioData.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    };
    setPortfolioData(newData);
  };

  const deleteProject = (index) => {
    const newData = {
      ...portfolioData,
      projects: portfolioData.projects.filter((_, i) => i !== index)
    };
    setPortfolioData(newData);
  };

  const addAchievement = () => {
    const newAchievement = {
      id: Date.now(),
      title: 'New Achievement',
      year: new Date().getFullYear().toString(),
      description: 'Achievement description',
      image: '/placeholder.png'
    };
    
    const newData = {
      ...portfolioData,
      achievements: [...portfolioData.achievements, newAchievement]
    };
    setPortfolioData(newData);
  };

  const updateAchievement = (index, field, value) => {
    const newData = {
      ...portfolioData,
      achievements: portfolioData.achievements.map((achievement, i) => 
        i === index ? { ...achievement, [field]: value } : achievement
      )
    };
    setPortfolioData(newData);
  };

  const deleteAchievement = (index) => {
    const newData = {
      ...portfolioData,
      achievements: portfolioData.achievements.filter((_, i) => i !== index)
    };
    setPortfolioData(newData);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full mx-4"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Portfolio Admin</h1>
          
          {isProduction && (
            <div className="mb-6 bg-yellow-600 text-yellow-100 p-4 rounded-lg">
              <p className="text-sm font-medium">⚠️ Production Mode</p>
              <p className="text-xs mt-1">Admin panel is read-only on deployed sites. Auto-save is disabled.</p>
            </div>
          )}
          
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Login
            </button>
            {message && (
              <p className="text-red-400 text-sm text-center">{message}</p>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {isProduction && (
            <div className="mb-4 bg-yellow-600 text-yellow-100 p-4 rounded-lg">
              <p className="font-medium">⚠️ Production Mode - Read Only</p>
              <p className="text-sm mt-1">You're viewing the deployed version. Changes won't be saved. Use local development for editing.</p>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Portfolio Admin Panel</h1>
              <p className="text-sm text-gray-400 mt-1">
                {isSaving ? '💾 Saving...' : autoSaveEnabled ? '✅ Auto-save enabled' : '⚠️ Auto-save disabled'}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={autoSaveEnabled}
                  onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                  className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-300">Auto-save</span>
              </label>
              <button
                onClick={handleManualSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {isSaving ? 'Saving...' : 'Save Now'}
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-8">
          {['personal', 'skills', 'projects', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {message && (
          <div className="bg-green-800 border border-green-600 text-green-100 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo('name', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.title}
                  onChange={(e) => updatePersonalInfo('title', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={portfolioData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={portfolioData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={portfolioData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image Path</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.profileImage}
                  onChange={(e) => updatePersonalInfo('profileImage', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Skills</h2>
              <button
                onClick={addSkillCategory}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add Category
              </button>
            </div>
            
            {portfolioData.skills.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-gray-800 p-6 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category Title</label>
                  <input
                    type="text"
                    value={category.title}
                    onChange={(e) => updateSkillCategory(categoryIndex, 'title', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-300">Skills</label>
                    <button
                      onClick={() => addSkillItem(categoryIndex)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Add Skill
                    </button>
                  </div>
                  
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateSkillItem(categoryIndex, itemIndex, e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => deleteSkillItem(categoryIndex, itemIndex)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Projects</h2>
              <button
                onClick={addProject}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add Project
              </button>
            </div>
            
            {portfolioData.projects.map((project, index) => (
              <div key={project.id} className="bg-gray-800 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
                    <input
                      type="text"
                      value={project.tech}
                      onChange={(e) => updateProject(index, 'tech', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project URL</label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={project.image}
                      onChange={(e) => updateProject(index, 'image', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={project.requiresAuth}
                      onChange={(e) => updateProject(index, 'requiresAuth', e.target.checked)}
                      className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-300">Requires Authentication</span>
                  </label>
                  
                  <button
                    onClick={() => deleteProject(index)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Delete Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Achievements</h2>
              <button
                onClick={addAchievement}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add Achievement
              </button>
            </div>
            
            {portfolioData.achievements.map((achievement, index) => (
              <div key={achievement.id} className="bg-gray-800 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                    <input
                      type="text"
                      value={achievement.year}
                      onChange={(e) => updateAchievement(index, 'year', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Image Path</label>
                    <input
                      type="text"
                      value={achievement.image}
                      onChange={(e) => updateAchievement(index, 'image', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={achievement.description}
                    onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => deleteAchievement(index)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Delete Achievement
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
