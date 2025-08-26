import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HeroPage from './pages/HeroPage';
import MarketPerformersPage from './pages/MarketPerformersPage';
import FullMarketTrackingPage from './pages/FullMarketTrackingPage';
import { StockDataProvider } from './context/StockDataContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <StockDataProvider>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <Router>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/market-performers" element={<MarketPerformersPage />} />
            <Route path="/full-tracking" element={<FullMarketTrackingPage />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              className: darkMode ? 'dark-toast' : '',
            }}
          />
        </Router>
      </div>
    </StockDataProvider>
  );
}

export default App;
