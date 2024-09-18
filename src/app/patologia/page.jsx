"use client";
import Navbar from "@/Components/Navbar";
import PatologiaForm from "@/Components/PatologiaForm";
import Sidebar from "@/Components/Sidebar";
import more from "../../assets/new.png";
import { useState } from "react";
import Image from "next/image";

export default function Patologia() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSide = () => {
    setIsSideOpen(!isSideOpen);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="font-poppins">
      <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />
      <Navbar handleSide={handleSide} />

      <div>
      <div className="mt-5 ml-10">
        {isModalOpen && (
          <PatologiaForm id="default-modal" onClose={handleCloseModal} isModalOpen={isModalOpen} />
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

      </div>

      <div className="m-auto w-[1500px] mt-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-white uppercase font-poppins bg-blue-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Telefono
                </th>
                <th scope="col" className="px-6 py-3">
                  Pieza
                </th>
                <th scope="col" className="px-6 py-3">
                  Costo
                </th>
                <th scope="col" className="px-6 py-3">
                  Recibido
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  17/09/2024
                </th>
                <td>Alejandro Cruz Reyes</td>
                <td>7551043567</td>
                <td>Vesicula</td>
                <td>$2300</td>
                <td>
                  <input className="flex justify-center items-center m-auto" type="checkbox" name="" id="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
