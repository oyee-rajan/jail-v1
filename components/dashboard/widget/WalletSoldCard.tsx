// src/components/widgets/WalletSoldCard.tsx
'use client';
import React, { useState, useMemo } from 'react';

// --- TYPE DEFINITIONS ---
interface PieDataItem {
  name: string;
  value: number;
  color: string;
}

type SalesData = {
  [key: string]: PieDataItem[];
};

// --- MOCK DATA ---
const mockSalesData: SalesData = {
  'This month': [
    { name: 'Old Customers', value: 10000, color: 'text-indigo-500' },
    { name: 'New Customers', value: 4000, color: 'text-green-500' },
  ],
  'Last month': [
    { name: 'Old Customers', value: 8500, color: 'text-indigo-500' },
    { name: 'New Customers', value: 6000, color: 'text-green-500' },
  ],
  'Last 3 months': [
    { name: 'Old Customers', value: 25000, color: 'text-indigo-500' },
    { name: 'New Customers', value: 18000, color: 'text-green-500' },
    { name: 'Returning', value: 5000, color: 'text-amber-500' },
  ],
};

const periods = Object.keys(mockSalesData);

// --- HELPER FUNCTION ---
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return num.toString();
};

// --- COMPONENT ---
const WalletSoldCard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>(periods[0]);
  // STATE: Track the index of the currently hovered chart segment
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = useMemo(() => {
    const data = mockSalesData[selectedPeriod];
    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    return { data, total };
  }, [selectedPeriod]);

  // Determine what text to display in the center based on the hover state
  const centerDisplayText = useMemo(() => {
    if (activeIndex !== null) {
      const activeSegment = chartData.data[activeIndex];
      return {
        value: formatNumber(activeSegment.value),
        name: activeSegment.name,
      };
    }
    return {
      value: formatNumber(chartData.total),
      name: 'Total Sold',
    };
  }, [activeIndex, chartData]);

  let cumulativePercentage = 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-full flex flex-col font-sans">
      {/* Card Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Wallets Sold</h3>
        <select
          value={selectedPeriod}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedPeriod(e.target.value)}
          className="border border-gray-300 rounded-lg py-1 px-2 text-sm text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {periods.map(period => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>
      </div>

      {/* Chart Section */}
      <div className="flex-1 flex items-center justify-center my-6 relative">
        <div 
          className="w-44 h-44 relative"
          // Reset hover state when mouse leaves the entire chart area
          onMouseLeave={() => setActiveIndex(null)}
        >
          <svg viewBox="0 0 36 36" className="transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            {/* Data Segments */}
            {chartData.data.map((entry, index) => {
              const percentage = (entry.value / chartData.total) * 100;
              const offset = -cumulativePercentage;
              cumulativePercentage += percentage;

              return (
                <circle
                  key={index}
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="transparent"
                  stroke="currentColor"
                  strokeDasharray={`${percentage} ${100 - percentage}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  // Interactivity: set active index on hover
                  onMouseEnter={() => setActiveIndex(index)}
                  // Visual Feedback: make the hovered segment thicker
                  strokeWidth={activeIndex === index ? 4.5 : 3.5}
                  className={`${entry.color} transition-all duration-300 ease-in-out cursor-pointer`}
                />
              );
            })}
          </svg>
          {/* Center Text (now dynamic) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-gray-800">{centerDisplayText.value}</span>
            <span className="text-xs text-gray-500">{centerDisplayText.name}</span>
          </div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="space-y-3">
        {chartData.data.map((entry, index) => (
          <div 
            key={entry.name} 
            className="flex justify-between items-center text-sm rounded-lg p-2 transition-colors duration-200"
            // Visual Feedback: Highlight corresponding legend item on hover
            style={{ backgroundColor: activeIndex === index ? entry.color.replace('text-', 'bg-').replace('-500', '-100') : 'transparent' }}
          >
            <span className="flex items-center text-gray-600">
              <span className={`h-3 w-3 rounded-full mr-3 ${entry.color.replace('text-', 'bg-')}`}></span>
              {entry.name}
            </span>
            <span className="font-semibold text-gray-800">{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletSoldCard;