import React, { useState } from 'react';
import { Search, Filter, RefreshCw, Download, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStockData } from '../context/StockDataContext';
import StockTable from '../components/StockTable';
import { exportToCSV } from '../utils/exportUtils';
import toast from 'react-hot-toast';

const FullMarketTrackingPage = () => {
  const { nseData, bseData, lastUpdated, refreshData } = useStockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, gainers, losers
  const [sortBy, setSortBy] = useState('changePercent');
  const [sortOrder, setSortOrder] = useState('desc');

  const filterData = (data) => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    switch (filterType) {
      case 'gainers':
        filtered = filtered.filter(stock => stock.isGainer);
        break;
      case 'losers':
        filtered = filtered.filter(stock => stock.isLoser);
        break;
      default:
        break;
    }

    return filtered;
  };

  const handleExport = (data, exchange) => {
    try {
      exportToCSV(data, `${exchange}_stocks_${new Date().toISOString().split('T')[0]}`);
      toast.success(`${exchange} data exported successfully!`);
    } catch (error) {
      toast.error('Export failed. Please try again.');
    }
  };

  const filteredNseData = filterData(nseData);
  const filteredBseData = filterData(bseData);

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
            Full Market Tracking
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Comprehensive view of NSE & BSE stocks with advanced filtering and export capabilities
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stocks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Stocks</option>
                <option value="gainers">Gainers Only</option>
                <option value="losers">Losers Only</option>
              </select>
            </div>

            {/* Refresh */}
            <button
              onClick={refreshData}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>

            {/* Last Updated */}
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </motion.div>

        {/* Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* NSE Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NSE (Nifty 50)</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredNseData.length} of {nseData.length} stocks
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleExport(filteredNseData, 'NSE')}
                className="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
            
            <StockTable 
              data={filteredNseData}
              sortBy={sortBy}
              sortOrder={sortOrder}
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
              showMarketCap={true}
            />
          </motion.div>

          {/* BSE Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">BSE (Sensex)</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredBseData.length} of {bseData.length} stocks
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleExport(filteredBseData, 'BSE')}
                className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
            
            <StockTable 
              data={filteredBseData}
              sortBy={sortBy}
              sortOrder={sortOrder}
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
              showMarketCap={true}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FullMarketTrackingPage;
