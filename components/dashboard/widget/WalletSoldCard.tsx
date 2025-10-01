// src/components/widgets/WalletSoldCard.tsx
'use client'; 
import React, { useState } from 'react';

interface PieDataItem {
    name: string;
    value: number;
    color: string;
}

const WalletSoldCard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('This month');

  const data: PieDataItem[] = [
    { name: 'Old Customers', value: 10000, color: '#6366F1' },
    { name: 'New Customer', value: 4000, color: '#22C55E' },
  ];
  const total: number = data.reduce((sum, entry) => sum + entry.value, 0);
  const oldCustomerPercentage: number = (data[0].value / total) * 100;
  const newCustomerPercentage: number = (data[1].value / total) * 100;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Wallet Sold</h3>
        <select
          value={selectedMonth}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded-md p-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option>This month</option>
          <option>Last month</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="flex-1 flex items-center justify-center relative">
        {/* Doughnut Chart Placeholder (using SVG for basic visual) */}
        <div className="w-40 h-40 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full">
                {/* Background circle */}
                <path 
                    className="text-gray-200" 
                    fill="currentColor" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    strokeWidth="3.5"
                    strokeDasharray="100 0"
                    strokeLinecap="round"
                />
                {/* Old Customers Segment (Indigo) */}
                <path
                    className="text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray={`${oldCustomerPercentage} ${100 - oldCustomerPercentage}`}
                    strokeLinecap="round"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* New Customers Segment (Green) */}
                <path
                    className="text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray={`${newCustomerPercentage} ${100 - newCustomerPercentage}`}
                    strokeDashoffset={100 - oldCustomerPercentage}
                    strokeLinecap="round"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">{data[0].value / 1000}K</span>
                <span className="text-sm text-gray-500">Old Customers</span>
            </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-indigo-500 mr-2"></span> Old Customers
          </span>
          <span className="font-semibold">{data[0].value / 1000}K</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span> New Customer
          </span>
          <span className="font-semibold">{data[1].value / 1000}K</span>
        </div>
      </div>
    </div>
  );
};

export default WalletSoldCard;