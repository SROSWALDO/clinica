"use client";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export default function Citas() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    // Cargar los estilos de Bootstrap
    const bootstrapStyles = document.createElement("link");
    bootstrapStyles.rel = "stylesheet";
    bootstrapStyles.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapStyles);

    // Eliminar los estilos de Bootstrap al desmontar el componente
    return () => {
      document.head.removeChild(bootstrapStyles);
    };
  }, []);

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

    // Obtener la fecha y hora inicial y final
    const { fecha, horaFin } = formData;

    // Combinar la fecha y la hora en un solo string
    const fechaInicioStr = `${fecha}`; // Usamos el string tal cual porque ya viene en formato ISO
    const horaFinStr = `${horaFin}`; // Lo mismo aquí

    // Crear objetos de fecha ajustados
    const fechaInicioDate = new Date(fechaInicioStr);
    const horaFinDate = new Date(horaFinStr);

    try {
        const response = await fetch("/api/citas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                fecha: fechaInicioDate.toISOString(),  // Enviar fecha ajustada
                horaFin: horaFinDate.toISOString(),    // Enviar hora de fin ajustada
            }),
        });

        if (response.ok) {
            const newCita = await response.json();
            
            // Formatear la cita de la misma forma que las citas existentes
            const formattedCita = {
                title: `${newCita.paciente} - ${newCita.descripcion} - ${newCita.telefono}`,
                start: newCita.fecha,
                end: newCita.horaFin,
                allDay: false,
            };

            // Agregar la nueva cita al estado del calendario
            localStorage.setItem("citas", JSON.stringify([...citas, formattedCita]));
            setCitas((prevCitas) => [...prevCitas, formattedCita]);
            toast.success("Cita creada con éxito!");

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
          console.log("Citas obtenidas:", data);

          // Formatear las citas para el calendario
          const citasFormatted = data.map((cita) => ({
            title: `${cita.paciente} - ${cita.descripcion} - ${cita.telefono}`,
            start:cita.fecha,
            end: cita.horaFin,
            allDay: false,
          }));
          setCitas(citasFormatted);
          localStorage.setItem("citas", JSON.stringify(citasFormatted));
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

          <button
            className="bg-blue-500 text-white px-2 rounded-lg hover:bg-blue-600"
            type="submit"
          >
            Crear Cita
          </button>
        </form>
      </div>

      <div
        className="mt-3 border-t-2 pt-3 font-poppins "
        style={{ maxWidth: "1400px", margin: "0 auto" }}
      >
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
          headerClassNames="text-lg font-bold p-2"
          eventClassNames="bg-blue-500 text-white rounded-lg h-[54px]  items-center p-2 transition-transform duration-200 transform hover:scale-105"
          dayCellClassNames="border transition duration-150"
        />
      </div>
      <ToastContainer theme="light" autoClose={2000} />
    </div>
  );
}
