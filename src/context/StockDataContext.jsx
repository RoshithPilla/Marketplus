import React, { createContext, useContext, useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

const StockDataContext = createContext();

const nifty50Stocks = [
  'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL', 'ASIANPAINT',
  'MARUTI', 'BAJFINANCE', 'LT', 'AXISBANK', 'HCLTECH', 'NESTLEIND', 'KOTAKBANK', 'ULTRACEMCO', 'TITAN', 'SUNPHARMA',
  'ONGC', 'NTPC', 'POWERGRID', 'TECHM', 'TATAMOTORS', 'COALINDIA', 'BAJAJFINSV', 'WIPRO', 'DRREDDY', 'EICHERMOT',
  'INDUSINDBK', 'GRASIM', 'BRITANNIA', 'ADANIPORTS', 'TATACONSUM', 'HINDALCO', 'HEROMOTOCO', 'CIPLA', 'TATASTEEL', 'DIVISLAB',
  'JSWSTEEL', 'BPCL', 'APOLLOHOSP', 'SHREECEM', 'UPL', 'SBILIFE', 'ADANIENT', 'LTIM', 'BAJAJ-AUTO', 'HDFCLIFE'
];

const sensexStocks = [
  'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'HINDUNILVR', 'ITC', 'SBIN', 'BHARTIARTL', 'ASIANPAINT',
  'MARUTI', 'BAJFINANCE', 'LT', 'AXISBANK', 'NESTLEIND', 'KOTAKBANK', 'ULTRACEMCO', 'TITAN', 'SUNPHARMA', 'NTPC',
  'POWERGRID', 'TECHM', 'TATAMOTORS', 'WIPRO', 'INDUSINDBK', 'GRASIM', 'BRITANNIA', 'TATACONSUM', 'TATASTEEL', 'JSWSTEEL'
];

const generateStockData = (stockName) => {
  const basePrice = faker.number.float({ min: 50, max: 5000, fractionDigits: 2 });
  const changePercent = faker.number.float({ min: -8, max: 8, fractionDigits: 2 });
  const change = (basePrice * changePercent / 100);
  const volume = faker.number.int({ min: 10000, max: 5000000 });
  const marketCap = faker.number.float({ min: 1000, max: 500000, fractionDigits: 0 });

  return {
    symbol: stockName,
    name: stockName.replace(/[^A-Z]/g, ' ').trim(),
    price: basePrice,
    change: change,
    changePercent: changePercent,
    volume: volume,
    marketCap: marketCap,
    isGainer: changePercent > 0,
    isLoser: changePercent < 0
  };
};

export const StockDataProvider = ({ children }) => {
  const [nseData, setNseData] = useState([]);
  const [bseData, setBseData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const generateData = () => {
    const nseStocks = nifty50Stocks.map(generateStockData);
    const bseStocks = sensexStocks.map(generateStockData);
    
    setNseData(nseStocks);
    setBseData(bseStocks);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    generateData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(generateData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    generateData();
  };

  const value = {
    nseData,
    bseData,
    lastUpdated,
    refreshData
  };

  return (
    <StockDataContext.Provider value={value}>
      {children}
    </StockDataContext.Provider>
  );
};

export const useStockData = () => {
  const context = useContext(StockDataContext);
  if (!context) {
    throw new Error('useStockData must be used within a StockDataProvider');
  }
  return context;
};
