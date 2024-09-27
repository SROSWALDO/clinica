"use client"
import React, { useState } from 'react'
import logo from '../assets/logoCristo.png';
import menu from '../assets/menu.png'
import Image from 'next/image';
import Sidebar from './Sidebar';

export default function Navbar({ handleSide }) {

  return (
    <div className='w-full h-[80px] flex justify-between shadow-md items-center px-5 ' >
    <div>
    <Image  className='w-[190px]' src={logo} alt='logo' />
    </div>

    <div>
      <Image onClick={handleSide} className='w-[45px] h-[45px] cursor-pointer hover:scale-105 transition-all ' src={menu} alt='menu' />
    </div>

    
      
    </div>
  )
}
