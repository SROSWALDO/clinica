"use client";
import Navbar from "@/Components/Navbar";
import PatologiaForm from "@/Components/PatologiaForm";
import Sidebar from "@/Components/Sidebar";
import more from "../../assets/new.png";
import { useEffect, useState } from "react";
import Image from "next/image";
import trash from "@/assets/trash.svg";

export default function Patologia() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patologia, setPatologia] = useState([]);

  const handleSide = () => {
    setIsSideOpen(!isSideOpen);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const crearPatologia = (patologia) => {
    setPatologia((prevPatologia) => {
      return [...prevPatologia, patologia];
    });
  };

  useEffect(() => {
    const fetchPatologias = async () => {
      try {
        const response = await fetch("/api/patologia");
        const data = await response.json();

        setPatologia(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPatologias();
  }, []);

  return (
    <div className="font-poppins">
      <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />
      <Navbar handleSide={handleSide} />

      <div>
        <div className="mt-5 ml-10">
          {isModalOpen && (
            <PatologiaForm
              id="default-modal"
              onClose={handleCloseModal}
              isModalOpen={isModalOpen}
              crearPatologia={crearPatologia}
            />
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
                <th scope="col" className="px-2 py-3 w-[120px]">
                  Fecha
                </th>
                <th scope="col" className="px-2 py-3 w-[295px] ">
                  Nombre
                </th>
                <th scope="col" className="px-2 py-3 w-[200px] ">
                  Telefono
                </th>
                <th scope="col" className="px-2 py-3 w-[190px] ">
                  Pieza
                </th>
                <th scope="col" className="px-2 py-3 w-[150px]  ">
                  Costo
                </th>
                <th scope="col" className="px-2 py-3 w-[150px]">
                  Recibido
                </th>
                <th scope="col" className="px-2 py-3 w-[100px] text-center">Action</th>
              </tr>
            </thead>
            {patologia.map((pato) => (
              <tbody key={pato.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {new Date(pato.fecha).toLocaleDateString("es-ES")}
                  </th>
                  <td>{pato.nombre}</td>
                  <td>{pato.telefono}</td>
                  <td>{pato.pieza}</td>
                  <td>${pato.costo}</td>
                  <td>
                    <p
                      className={`${
                        pato.recibido
                          ? "bg-green-400 text-green-200 "
                          : "bg-red-400 text-red-200"
                      } w-[100px] text-center rounded-lg py-1  `}
                    >
                      {pato.recibido ? "Recibido" : "No Recibido"}
                    </p>
                  </td>
                  <td>
                    <Image className="m-auto w-[30px] cursor-pointer hover:scale-105 transition-all" src={trash} alt="delete"></Image>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
