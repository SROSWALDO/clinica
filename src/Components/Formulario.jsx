import { Modal } from "antd";
import React, { useState } from "react";

export default function Formulario({ isModalOpen, onClose, onAddPaciente }) {

  const [formData, setFormData] = useState({
    Fecha: '',
    Hora: '',
    Nombre: '',
    Telefono: '',
    Consulta: '',
    Doctor: '',
    Radiografias: '',
    Ambulancia: '',
    Ingresos: '',
    Egresos: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hacer solicitud POST a la API
      const response = await fetch('/api/pacientes', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Llamar a la función pasada como prop para actualizar la tabla
        onAddPaciente(formData);

        // Cerrar el modal
        onClose();
      } else {
        console.error('Error al enviar los datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onCancel={onClose}
        width={800}
        footer={null}
      >
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg  w-full">
          {/* Organiza los campos usando grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fecha */}
            <div className="mb-4 floating-label">
              <input
                type="date"
                id="fecha"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="fecha">Fecha</label>
            </div>

            {/* Hora */}
            <div className="mb-4 floating-label">
              <input
                type="time"
                id="hora"
                name="hora"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="hora">Hora</label>
            </div>

            {/* Nombre */}
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="nombre"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="nombre">Nombre</label>
            </div>

            {/* Teléfono */}
            <div className="mb-4 floating-label">
              <input
                type="tel"
                id="telefono"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="telefono">Teléfono</label>
            </div>

            {/* Consulta (input normal) */}
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="consulta"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="consulta">Consulta</label>
            </div>

            {/* Doctor */}
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="doctor"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="doctor">Doctor</label>
            </div>

            {/* Radiografías */}
            <div className="mb-4 floating-label">
              <input
                type="number"
                id="radiografias"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="radiografias">Radiografías</label>
            </div>

            {/* Ambulancia */}
            <div className="mb-4 floating-label">
              <select
                id="ambulancia"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="" disabled selected hidden></option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
              <label htmlFor="ambulancia">Ambulancia</label>
            </div>

            {/* Ingresos */}
            <div className="mb-4 floating-label">
              <input
                type="number"
                id="ingresos"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="ingresos">Ingresos</label>
            </div>

            {/* Egresos */}
            <div className="mb-4 floating-label">
              <input
                type="number"
                id="egresos"
                onChange={handleChange}
                required
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="egresos">Egresos</label>
            </div>
          </div>

          {/* Botón de envío centrado */}
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
