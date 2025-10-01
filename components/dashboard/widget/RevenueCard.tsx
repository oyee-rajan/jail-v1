// src/components/widgets/RevenueCard.tsx
'use client'; 
import React, { useState, useEffect } from 'react';

interface ChartDataItem {
    name: string;
    earned: number;
    forecasted: number;
}

const generateChartData = (period: string): ChartDataItem[] => {
  const data: ChartDataItem[] = [];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  let count = 6;

  if (period === 'daily') count = 7;
  if (period === 'weekly') count = 4;
  if (period === 'monthly') count = 12;

  for (let i = 0; i < count; i++) {
    data.push({
      name: period === 'monthly' ? months[i % 12] : `Item ${i + 1}`,
      earned: Math.floor(Math.random() * (120 - 40 + 1)) + 40,
      forecasted: Math.floor(Math.random() * (120 - 40 + 1)) + 40,
    });
  }
  return data;
};

const formatCurrency = (value: number): string => {
    return `₹${(value / 10).toFixed(1)}M`;
}

const RevenueCard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Weekly');
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    setChartData(generateChartData(selectedPeriod.toLowerCase()));
  }, [selectedPeriod, selectedYear]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">₹ 10.5M</h3>
          <p className="text-gray-500 text-sm">Total Revenue</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['Daily', 'Weekly', 'Monthly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 
                  ${selectedPeriod === period ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                {period}
              </button>
            ))}
          </div>
          <select
            value={selectedYear}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-md p-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <p>Mar 14 <span className="font-semibold text-gray-800">₹ 28K</span></p>
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-purple-500 mr-1"></span> Earned
          </span>
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span> Forecasted
          </span>
          <select className="border border-gray-300 rounded-md p-1 text-xs focus:ring-indigo-500 focus:border-indigo-500">
            <option>6 months</option>
            <option>3 months</option>
            <option>12 months</option>
          </select>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 text-sm relative">
        <p>Dynamic Revenue Chart ({selectedPeriod})</p>
        {/* Placeholder for real chart component */}
        <div className="absolute opacity-20 text-xs">
          {JSON.stringify(chartData, null, 2)}
        </div>
      </div>
    </div>
  );
};

export default RevenueCard;