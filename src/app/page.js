"use client";
import Image from "next/image";
import more from "../assets/new.png";
import edit from "../assets/edit.svg";
import { useState } from "react";
import Formulario from "@/Components/Formulario";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="font-poppins">
      <div className="mt-5 ml-10">
        {isModalOpen && (
          <Formulario id="default-modal" onClose={handleCloseModal} />
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
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-white uppercase font-poppins bg-blue-500">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Fecha y Hora
                </th>
                <th scope="col" class="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                  Telefono
                </th>
                <th scope="col" class="px-6 py-3">
                  Consulta
                </th>
                <th scope="col" class="px-6 py-3">
                  Doctor
                </th>
                <th scope="col" class="px-6 py-3">
                  Radiografias
                </th>
                <th scope="col" class="px-6 py-3">
                  Ambulancia
                </th>
                <th scope="col" class="px-6 py-3">
                  Ingresos
                </th>

                <th scope="col" class="px-6 py-3">
                  Egresos
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>10-09-2024</p>
                  <p>09:25:00</p>
                </th>
                <td class="px-6 py-4">Anilu Marti Zaldumbide</td>
                <td class="px-6 py-4">4425346712</td>
                <td class="px-6 py-4">Glucosa</td>
                <td class="px-6 py-4">Dr.Sotelo</td>
                <td class="px-6 py-4 text-center">2</td>
                <td class="px-6 py-4 text-center ">Si</td>
                <td class="px-6 py-4">$1500</td>
                <td class="px-6 py-4">$600</td>
                <td class="px-6 py-4">
                  <Image className="w-[30px] m-auto" src={edit} alt="edit" />
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>10-09-2024</p>
                  <p>09:25:00</p>
                </th>
                <td class="px-6 py-4">Karina Reyes</td>
                <td class="px-6 py-4">7551325674</td>
                <td class="px-6 py-4">Ezquisofrenia</td>
                <td class="px-6 py-4">Dr.Sotelo</td>
                <td class="px-6 py-4 text-center">10</td>
                <td class="px-6 py-4 text-center">Si</td>
                <td class="px-6 py-4">$2300</td>
                <td class="px-6 py-4">$700</td>
                <td class="px-6 py-4">
                  <Image className="w-[30px] m-auto" src={edit} alt="edit" />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>10-09-2024</p>
                  <p>09:25:00</p>
                </th>
                <td class="px-6 py-4">Sebastian Lopez Romero</td>
                <td class="px-6 py-4">7557342658</td>
                <td class="px-6 py-4">Procedimiento OX</td>
                <td class="px-6 py-4">Dr.Sotelo</td>
                <td class="px-6 py-4 text-center">2</td>
                <td class="px-6 py-4 text-center">Si</td>
                <td class="px-6 py-4">$1500</td>
                <td class="px-6 py-4">$600</td>
                <td class="px-6 py-4">
                  <Image className="w-[30px] m-auto" src={edit} alt="edit" />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>10-09-2024</p>
                  <p>09:25:00</p>
                </th>
                <td class="px-6 py-4">Sebastian Lopez Romero</td>
                <td class="px-6 py-4">7557342658</td>
                <td class="px-6 py-4">Procedimiento OX</td>
                <td class="px-6 py-4">Dr.Sotelo</td>
                <td class="px-6 py-4 text-center">2</td>
                <td class="px-6 py-4 text-center">Si</td>
                <td class="px-6 py-4">$1500</td>
                <td class="px-6 py-4">$600</td>
                <td class="px-6 py-4">
                  <Image className="w-[30px] m-auto" src={edit} alt="edit" />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>10-09-2024</p>
                  <p>09:25:00</p>
                </th>
                <td class="px-6 py-4">Sebastian Lopez Romero</td>
                <td class="px-6 py-4">7557342658</td>
                <td class="px-6 py-4">Procedimiento OX</td>
                <td class="px-6 py-4">Dr.Sotelo</td>
                <td class="px-6 py-4 text-center">2</td>
                <td class="px-6 py-4 text-center">Si</td>
                <td class="px-6 py-4">$1500</td>
                <td class="px-6 py-4">$600</td>
                <td class="px-6 py-4">
                  <Image className="w-[30px] m-auto" src={edit} alt="edit" />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <p>10-09-2024</p>
                  <p>09:25:00</p>
                </th>
                <td class="px-6 py-4">Sebastian Lopez Romero</td>
                <td class="px-6 py-4">7557342658</td>
                <td class="px-6 py-4">Procedimiento OX</td>
                <td class="px-6 py-4">Dr.Sotelo</td>
                <td class="px-6 py-4 text-center">2</td>
                <td class="px-6 py-4 text-center">Si</td>
                <td class="px-6 py-4">$1500</td>
                <td class="px-6 py-4">$600</td>
                <td class="px-6 py-4">
                  <Image className="w-[30px] m-auto" src={edit} alt="edit" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
