"use client";
import FileList from "@/Components/FileList";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Expedientes() {
  const [file, setFile] = useState(null);
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState('');
  const [downloadURL, setDownloadURL] = useState('');
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSide = () => {
    setIsSideOpen(!isSideOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('nombre', nombre);  // Agregar el nombre del expediente al FormData

    const res = await fetch('/api/expedientes', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setDownloadURL(data.url);
      setNombre("")
      toast.success("Archivo subido con exito!")
    } else {
      toast.error("Fallo al subir el archivo")
    }
  };
  
  return (
    <div>
    <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />
    <Navbar handleSide={handleSide} />
    <ToastContainer/>
      <div className="mt-5  rounded-xl shadow w-[550px] m-auto p-2 border bg-blue-500 text-white font-poppins ">
      <h2>Subir Expediente</h2>
      <form onSubmit={handleSubmit}>
      <input 
          type="text" 
          placeholder="Nombre del expediente" 
          className="rounded-lg text-blue-500 mr-1"
          required
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)}  // Actualizar el estado del nombre
        />
        

        <input 
          type="file" 
          className="rounded-lg w-[150px] "
          onChange={(e) => setFile(e.target.files[0])} 
        />
        
        <button className="ml-5 bg-white text-blue-500 p-2 rounded-lg" type="submit">Subir Archivo</button>
      </form>
      {message && <p>{message}</p>}
      
      </div>

      <FileList downloadURL={downloadURL}/>

    </div>
  );
}
