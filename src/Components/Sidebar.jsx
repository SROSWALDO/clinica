import React from 'react'

export default function Sidebar({handleSide}) {
  return (
    <div className='w-[400px] h-[100vh] absolute bg-blue-400 right-0 z-10 ' >
      <button onClick={handleSide} >x</button>
    </div>
  )
}
