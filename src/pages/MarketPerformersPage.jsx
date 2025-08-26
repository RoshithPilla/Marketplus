import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStockData } from '../context/StockDataContext';
import StockTable from '../components/StockTable';

const MarketPerformersPage = () => {
  const { nseData, bseData, lastUpdated, refreshData } = useStockData();
  const [sortBy, setSortBy] = useState('changePercent');
  const [sortOrder, setSortOrder] = useState('desc');

  const getNseGainers = () => nseData.filter(stock => stock.isGainer).slice(0, 10);
  const getNseLosers = () => nseData.filter(stock => stock.isLoser).slice(0, 10);
  const getBseGainers = () => bseData.filter(stock => stock.isGainer).slice(0, 10);
  const getBseLosers = () => bseData.filter(stock => stock.isLoser).slice(0, 10);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Market Performers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Top gainers and losers from NSE & BSE
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              onClick={refreshData}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </motion.div>

        {/* NSE Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NSE (Nifty 50)</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* NSE Gainers */}
              <div>
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Top Gainers
                </h3>
                <StockTable 
                  data={getNseGainers()} 
                  sortBy={sortBy} 
                  sortOrder={sortOrder}
                  setSortBy={setSortBy}
                  setSortOrder={setSortOrder}
                  compact={true}
                />
              </div>

              {/* NSE Losers */}
              <div>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2" />
                  Top Losers
                </h3>
                <StockTable 
                  data={getNseLosers()} 
                  sortBy={sortBy} 
                  sortOrder={sortOrder}
                  setSortBy={setSortBy}
                  setSortOrder={setSortOrder}
                  compact={true}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* BSE Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">BSE (Sensex)</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* BSE Gainers */}
              <div>
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Top Gainers
                </h3>
                <StockTable 
                  data={getBseGainers()} 
                  sortBy={sortBy} 
                  sortOrder={sortOrder}
                  setSortBy={setSortBy}
                  setSortOrder={setSortOrder}
                  compact={true}
                />
              </div>

              {/* BSE Losers */}
              <div>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2" />
                  Top Losers
                </h3>
                <StockTable 
                  data={getBseLosers()} 
                  sortBy={sortBy} 
                  sortOrder={sortOrder}
                  setSortBy={setSortBy}
                  setSortOrder={setSortOrder}
                  compact={true}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/full-tracking"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Full Market Tracking
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketPerformersPage;
