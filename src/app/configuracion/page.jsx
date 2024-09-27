"use client";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import React, { useState } from "react";
import pacienLogo from "@/assets/userConfig.svg";
import Image from "next/image";
import dna from "@/assets/dna.svg";
import calendar from "@/assets/calendar.svg";
import cohortes from "@/assets/cohortes.svg";
import expedientes from "@/assets/expedien.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Configuracion() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSide = () => {
    setIsSideOpen(!isSideOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const deletePacientes = async () => {
    try {
      const response = await fetch("/api/pacientes", {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Pacientes eliminados correctamente");
      } else {
        toast.error("Error al eliminar los pacientes");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletePatologias = async () => {
    try {
      const response = await fetch("/api/patologia", {
        method: "DELETE"
      });

      if (response.ok) {
        toast.success("Patologias eliminadas correctamente")
      } else{
        toast.error("Error al eliminar las patologias")
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const deleteCitas = async () => {
    try {
      const response = await fetch("/api/citas", {
        method: "DELETE"
      });

      if(response.ok) {
        toast.success("Citas eliminadas correctamente")
      } else {
        toast.error("Error al eliminar las citas")
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const deleteCohortes = async () => {
    try {
      const response = await fetch("/api/cortes", {
        method: "DELETE"
      });
      
      if(response.ok) {
        toast.success("Cohortes eliminados con exito")
      } else {
        toast.error("error al eliminar los cohortes")
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <div>
      <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />
      <Navbar handleSide={handleSide} />
      <ToastContainer />

      <div className="contenedor p-5 font-poppins mt-12">

        <div onClick={deletePacientes} className=" flex rounded-lg w-[800px] shadow border-blue-500 border-2 items-center m-auto hover:scale-105 transition-all cursor-pointer">
          <div className="w-[200px] flex justify-center">
            <Image className="w-[100px]" src={pacienLogo} alt="logo-paciente" />
          </div>

          <div className="bg-blue-500 h-[100px] w-[600px] text-white p-2 ">
            <h1 className="text-2xl mt-2">Lista de Pacientes</h1>
            <p className="text-lg mt-2">
              Al darle click vaciaras la lista de pacientes
            </p>
          </div>
        </div>

        <div onClick={deletePatologias} className=" flex rounded-lg w-[800px] shadow border-blue-500 border-2 items-center m-auto mt-7 hover:scale-105 transition-all cursor-pointer">
          <div className="w-[200px] flex justify-center">
            <Image className="w-[100px]" src={dna} alt="logo-paciente" />
          </div>

          <div className="bg-blue-500 h-[100px] w-[600px] text-white p-2 ">
            <h1 className="text-2xl mt-2">Lista de Patologia</h1>
            <p className="text-lg mt-2">
              Al darle click vaciaras la lista de patologias
            </p>
          </div>
        </div>

        <div onClick={deleteCitas} className=" flex rounded-lg w-[800px] shadow border-blue-500 border-2 items-center m-auto mt-7 hover:scale-105 transition-all cursor-pointer ">
          <div className="w-[200px] flex justify-center">
            <Image className="w-[100px]" src={calendar} alt="logo-paciente" />
          </div>

          <div className="bg-blue-500 h-[100px] w-[600px] text-white p-2 ">
            <h1 className="text-2xl mt-2">Lista de Citas</h1>
            <p className="text-lg mt-2">
              Al darle click vaciaras la lista de citas
            </p>
          </div>
        </div>

        <div onClick={deleteCohortes} className=" flex rounded-lg w-[800px] shadow border-blue-500 border-2 items-center m-auto mt-7 hover:scale-105 transition-all cursor-pointer ">
          <div className="w-[200px] flex justify-center">
            <Image className="w-[100px]" src={cohortes} alt="logo-paciente" />
          </div>

          <div  className="bg-blue-500 h-[100px] w-[600px] text-white p-2 ">
            <h1 className="text-2xl mt-2">Lista de Cohortes</h1>
            <p className="text-lg mt-2">
              Al darle click vaciaras la lista de cohortes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
