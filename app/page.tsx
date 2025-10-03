"use client";

import HomePageContent from '@/components/HomePageContent'
import Naavbar from '@/components/Naavbar'
import React from 'react'

const page = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <Naavbar/>
      <HomePageContent/>
    </div>
  )
}

export default page