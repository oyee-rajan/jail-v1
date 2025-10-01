// src/components/Sidebar.js
'use client';
import React, { useState } from 'react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard'); // State to track active menu item

  const navItems = [
    { name: 'Dashboard', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H2z"></path>
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
      </svg>
    )},
    { name: 'Users', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
      </svg>
    )},
    { name: 'Orders', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13z" clipRule="evenodd"></path>
      </svg>
    )},
    { name: 'Products', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 000 2h1v1a1 1 0 001 1h2a1 1 0 001-1v-1h1a1 1 0 001-1V9h1a1 1 0 000-2h-1V6a4 4 0 00-4-4zm-2 9a1 1 0 100 2h4a1 1 0 100-2h-4z" clipRule="evenodd"></path>
      </svg>
    )},
    { name: 'Posts', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 3.414L16.586 7A2 2 0 0118 8.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd"></path>
      </svg>
    )},
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col border-r border-gray-200">
      <div className="flex items-center mb-10 pl-2">
        {/* Placeholder for logo/brand */}
        <span className="text-2xl font-bold text-gray-800">Jail Luxury</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            onClick={() => setActiveItem(item.name)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 
              ${activeItem === item.name 
                ? 'bg-indigo-100 text-indigo-700 font-semibold' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;