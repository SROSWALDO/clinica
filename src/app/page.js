"use client";
import Image from "next/image";
import more from "../assets/new.png";
import edit from "../assets/edit.svg";
import { useState } from "react";
import Formulario from "@/Components/Formulario";
import data from '../api.json'
import { Pagination } from "antd";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacientes, setPacientes] = useState(data);

  const [isSideOpen, setIsSideOpen] = useState(false)

  const handleSide = () => {
    setIsSideOpen(!isSideOpen)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const startIndex = (currentPage - 1) * pageSize; //0
  const endIndex = startIndex + pageSize; //6
  const currentTasks = pacientes.slice(startIndex, endIndex);

  //Para la página 1, slice(0, 6) devuelve: [0, 1, 2, 3, 4, 5].
  //Para la página 2, slice(6, 12) devuelve: [6, 7, 8, 9, 10, 11].

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="font-poppins">
    {isSideOpen && (
      <Sidebar handleSide={handleSide} />
    )}
    <Navbar handleSide={handleSide} />

    

      <div className="mt-5 ml-10">
        {isModalOpen && (
          <Formulario id="default-modal" onClose={handleCloseModal} isModalOpen={isModalOpen} />
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

      <div className="mt-10 w-[1500px] m-auto ">
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
            <tbody>
            {currentTasks.map(paciente => (
              <tr key={paciente.nombre} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>{paciente.Fecha}</p>
                  <p>{paciente.Hora}</p>
                </th>
                <td className="px-6 py-4">{paciente.Nombre}</td>
                <td className="px-6 py-4">{paciente.Telefono}</td>
                <td className="px-6 py-4">{paciente.Consulta}</td>
                <td className="px-6 py-4">{paciente.Doctor}</td>
                <td className="px-6 py-4 text-center">{paciente.Radiografias}</td>
                <td className="px-6 py-4 text-center ">{paciente.Ambulancia}</td>
                <td className="px-6 py-4">${paciente.Ingresos}</td>
                <td className="px-6 py-4">${paciente.Egresos}</td>
                <td className="px-6 py-4">
                  <Image
                    className="w-[30px] m-auto"
                    src={edit}
                    alt="edit"
                  />
                </td>
              </tr>

            ))}
              
              
            </tbody>
          </table>
        </div>

        {pacientes.length > pageSize && (
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
