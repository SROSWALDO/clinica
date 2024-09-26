import { Modal } from 'antd';
import React, { useRef } from 'react';
import corte from '@/assets/corte.svg';
import Image from 'next/image';
import ReactToPrint from 'react-to-print';
import print from '@/assets/print.svg'

export default function Corte({ isCorteOpen, onClose, ingresos, egresos, total, totalIngresos, totalEgresos }) {
  const componentRef = useRef();

  return (
    <div>
      <Modal
        open={isCorteOpen}
        onCancel={onClose}
        width={600} // Ajustamos el ancho del modal
        footer={null}
        className="font-poppins"
      >
        {/* Ticket content */}
        <div ref={componentRef} className="ticket m-auto">
          <div className="ticket-body">
            <h1 className="text-center text-base font-bold mb-2 text-blue-500 ">SERVICIO MEDICO CRISTO MEDICO</h1>
            <p className='text-[8px] text-center'>CIRUGIA GENERAL • CONSULTAS • URGENCIAS • ULTRASONIDOS</p>
            <p className='text-center text-sm mt-2'>Dr. Luis Abelardo Sotelo Vargas</p>
            <p className='text-center text-xs'>MEDICO CIRUJANO</p>
            <p className='text-center'>Cedula Profesional: 8926487</p>

            

            <div className='flex justify-between mt-3'>
            <div className='mb-4'>
              <h2 className='text-md font-semibold border-b mb-1 text-green-500'>Ingresos</h2>
              <ul className='list-none pl-0'>
                {ingresos.map((ingreso, index) => (
                  <li key={index} className='text-sm'>{ingreso}</li>
                ))}
              </ul>
              <p className='text-sm mt-2 font-semibold text-green-600'>Total Ingresos: <span className='text-black'>${totalIngresos}</span></p>
            </div>

            <div className='mb-4'>
              <h2 className='text-md font-semibold border-b mb-1 text-red-500'>Egresos</h2>
              <ul className='list-none pl-0'>
                {egresos.map((egreso, index) => (
                  <li key={index} className='text-sm'>{egreso}</li>
                ))}
              </ul>
              <p className='text-sm mt-2 font-semibold text-red-600 '>Total Egresos: <span className='text-black'>${totalEgresos}</span></p>
            </div>
            </div>

            <div className='text-center'>
              <h1 className='text-lg font-bold'>Total: ${total}</h1>
            </div>
          </div>
        </div>

        {/* Print button */}
        <div className='flex justify-center mt-4'>
          <ReactToPrint
            trigger={() => (
              <button className='flex items-center p-2 bg-blue-500 rounded-md text-sm text-white hover:bg-blue-600 transition duration-200'>
              <Image className='mr-1' src={print} alt='print' />
                Imprimir Cohorte
                
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </Modal>

      {/* Styling specific to ticket size */}
      <style jsx>{`
        .ticket {
          width: 80mm; /* Tamaño típico de ticket de 80 mm */
          font-size: 12px;
        }
        .ticket-body {
          padding: 10px;
        }
        @media print {
          .ticket {
            width: 80mm;
            margin: auto
          }
          .ticket-body {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}
