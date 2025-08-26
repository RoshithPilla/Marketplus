import React, { useMemo } from 'react';
import { ChevronUp, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';

const StockTable = ({ 
  data, 
  sortBy, 
  sortOrder, 
  setSortBy, 
  setSortOrder, 
  compact = false, 
  showMarketCap = false 
}) => {
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return [...data].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [data, sortBy, sortOrder]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <ChevronUp className="h-4 w-4 text-gray-400" />;
    return sortOrder === 'asc' ? 
      <ChevronUp className="h-4 w-4 text-blue-600" /> : 
      <ChevronDown className="h-4 w-4 text-blue-600" />;
  };

  const formatNumber = (num, decimals = 2) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(decimals) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(decimals) + 'K';
    }
    return num.toFixed(decimals);
  };

  const formatVolume = (volume) => {
    if (volume >= 10000000) {
      return (volume / 10000000).toFixed(1) + 'Cr';
    } else if (volume >= 100000) {
      return (volume / 100000).toFixed(1) + 'L';
    } else if (volume >= 1000) {
      return (volume / 1000).toFixed(1) + 'K';
    }
    return volume.toString();
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th 
              className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => handleSort('symbol')}
            >
              <div className="flex items-center space-x-1">
                <span>Stock</span>
                <SortIcon column="symbol" />
              </div>
            </th>
            <th 
              className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => handleSort('price')}
            >
              <div className="flex items-center justify-end space-x-1">
                <span>Price</span>
                <SortIcon column="price" />
              </div>
            </th>
            <th 
              className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => handleSort('changePercent')}
            >
              <div className="flex items-center justify-end space-x-1">
                <span>Change %</span>
                <SortIcon column="changePercent" />
              </div>
            </th>
            {!compact && (
              <th 
                className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort('volume')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Volume</span>
                  <SortIcon column="volume" />
                </div>
              </th>
            )}
            {showMarketCap && (
              <th 
                className="text-right py-3 px-2 font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort('marketCap')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Market Cap</span>
                  <SortIcon column="marketCap" />
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((stock, index) => (
            <tr 
              key={stock.symbol}
              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
            >
              <td className="py-3 px-2">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {stock.symbol}
                  </div>
                  {!compact && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stock.name}
                    </div>
                  )}
                </div>
              </td>
              <td className="py-3 px-2 text-right font-medium text-gray-900 dark:text-white">
                ₹{stock.price.toFixed(2)}
              </td>
              <td className="py-3 px-2 text-right">
                <div className={`flex items-center justify-end space-x-1 ${
                  stock.isGainer ? 'text-green-600 dark:text-green-400' : 
                  stock.isLoser ? 'text-red-600 dark:text-red-400' : 
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {stock.isGainer ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : stock.isLoser ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  <span className="font-medium">
                    {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </span>
                </div>
                <div className={`text-xs ${
                  stock.isGainer ? 'text-green-600 dark:text-green-400' : 
                  stock.isLoser ? 'text-red-600 dark:text-red-400' : 
                  'text-gray-500 dark:text-gray-400'
                }`}>
                  {stock.change > 0 ? '+' : ''}₹{stock.change.toFixed(2)}
                </div>
              </td>
              {!compact && (
                <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-400">
                  {formatVolume(stock.volume)}
                </td>
              )}
              {showMarketCap && (
                <td className="py-3 px-2 text-right text-gray-600 dark:text-gray-400">
                  ₹{formatNumber(stock.marketCap, 0)}Cr
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
