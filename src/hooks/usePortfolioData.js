import { useState, useEffect } from 'react';

export const usePortfolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Only try API in development
      if (import.meta.env.DEV) {
        try {
          const response = await fetch('http://localhost:3001/api/portfolio');
          if (response.ok) {
            const apiData = await response.json();
            setData(apiData);
            return;
          }
        } catch (apiError) {
          console.log('API not available, using local data');
        }
      }
      
      // Use local JSON file (for production and API fallback)
      const portfolioData = await import('../data/portfolio.json');
      setData(portfolioData.default);
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Removed polling - only load once to prevent constant reloading
  }, []);

  return {
    data,
    loading,
    error,
    refreshData: loadData
  };
};
