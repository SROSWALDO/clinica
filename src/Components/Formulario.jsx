import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import print from "@/assets/print.svg";
import Image from "next/image";
import ReactToPrint from "react-to-print";

export default function Formulario({
  isModalOpen,
  onClose,
  onAddPaciente,
  paciente,
}) {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    nombre: "",
    telefono: "",
    consulta: "",
    doctor: "",
    radiografias: 0,
    ambulancia: false,
    ingresos: 0,
    egresos: 0,
  });

  const componentRef = useRef();

  useEffect(() => {
    if (paciente) {
      const formattedDate = new Date(paciente.fecha)
        .toISOString()
        .split("T")[0];
      setFormData({
        fecha: formattedDate || "",
        hora: paciente.hora || "",
        nombre: paciente.nombre || "",
        telefono: paciente.telefono || "",
        consulta: paciente.consulta || "",
        doctor: paciente.doctor || "",
        radiografias: paciente.radiografias || 0,
        ambulancia: paciente.ambulancia || false,
        ingresos: paciente.ingresos || 0,
        egresos: paciente.egresos || 0,
      });
    }
  }, [paciente]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "ambulancia"
          ? value === "true"
          : name === "ingresos" || name === "egresos" || name === "radiografias"
          ? parseInt(value, 10)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre) {
      toast.error("El nombre del paciente es requerido.");
      return;
    }
    console.log("Datos a enviar:", formData);

    const url = paciente
      ? `/api/pacientes/${paciente.id}` // PUT a la ruta con el ID del paciente
      : "/api/pacientes"; // POST para crear un nuevo paciente

    try {
      const response = await fetch(url, {
        method: paciente ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedPaciente = await response.json();
        onAddPaciente(updatedPaciente); // Pasamos el paciente actualizado
        setFormData({
          fecha: "",
          hora: "",
          nombre: "",
          telefono: "",
          consulta: "",
          doctor: "",
          radiografias: 0,
          ambulancia: false,
          ingresos: 0,
          egresos: 0,
        });
        onClose();
      } else {
        const errorData = await response.json();
        console.log("Error Data:", errorData);
        toast.error(
          "Error al enviar los datos: " +
            (errorData.error || response.statusText)
        );
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error en la solicitud: " + error.message);
    }
  };

  return (
    <div>
      <Modal open={isModalOpen} onCancel={onClose} width={800} footer={null}>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg w-full"
        >
          {/* Organiza los campos usando grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fecha */}
            <div className="mb-4 floating-label">
              <input
                type="date"
                id="fecha"
                name="fecha"
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
                name="hora"
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
                name="nombre"
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
                name="telefono"
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
                name="consulta"
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
                name="doctor"
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
                name="radiografias"
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
                name="ambulancia"
                value={formData.ambulancia ? "true" : "false"}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Seleccionar</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
              <label htmlFor="ambulancia">Ambulancia</label>
            </div>

            {/* Ingresos */}
            <div className="mb-4 floating-label">
              <input
                type="number"
                id="ingresos"
                name="ingresos"
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
                name="egresos"
                value={formData.egresos}
                onChange={handleChange}
                className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500 w-full"
              />
              <label htmlFor="egresos">Egresos</label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 "
          >
            {paciente ? "Actualizar Paciente" : "Agregar Paciente"}
          </button>
        </form>

        {/* Componente para imprimir */}
        <div ref={componentRef} className="printable-content">
          <h1 className="text-center text-base font-bold mb-2 text-blue-500 ">
            SERVICIO MEDICO CRISTO MEDICO
          </h1>
          <p className="text-[8px] text-center">
            CIRUGIA GENERAL • CONSULTAS • URGENCIAS • ULTRASONIDOS
          </p>
          <p className="text-center text-sm mt-2">
            Dr. Luis Abelardo Sotelo Vargas
          </p>
          <p className="text-center text-xs">MEDICO CIRUJANO</p>
          <p className="text-center">Cedula Profesional: 8926487</p>

          <p className="text-center">
            Calle Topacio No.19 Colonia Centro, C.P.40880 Zihuatanejo Guerrero
          </p>
          <p className="text-center">Tel. 755 119 65 07</p>

          <p className="mt-3 text-center">
            Fecha:{" "}
            {new Date(formData.fecha).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="mt-5 text-center">
            <p className="">Recibo: ${formData.ingresos}</p> 
          </p>

          <p className="text-base text-center">Recibimos de {formData.nombre}</p>
          <p className="text-center">La cantidad de: ${formData.ingresos}</p>
          <p className="text-center">En concepto de: {formData.consulta}</p>

          <div className="mt-14 border-t border-t-black w-[180px] m-auto">
            <p className="text-center">Firma de recibido</p>
          </div>
        </div>

        {paciente && (
          <ReactToPrint
            trigger={() => (
              <button className="button-imp absolute bottom-[55px] right-16 bg-blue-500 text-white p-2 rounded-lg flex hover:bg-blue-600">
                <Image className="mr-1" src={print} alt="print" />
                Imprimir Recibo
              </button>
            )}
            content={() => componentRef.current}
          />
        )}
      </Modal>
      <style jsx>{`
        @media print {
          .printable-content {
            display: block !important;
            width: 80mm;
          }
        }

        @media screen {
          .printable-content {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
