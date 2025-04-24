import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortField, setSortOrder, setFilter, selectSortedAndFilteredAssets } from '../store/cryptoSlice';
import type { SortField } from '../store/cryptoSlice';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';


const formatNumber = (num: number, decimals = 2): string => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
  return `$${num.toFixed(decimals)}`;
};


const formatPrice = (price: number): string => {
  if (price >= 1) return formatNumber(price, 2);
  return formatNumber(price, 6);
};


const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};


const CryptoTable: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectSortedAndFilteredAssets);
  const sortField = useSelector((state: any) => state.crypto.sortField);
  const sortOrder = useSelector((state: any) => state.crypto.sortOrder);
  const filter = useSelector((state: any) => state.crypto.filter);

  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortField(field));
      dispatch(setSortOrder('desc'));
    }
  };

  
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.target.value));
  };

  
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 ml-1" />
    );
  };

  
  const renderMiniChart = (data: number[]) => {
    const chartData = data.map(value => ({ value }));
    const isPositive = data[data.length - 1] >= data[0];
    
    return (
      <div className="w-24 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? '#10B981' : '#EF4444'}
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by name or symbol"
            value={filter}
            onChange={handleFilter}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 transition-colors duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {/* Asset Column - Fixed width for consistency */}
                  <th scope="col" className="w-64 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Asset
                  </th>
                  {/* Price Column - Fixed width */}
                  <th scope="col" 
                      className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort('price')}>
                    <div className="flex items-center">
                      Price
                      {renderSortIcon('price')}
                    </div>
                  </th>
                  {/* Percentage Columns - Equal widths */}
                  <th scope="col" 
                      className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort('change1h')}>
                    <div className="flex items-center">
                      1h %
                      {renderSortIcon('change1h')}
                    </div>
                  </th>
                  <th scope="col"
                      className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort('change24h')}>
                    <div className="flex items-center">
                      24h %
                      {renderSortIcon('change24h')}
                    </div>
                  </th>
                  <th scope="col"
                      className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort('change7d')}>
                    <div className="flex items-center">
                      7d %
                      {renderSortIcon('change7d')}
                    </div>
                  </th>
                  {/* Market Cap Column - Fixed width */}
                  <th scope="col"
                      className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort('marketCap')}>
                    <div className="flex items-center">
                      Market Cap
                      {renderSortIcon('marketCap')}
                    </div>
                  </th>
                  {/* Volume Column - Fixed width */}
                  <th scope="col"
                      className="w-40 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                      onClick={() => handleSort('volume24h')}>
                    <div className="flex items-center">
                      Volume (24h)
                      {renderSortIcon('volume24h')}
                    </div>
                  </th>
                  {/* Supply Column - Fixed width */}
                  <th scope="col"
                      className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Circulating Supply
                  </th>
                  {/* Chart Column - Fixed width */}
                  <th scope="col"
                      className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Last 7 Days
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* Asset Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-contain bg-gray-50 p-1"
                            src={`/images/${asset.symbol.toLowerCase()}.png`}
                            alt={asset.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.symbol}</div>
                        </div>
                      </div>
                    </td>
                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatPrice(asset.price)}</div>
                    </td>
                    {/* 1h Change */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${asset.change1h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(asset.change1h)}
                      </span>
                    </td>
                    {/* 24h Change */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(asset.change24h)}
                      </span>
                    </td>
                    {/* 7d Change */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${asset.change7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(asset.change7d)}
                      </span>
                    </td>
                    {/* Market Cap */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatNumber(asset.marketCap)}</div>
                    </td>
                    {/* Volume */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatNumber(asset.volume24h)}</div>
                    </td>
                    {/* Supply */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatNumber(asset.circulatingSupply, 2)} {asset.symbol}
                      </div>
                    </td>
                    {/* Chart */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderMiniChart(asset.chartData)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable; 