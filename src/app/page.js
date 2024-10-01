"use client";
import Image from "next/image";
import more from "../assets/new.png";
import edit from "../assets/edit.svg";
import { useEffect, useState } from "react";
import Formulario from "@/Components/Formulario";
import { Pagination } from "antd";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import trash from "@/assets/trash.svg";
import corte from "@/assets/corte.svg";
import pulse from "@/assets/pulse.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Corte from "@/Components/Corte";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [paciente, setPaciente] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalEgresos, setTotalEgresos] = useState(0);
  const [totalCorte, setTotalCorte] = useState(0);
  const [isCorteOpen, setIsCorteOpen] = useState(false);
  const [corteNombre, setCorteNombre] = useState("");

  const handleSide = () => {
    setIsSideOpen(!isSideOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => {
    // Reinicia el estado paciente antes de abrir el modal
    setPaciente(null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenCorte = () => setIsCorteOpen(true);
  const handleCloseCorte = () => setIsCorteOpen(false);

  const agregarPaciente = (nuevoPaciente) => {
    if (!nuevoPaciente || !nuevoPaciente.nombre) {
      toast.error("Error: El nombre del paciente es requerido.");
      return;
    }

    const primerNombre = nuevoPaciente.nombre.split(" ")[0];
    console.log(nuevoPaciente.fecha);
    

    let mensaje;

    setPacientes((prevPacientes) => {
      // Verificar si el paciente ya existe en la lista
      const pacienteExistente = prevPacientes.find(
        (p) => p.id === nuevoPaciente.id
      );

      if (pacienteExistente) {
        // Si existe, actualizar los datos del paciente en la lista
        mensaje = `Paciente ${primerNombre} actualizado!!`;
        return prevPacientes.map((p) =>
          p.id === nuevoPaciente.id ? nuevoPaciente : p
        );
      } else {
        // Si no existe, agregar el nuevo paciente a la lista
        mensaje = `Paciente ${primerNombre} creado!!`; // Asigna el mensaje aquí
        return [...prevPacientes, nuevoPaciente];
      }
    });

    // Mostrar el mensaje de éxito usando la información correcta
    toast.success(mensaje);
  };

  const deletePaciente = async (id) => {
    try {
      // Realiza una petición DELETE al endpoint con el ID del paciente
      const response = await fetch(`/api/pacientes/${id}`, {
        method: "DELETE", // Usa el método DELETE
      });

      // Verifica si la respuesta fue exitosa
      if (response.ok) {
        // Elimina el paciente del estado local si la petición fue exitosa
        setPacientes(pacientes.filter((paciente) => paciente.id !== id));
        setCurrentPage(1);
      } else {
        // Si el servidor devuelve un error, muestra un mensaje
        console.log("Error al eliminar el paciente.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updatePaciente = async (id) => {
    try {
      const response = await fetch(`/api/pacientes/${id}`);
      const data = await response.json();
      setPaciente(data);
      setIsModalOpen(true);
      console.log(paciente);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch("/api/pacientes");
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error("Error fetching pacientes:", error);
      }
    };
    
    fetchPacientes();
  }, []);

  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize; //0
  const endIndex = startIndex + pageSize; //6
  const currentTasks = filteredPacientes.slice(startIndex, endIndex);
  //Para la página 1, slice(0, 6) devuelve: [0, 1, 2, 3, 4, 5].
  //Para la página 2, slice(6, 12) devuelve: [6, 7, 8, 9, 10, 11].

  const crearCorte = async () => {
    if (!corteNombre.trim()) {
      toast.error("El nombre del corte es obligatorio.");
      return;
    }
  
    // Filtrar pacientes que aún no tienen un corteId
    const pacientesSinCorte = pacientes.filter((paciente) => !paciente.corteId);
  
    const ingresos = pacientesSinCorte.map((paciente) => Number(paciente.ingresos));
    const egresos = pacientesSinCorte.map((paciente) => Number(paciente.egresos));
    const totalIngresos = pacientesSinCorte.reduce(
      (total, paciente) => total + Number(paciente.ingresos),
      0
    );
    const totalEgresos = pacientesSinCorte.reduce(
      (total, paciente) => total + Number(paciente.egresos),
      0
    );
    const total = totalIngresos - totalEgresos;
  
    setIngresos(ingresos);
    setEgresos(egresos);
    setTotalIngresos(totalIngresos);
    setTotalEgresos(totalEgresos);
    setTotalCorte(total);
  
    try {
      const response = await fetch("/api/cortes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: corteNombre,
          ingresos: JSON.stringify(ingresos),
          totalIngresos: totalIngresos,
          egresos: JSON.stringify(egresos),
          totalEgresos: totalEgresos,
          total: total,
        }),
      });
  
      if (!response.ok) {
        console.error("Error al crear el corte");
        return;
      }
  
      // Obtener el ID del corte recién creado
      const corteData = await response.json();
      const corteId = corteData.id;
  
      // Actualizar los pacientes sin corteId asignado
      const updateResponse = await fetch("/api/pacientes/actualizarCorte", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ corteId: corteId }),
      });
  
      if (!updateResponse.ok) {
        console.error("Error al actualizar los pacientes con corteId");
      } else {
        // Limpiar el nombre del corte
        setCorteNombre("");
  
        // Actualizar el estado de los pacientes para excluir los que se incluyeron en el corte
        setPacientes((prevPacientes) =>
          prevPacientes.map((paciente) =>
            paciente.corteId ? paciente : { ...paciente, corteId: corteId }
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  
    setIsCorteOpen(true);
  };
  
  return (
    <div className="font-poppins">
      <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />

      <Navbar handleSide={handleSide} />

      <div className="flex justify-between items-center">
        <div className="mt-5 ml-10">
          {isModalOpen && (
            <Formulario
              id="default-modal"
              onClose={handleCloseModal}
              isModalOpen={isModalOpen}
              onAddPaciente={agregarPaciente}
              paciente={paciente}
            />
          )}
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex items-center p-1 px-2 shadow-lg shadow-gray-300 border border-gray-200 rounded-xl bg-white text-blue-600 font-medium hover:shadow-blue-300 "
          >
            <Image className="w-[30px] mr-2 " src={more} alt="new" />
            Nuevo Registro
          </button>
        </div>

        {isCorteOpen && (
          <Corte
            id="default-modal"
            totalIngresos={totalIngresos}
            totalEgresos={totalEgresos}
            ingresos={ingresos}
            egresos={egresos}
            total={totalCorte}
            onClose={handleCloseCorte}
            isCorteOpen={isCorteOpen}
          />
        )}

        <div className="flex">
          <div className="mt-5 flex mr-5">
            <input
            value={corteNombre}
            required
            onChange={(e) => setCorteNombre(e.target.value) }
              className="rounded-lg border-blue-500 text-blue-400 placeholder:text-blue-400 items-center mr-2"
              type="text"
              placeholder="Nombre del cohorte"
            />
            <button
              onClick={crearCorte}
              className="bg-blue-500 text-white p-2 rounded-lg mr-4 flex hover:bg-blue-600"
            >
              Crear cohorte
              <Image className="ml-1" src={corte} alt="corte" />
            </button>
          </div>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-5 mr-6 rounded-lg border-blue-500 text-blue-400 placeholder:text-blue-400 items-center  "
            type="text"
            placeholder="Buscar..."
          />
        </div>
      </div>

      {pacientes.length == 0 ? (
        <div className="flex justify-center items-center mt-52 text-4xl font-medium text-blue-500 ">
          <p className="">No hay pacientes...</p>
          <Image className="ml-1 w-[50px]" src={pulse} alt="pulse" />
        </div>
      ) : (
        <div className="mt-5 w-[1500px] m-auto ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-white uppercase font-poppins bg-blue-500">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Fecha y Hora
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Telefono
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Consulta
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Doctor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Radiografias
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ambulancia
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ingresos
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Egresos
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {currentTasks.map((paciente, index) => (
                <tbody key={paciente.nombre + index}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <p>
                      <p>{new Date(paciente.fecha).toISOString().split('T')[0]}</p>
                      </p>
                      <p>{paciente.hora}</p>
                    </th>
                    <td className="px-6 py-4">{paciente.nombre}</td>
                    <td className="px-6 py-4">{paciente.telefono}</td>
                    <td className="px-6 py-4">{paciente.consulta}</td>
                    <td className="px-6 py-4">{paciente.doctor}</td>
                    <td className="px-6 py-4 text-center">
                      {paciente.radiografias}
                    </td>
                    <td className="px-6 py-4 text-center ">
                      {paciente.ambulancia ? "Si" : "No"}
                    </td>
                    <td className="px-6 py-4">${paciente.ingresos}</td>
                    <td className="px-6 py-4">${paciente.egresos}</td>
                    <td className="px-6 py-4 flex">
                      <Image
                        className="w-[30px] m-auto cursor-pointer "
                        onClick={() => updatePaciente(paciente.id)}
                        src={edit}
                        alt="edit"
                      />
                      <Image
                        onClick={() => deletePaciente(paciente.id)}
                        className="w-[30px] cursor-pointer"
                        src={trash}
                        alt="trash"
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>

          {filteredPacientes.length > pageSize && (
            <Pagination
              className="flex justify-center mt-4"
              current={currentPage}
              pageSize={pageSize}
              total={pacientes.length}
              onChange={handlePageChange}
            />
          )}
        </div>
      )}
      <ToastContainer theme="light" autoClose={2000} />
    </div>
  );
}
