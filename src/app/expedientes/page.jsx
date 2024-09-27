"use client";

import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import fileIcon from "@/assets/file.svg"
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "antd";
import Image from "next/image";
import importFile from "@/assets/import.svg"

export default function Expedientes() {
  const [file, setFile] = useState(null);
  const [nombre, setNombre] = useState("");
  const [message, setMessage] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [expedientes, setExpedientes] = useState([]); // Estado para almacenar los expedientes
  const pageSize = 6; // Número de elementos por página

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSide = () => {
    setIsSideOpen(!isSideOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("nombre", nombre); // Agregar el nombre del expediente al FormData

    const res = await fetch("/api/expedientes", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setDownloadURL(data.url);
      setNombre("");
      toast.success("Archivo subido con exito!");
      fetchExpedientes(); // Actualizar la lista de expedientes
    } else {
      toast.error("Fallo al subir el archivo");
    }
  };

  
  
  useEffect(() => {
    const fetchExpedientes = async () => {
      try {
        const res = await fetch('/api/expedientes');
        const data = await res.json();
        if (res.ok) {
          setExpedientes(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Error al obtener los expedientes.');
      }
    };

    fetchExpedientes();
  }, [downloadURL]);

  

  const filteredExpedientes = expedientes.filter(
    (expediente) =>
      expediente.nombre && expediente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentExpedientes = filteredExpedientes.slice(startIndex, endIndex);

  return (
    <div>
      <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />
      <Navbar handleSide={handleSide} />
      <ToastContainer theme="light" autoClose={2000} />
      <div className="flex w-[900px] m-auto items-center justify-between">
        <div className="mt-5 rounded-xl shadow w-[550px] m-auto p-2 border bg-blue-500 text-white font-poppins ">
          <h2>Subir Expediente</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre del expediente"
              className="rounded-lg text-blue-500 mr-1"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} // Actualizar el estado del nombre
            />
            <input
              type="file"
              className="rounded-lg w-[150px] "
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              className="ml-5 bg-white text-blue-500 p-2 rounded-lg absolute "
              type="submit"
            >
            <div className="flex">
            <Image src={importFile} alt="import" />
            <p>Subir Archivo</p>
            </div>
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-[40px] rounded-lg border-blue-500 mt-10 placeholder:text-blue-500"
          placeholder="Buscar..."
          type="text"
        />
      </div>

      <div className='w-[900px] m-auto bg-blue-500 shadow text-white mt-5 text-lg border-b-2 border-b-white rounded-md' >
      <h2 className='p-1'>Lista de Expedientes</h2>
      
      <div className='w-[900px] m-auto shadow border-t'>
        <table className="w-full m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-white uppercase font-poppins bg-blue-500">
            <tr>
            <th scope="col" className="px-2 py-3 w-[120px]">Fecha</th>
              <th scope="col" className="px-2 py-3 w-[120px]">Nombre del expediente</th>
              <th scope="col" className="px-2 py-3 w-[120px]">Archivo</th>
            </tr>
          </thead>
          {currentExpedientes.map(expediente => (
          <tbody key={expediente.id}>
            <tr className='shadow bg-white '>
              <td className="px-6 py-4">{new Date(expediente.createdAt).toLocaleDateString("es-ES")}</td>
              <td className="px-6 py-4">{expediente.nombre}</td>
              <td className="px-6 py-4 flex"><a className='bg-blue-500 p-2 rounded-lg text-white text-base flex' href={expediente.url} target='_blank' >
              <Image className="mr-1" src={fileIcon} alt="file" />
              Ver archivo
              </a></td>
            </tr>
          </tbody>
        ))}

        </table>
      </div>
      <ul>
        
      </ul>
    </div>

      {/* Paginación de Ant Design */}
      <div className="flex justify-center mt-5">
        {expedientes.length > pageSize && (
          <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={expedientes.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        )}
      </div>
    </div>
  );
}
