import { Modal } from "antd";
import React, { useState } from "react";

export default function PatologiaForm({ isModalOpen, onClose, crearPatologia }) {

  const [formData, setFormData] = useState({
    fecha: "",
    nombre: "",
    telefono: "",
    pieza: "",
    costo: 0,
    recibido: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/patologia",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if(response.ok){
        const newPaciente = await response.json();
        crearPatologia(newPaciente)
        onClose()
      } else {
        console.log(error.message);
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "recibido" ? value === "true" : value
    })
  }

  return (
    <div>
      <Modal
        open={isModalOpen}
        onCancel={onClose}
        width={800}
        footer={null}
      >
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg  w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="mb-4 floating-label">
              <input
                type="date"
                id="fecha"
                name="fecha"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="fecha">Fecha</label>
            </div>

            
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="nombre"
                name="nombre"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="nombre">Nombre</label>
            </div>

            
            <div className="mb-4 floating-label">
              <input
                type="tel"
                id="telefono"
                name="telefono"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="telefono">Teléfono</label>
            </div>

            
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="pieza"
                name="pieza"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="consulta">Pieza</label>
            </div>

            
            <div className="mb-4  floating-label">
              <input
                type="number"
                id="costo"
                name="costo"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="costo">Costo</label>
            </div>

            <div className="mb-4  floating-label">
              <select name="recibido" id="recibido" onChange={handleChange} >
                <option value="">Seleccionar</option>
                <option value="true">Recibido</option>
                <option value="false">No Recibido</option>
              </select>
              <label htmlFor="recibido">Recibido</label>
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
