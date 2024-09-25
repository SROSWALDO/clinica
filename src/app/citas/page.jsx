"use client";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Citas() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [citas, setCitas] = useState([]);

  const [formData, setFormData] = useState({
    paciente: "",
    telefono: "",
    descripcion: "",
    fecha: "",
    horaFin: "",
  });

  const handleSide = () => {
    setIsSideOpen(!isSideOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newCita = await response.json();

        // Formatear la cita de la misma forma que las citas existentes
        const formattedCita = {
          title: `${newCita.paciente} - ${newCita.descripcion} - ${newCita.telefono}` ,
          start: new Date(newCita.fecha),
          end: new Date(newCita.horaFin),
          allDay: false,
        };

        // Agregar la nueva cita al estado del calendario
        setCitas((prevCitas) => [...prevCitas, formattedCita]);

        // Limpiar el formulario
        setFormData({
          paciente: "",
          telefono: "",
          descripcion: "",
          fecha: "",
          horaFin: "",
        });
      } else {
        console.error("Error al crear la cita");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    // Obtener las citas desde la API
    const fetchCitas = async () => {
      try {
        const response = await fetch("/api/citas");
        if (response.ok) {
          const data = await response.json();

          // Formatear las citas para el calendario
          const citasFormatted = data.map((cita) => ({
            title: `${cita.paciente} - ${cita.descripcion} - ${newCita.telefono}`,
            start: new Date(cita.fecha),
            end: new Date(cita.horaFin),
            allDay: false,
          }));
          setCitas(citasFormatted);
        } else {
          console.error("Error al obtener las citas");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchCitas();
  }, []);

  return (
    <div>
      <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />
      <Navbar handleSide={handleSide} />

      <div className="flex justify-center mt-4">
        <form className="flex" onSubmit={handleSubmit}>
          <div className="floating-label w-[250px] mr-3">
            <input
              type="text"
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
              className="rounded-lg border-blue-500 "
            />
            <label htmlFor="">Paciente</label>
          </div>

          <div className="floating-label w-[250px] mr-3">
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="rounded-lg border-blue-500 "
            />
            <label htmlFor="">Telefono</label>
          </div>

          <div className="floating-label w-[250px] mr-3">
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="rounded-lg border-blue-500 mr-3 "
            />
            <label htmlFor="">Descripcion</label>
          </div>

          <div className="floating-label w-[250px] mr-3">
          <input
            type="datetime-local"
            name="fecha"
            id="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="rounded-lg border-blue-500 mr-3 "
          />
          <label htmlFor="">Fecha inicio</label>
          </div>
          
          <div className="floating-label w-[250px] mr-5">
          <input
            type="datetime-local"
            name="horaFin"
            value={formData.horaFin}
            id="horaFin"
            onChange={handleChange}
            className="rounded-lg border-blue-500 mr-3 "
          />
          <label htmlFor="">Fecha fin</label>
          </div>

          <button className="bg-blue-500 text-white px-2 rounded-lg" type="submit">Crear Cita</button>
        </form>
      </div>

      <div className="mt-3 border-t-2 pt-3 " style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrap5Plugin,
          ]}
          initialView="dayGridMonth"
          themeSystem="bootstrap5"
          events={citas}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
      </div>
    </div>
  );
}
