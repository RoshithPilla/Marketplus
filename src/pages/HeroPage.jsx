import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                📊 Today's Indian Stock Market Highlights
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Track daily movements of NSE & BSE in one place
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <Link
                to="/market-performers"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View Market Performers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
                <Zap className="h-8 w-8 text-yellow-300 mb-3 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Real-time Data</h3>
                <p className="text-blue-100 text-sm">Live updates every 5 minutes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
                <Shield className="h-8 w-8 text-green-300 mb-3 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Reliable Sources</h3>
                <p className="text-blue-100 text-sm">NSE & BSE official data</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
                <Globe className="h-8 w-8 text-blue-300 mb-3 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Complete Coverage</h3>
                <p className="text-blue-100 text-sm">All major Indian stocks</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Market Overview
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive tracking of Indian stock markets
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8"
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">NSE (Nifty 50)</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Track the top 50 stocks from the National Stock Exchange, representing the cream of Indian companies.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Live price updates</li>
                <li>• Top gainers and losers</li>
                <li>• Volume and market cap data</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8"
            >
              <div className="flex items-center mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">BSE (Sensex)</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Monitor the Bombay Stock Exchange index comprising 30 well-established and financially sound companies.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Real-time market movements</li>
                <li>• Comprehensive stock analysis</li>
                <li>• Export capabilities</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to track the Indian stock market
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Updates',
                description: 'Auto-refresh every 5 minutes with the latest market data',
                icon: '⚡'
              },
              {
                title: 'Advanced Filtering',
                description: 'Sort by price, volume, or percentage change',
                icon: '🔍'
              },
              {
                title: 'Export Data',
                description: 'Download market data in CSV or Excel format',
                icon: '📊'
              },
              {
                title: 'Dark Mode',
                description: 'Switch between light and dark themes',
                icon: '🌙'
              },
              {
                title: 'Mobile Responsive',
                description: 'Perfect experience on all devices',
                icon: '📱'
              },
              {
                title: 'Quick Search',
                description: 'Find any stock instantly with search',
                icon: '🚀'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
