import { Modal } from "antd";
import React from "react";

export default function PatologiaForm({ isModalOpen, onClose}) {
  return (
    <div>
      <Modal
        open={isModalOpen}
        onCancel={onClose}
        width={800}
        footer={null}
      >
        <form className="bg-white p-8 rounded-lg  w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="mb-4 floating-label">
              <input
                type="date"
                id="fecha"
                
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="fecha">Fecha</label>
            </div>

            
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="nombre"
                
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="nombre">Nombre</label>
            </div>

            
            <div className="mb-4 floating-label">
              <input
                type="tel"
                id="telefono"
                
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="telefono">Teléfono</label>
            </div>

            
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="consulta"
                
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="consulta">Pieza</label>
            </div>

            
            <div className="mb-4 ml-40 w-[350px]  floating-label">
              <input
                type="number"
                id="doctor"
                
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="doctor">Costo</label>
            </div>

            
            

          </div>

          
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
