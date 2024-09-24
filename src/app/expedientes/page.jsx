"use client"
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import React, { useState } from "react";

export default function Expedientes() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSide = () => {
    setIsSideOpen(!isSideOpen);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div>
      <Sidebar handleSide={handleSide} isSideOpen={isSideOpen} />
      <Navbar handleSide={handleSide} />
    </div>
  );
}
