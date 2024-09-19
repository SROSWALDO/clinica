import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Formulario({ isModalOpen, onClose, onAddPaciente, paciente }) {

  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    nombre: '',
    telefono: '',
    consulta: '',
    doctor: '',
    radiografias: '',
    ambulancia: false,
    ingresos: '',
    egresos: ''
  });

  useEffect(() => {
    if (paciente) {
      setFormData({
        fecha: paciente.fecha || '',
        hora: paciente.hora || '',
        nombre: paciente.nombre || '',
        telefono: paciente.telefono || '',
        consulta: paciente.consulta || '',
        doctor: paciente.doctor || '',
        radiografias: paciente.radiografias || '',
        ambulancia: paciente.ambulancia || '',
        ingresos: paciente.ingresos || '',
        egresos: paciente.egresos || ''
      });
    }
  }, [paciente]);

  const handleChange = (e) => {
    const { id, value } = e.target;
  
    setFormData(prevData => ({
      ...prevData,
      [id]: id === 'ambulancia' ? (value === 'Sí') : value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre) {
        toast.error("El nombre del paciente es requerido.");
        return;
    }

    const url = paciente 
      ? `/api/pacientes/${paciente.id}`  // PUT a la ruta con el ID del paciente
      : '/api/pacientes';                // POST para crear un nuevo paciente
   
    try {
      const response = await fetch(url, {
        method: paciente ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const updatedPaciente = await response.json();
        onAddPaciente(updatedPaciente); // Pasamos el paciente actualizado
        onClose();
      } else {
        const errorData = await response.json();
        console.log('Error Data:', errorData);
        toast.error('Error al enviar los datos: ' + (errorData.error || response.statusText));
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error('Error en la solicitud: ' + error.message);
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
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg w-full">
          {/* Organiza los campos usando grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fecha */}
            <div className="mb-4 floating-label">
              <input
                type="date"
                id="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="fecha">Fecha</label>
            </div>

            {/* Hora */}
            <div className="mb-4 floating-label">
              <input
                type="time"
                id="hora"
                value={formData.hora}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="hora">Hora</label>
            </div>

            {/* Nombre */}
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="nombre"
                value={formData.nombre}
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
                value={formData.telefono}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="telefono">Teléfono</label>
            </div>

            {/* Consulta */}
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="consulta"
                value={formData.consulta}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="consulta">Consulta</label>
            </div>

            {/* Doctor */}
            <div className="mb-4 floating-label">
              <input
                type="text"
                id="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="doctor">Doctor</label>
            </div>

            {/* Radiografías */}
            <div className="mb-4 floating-label">
              <input
                type="number"
                id="radiografias"
                value={formData.radiografias}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="radiografias">Radiografías</label>
            </div>

            {/* Ambulancia */}
            <div className="mb-4 floating-label">
              <select
                id="ambulancia"
                value={formData.ambulancia ? 'Sí' : 'No'}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Seleccionar</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label htmlFor="ambulancia">Ambulancia</label>
            </div>

            {/* Ingresos */}
            <div className="mb-4 floating-label">
              <input
                type="number"
                id="ingresos"
                value={formData.ingresos}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="ingresos">Ingresos</label>
            </div>

            {/* Egresos */}
            <div className="mb-4 floating-label">
              <input
                type="number"
                id="egresos"
                value={formData.egresos}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="egresos">Egresos</label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4"
          >
            {paciente ? 'Actualizar Paciente' : 'Agregar Paciente'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
