import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to portfolio data
const portfolioPath = path.join(__dirname, 'src/data/portfolio.json');

// Get portfolio data
app.get('/api/portfolio', (req, res) => {
  try {
    const data = fs.readFileSync(portfolioPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    res.status(500).json({ error: 'Failed to read portfolio data' });
  }
});

// Save portfolio data
app.post('/api/portfolio', (req, res) => {
  try {
    const portfolioData = req.body;
    
    // Validate the data structure
    if (!portfolioData.personalInfo || !portfolioData.skills || !portfolioData.projects || !portfolioData.achievements) {
      return res.status(400).json({ error: 'Invalid data structure' });
    }

    // Write to file with proper formatting
    fs.writeFileSync(portfolioPath, JSON.stringify(portfolioData, null, 2), 'utf8');
    
    console.log('Portfolio data saved successfully');
    res.json({ success: true, message: 'Portfolio data saved successfully' });
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    res.status(500).json({ error: 'Failed to save portfolio data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Portfolio API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio API server running on http://localhost:${PORT}`);
  console.log(`📝 Portfolio data will be saved to: ${portfolioPath}`);
});
