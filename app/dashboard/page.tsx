// src/App.tsx
import React from 'react';
import DashboardLayout from '../../components/dashboard/dashboardlayout';
import {Helmet} from '../../components/dashboard/helmet'; // CDN setup

const App: React.FC = () => {
  return (
    <>
      <Helmet /> 
      <DashboardLayout />
    </>
  );
}

export default App;