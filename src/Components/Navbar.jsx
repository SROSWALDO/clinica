"use client"
import React, { useState } from 'react'
import logo from '../assets/logo2.png';
import menu from '../assets/menu.png'
import Image from 'next/image';
import Sidebar from './Sidebar';

export default function Navbar() {

  return (
    <div className='w-full flex justify-between shadow-md items-center px-5 ' >
    <div>
    <Image  className='w-[270px]' src={logo} alt='logo' />
    </div>

    <div>
      <Image onClick={handleSidebar} className='w-[45px]' src={menu} alt='menu' />
    </div>

    
      
    </div>
  )
}
