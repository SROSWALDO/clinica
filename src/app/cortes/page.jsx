"use client";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import React, { useEffect, useState } from "react";
import x from '@/assets/x.svg'
import Image from "next/image";
import corte from '@/assets/corte2.svg'

export default function Cortes() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cortes, setCortes] = useState([]);

  const handleSide = () => {
    setIsSideOpen(!isSideOpen);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchCortes = async () => {
      try {
        const response = await fetch("/api/cortes");
        const data = await response.json();
        console.log(data);
        setCortes(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCortes();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const deleteCorte = async (id) => {
    try {
      const response = await fetch(`/api/cortes/${id}`, {
        method: "DELETE",
      });

      if(response.ok){
        setCortes(cortes.filter(corte => corte.id !== id ))
      } else {
        // Si el servidor devuelve un error, muestra un mensaje
        console.log("Error al eliminar el corte.");
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="font-poppins">
      <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />
      <Navbar handleSide={handleSide} />

      <div className="w-[1350px] mt-5 m-auto flex flex-wrap justify-center gap-4">
      {cortes.length === 0 ? (
        <div className="flex items-center justify-center mt-56 text-4xl text-blue-500">
          <h1>No hay Cortes...</h1>
          <Image className="w-[50px]" src={corte} alt="corte" />
        </div>
      ) : (
        cortes.map((corte) => (
          <div
            key={corte.id}
            className="w-[320px] bg-white shadow-lg rounded-xl relative m-2 hover:scale-105 transition-transform cursor-pointer border border-gray-200 hover:shadow-2xl"
          >
            <h1 className="text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-xl py-2 text-lg font-semibold">
              {corte.nombre}
            </h1>

            <Image onClick={() => deleteCorte(corte.id)} src={x} alt="delete" className="absolute right-2 top-2 hover:bg-red-500 rounded-full " />

            <p className="text-center text-gray-500 text-sm p-2">{formatDate(corte.createdAt)}</p>
            <div className="flex justify-between px-4">
              <div className="text-center">
                <p className="text-indigo-600 font-bold uppercase">Ingresos:</p>
                <p className="font-semibold">${corte.totalIngresos}</p>
              </div>
              <div className="text-center">
                <p className="text-red-600 font-bold uppercase">Egresos:</p>
                <p className=" font-semibold font-">${corte.totalEgresos}</p>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-b-xl">
              <p className="text-center text-lg font-bold text-green-600">
                Total: ${corte.total}
              </p>
            </div>
          </div>
        ))
      )}
        
      </div>
    </div>
  );
}
