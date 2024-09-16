"use client";
import Image from "next/image";
import more from "../assets/new.png";
import edit from "../assets/edit.svg";
import { useEffect, useState } from "react";
import Formulario from "@/Components/Formulario";
import { Pagination } from "antd";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import trash from '@/assets/trash.svg'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const handleSide = () => {
    setIsSideOpen(!isSideOpen)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const agregarPaciente = (nuevoPaciente) => {
    setPacientes(prevPacientes => [...prevPacientes, nuevoPaciente]);
  };

  const deletePaciente = async (id) => {
    try {
      // Realiza una petición DELETE al endpoint con el ID del paciente
      const response = await fetch(`/api/pacientes/${id}`, {
        method: 'DELETE', // Usa el método DELETE
      });
  
      // Verifica si la respuesta fue exitosa
      if (response.ok) {
        // Elimina el paciente del estado local si la petición fue exitosa
        setPacientes(pacientes.filter(paciente => paciente.id !== id));
      } else {
        // Si el servidor devuelve un error, muestra un mensaje
        console.log("Error al eliminar el paciente.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch('/api/pacientes');
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error('Error fetching pacientes:', error);
      }
    };
  
    fetchPacientes();
  }, []);

  const filteredPacientes = pacientes.filter((paciente) => 
    paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize; //0
  const endIndex = startIndex + pageSize; //6
  const currentTasks = filteredPacientes.slice(startIndex, endIndex);

  //Para la página 1, slice(0, 6) devuelve: [0, 1, 2, 3, 4, 5].
  //Para la página 2, slice(6, 12) devuelve: [6, 7, 8, 9, 10, 11].

  return (
    <div className="font-poppins">
    
    <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />
    
    <Navbar handleSide={handleSide} />

    

      <div className="flex justify-between items-center">
      <div className="mt-5 ml-10">
        {isModalOpen && (
          <Formulario id="default-modal" onClose={handleCloseModal} isModalOpen={isModalOpen} onAddPaciente={agregarPaciente} />
        )}
        <button
          type="button"
          onClick={handleOpenModal}
          className="flex items-center p-1 px-2 shadow-lg shadow-gray-300 border border-gray-200 rounded-xl bg-white text-blue-600 font-medium "
        >
          <Image className="w-[30px] mr-2 " src={more} alt="new" />
          Nuevo Registro
        </button>
      </div>

      <div>
        <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
         className="mt-5 mr-6 rounded-lg border-blue-500 text-blue-400 placeholder:text-blue-400  " type="text" placeholder="Buscar..." />
        
      </div>

      </div>

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
            <tbody key={paciente.nombre + index } >
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>{new Date(paciente.fecha).toLocaleDateString('es-ES')}</p>
                  <p>{paciente.hora}</p>
                </th>
                <td className="px-6 py-4">{paciente.nombre}</td>
                <td className="px-6 py-4">{paciente.telefono}</td>
                <td className="px-6 py-4">{paciente.consulta}</td>
                <td className="px-6 py-4">{paciente.doctor}</td>
                <td className="px-6 py-4 text-center">{paciente.radiografias}</td>
                <td className="px-6 py-4 text-center ">{paciente.ambulancia  ? "Si" : "No" }</td>
                <td className="px-6 py-4">${paciente.ingresos}</td>
                <td className="px-6 py-4">${paciente.egresos}</td>
                <td className="px-6 py-4 flex">
                  <Image
                    className="w-[30px] m-auto cursor-pointer "
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
        ) }

      </div>
    </div>
  );
}
