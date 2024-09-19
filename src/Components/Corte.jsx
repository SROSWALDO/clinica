import { Modal } from 'antd';
import React from 'react';
import corte from '@/assets/corte.svg';
import Image from 'next/image';

export default function Corte({ isCorteOpen, onClose, ingresos, egresos, total, totalIngresos, totalEgresos }) {
  return (
    <div>
      <Modal
        open={isCorteOpen}
        onCancel={onClose}
        width={800}
        footer={null}
        className="font-poppins"
      >
        <div className='flex justify-between mb-6'>
          <div className='w-full max-w-[350px]'>
            <h1 className='text-xl text-blue-600 uppercase font-semibold mb-2 border-b border-blue-200 pb-2'>Ingresos</h1>
            <ul className='list-disc pl-5 space-y-1'>
              {ingresos.map((ingreso, index) => (
                <li key={index} className='text-gray-800 text-lg'>{ingreso}</li>
              ))}
            </ul>
            <p className='mt-3 text-lg font-semibold text-blue-600'>Total Ingresos: ${totalIngresos}</p>
          </div>
          <div className='w-full max-w-[350px]'>
            <h1 className='text-xl text-blue-600 uppercase font-semibold mb-2 border-b border-blue-200 pb-2'>Egresos</h1>
            <ul className='list-disc pl-5 space-y-1'>
              {egresos.map((egreso, index) => (
                <li key={index} className='text-gray-800 text-lg'>{egreso}</li>
              ))}
            </ul>
            <p className='mt-3 text-lg font-semibold text-blue-600'>Total Egresos: ${totalEgresos}</p>
          </div>
        </div>
        <div className='text-center mb-4'>
          <h1 className='text-2xl font-bold text-gray-800'>Total Corte: ${total}</h1>
        </div>
        <div className='flex justify-center'>
          <button className='flex items-center p-2 bg-blue-500 rounded-md text-base text-white hover:bg-blue-600 transition duration-200'>
            Imprimir Corte
            <Image className='ml-2' src={corte} alt='corte' />
          </button>
        </div>
      </Modal>
    </div>
  );
}
