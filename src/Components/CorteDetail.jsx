import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import print from "@/assets/print.svg";
import Image from "next/image";

export default function CorteDetail({ isCorteOpen, onClose, index }) {
  const [corte, setCorte] = useState(null);

  const componentReff = useRef();

  useEffect(() => {
    const fetchCorte = async () => {
      try {
        const response = await fetch(`/api/cortes/${index}`);
        const data = await response.json();

        const parsedIngresos = JSON.parse(data.ingresos);
        const parsedEgresos = JSON.parse(data.egresos);

        setCorte({ ...data, ingresos: parsedIngresos, egresos: parsedEgresos });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCorte();
  }, [index]);

  return (
    <div>
      <Modal
        open={isCorteOpen}
        onCancel={onClose}
        footer={null}
        bodyStyle={{
          padding: "1.5rem",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
        centered
      >
        {corte ? (
          <div key={corte.id} className="ticket font-poppins text-gray-800">
            <div className="flex justify-between shadow">
              <h2 className="text-3xl font-light mb-2">{corte.nombre}</h2>
              <p className="text-sm text-gray-400 mt-2 mr-4">
                {new Date(corte.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex justify-between mt-2">
              <div className="mb-3">
                <h3 className="text-lg font-semibold mb-1 text-blue-500">
                  Ingresos
                </h3>
                <ul className="list-none space-y-2">
                  {Array.isArray(corte.ingresos) ? (
                    corte.ingresos.map((ingreso, idx) => (
                      <li key={idx} className="text-gray-600">
                        ${ingreso}
                      </li>
                    ))
                  ) : (
                    <li>No hay ingresos disponibles</li>
                  )}
                </ul>
                <p className="text-lg font-semibold mt-5 text-gray-500 mb-3">
                  Total ingresos:{" "}
                  <span className="text-green-500 font-bold">
                    ${corte.totalIngresos}
                  </span>
                </p>
              </div>

              <div className="mb-3">
                <h3 className="text-lg font-semibold mb-1 text-blue-500">
                  Egresos
                </h3>

                <ul className="list-none space-y-2">
                  {Array.isArray(corte.egresos) ? (
                    corte.egresos.map((egreso, idx) => (
                      <li key={idx} className="text-gray-600">
                        ${egreso}
                      </li>
                    ))
                  ) : (
                    <li>No hay egresos disponibles</li>
                  )}
                </ul>
                <p className="text-lg font-semibold mt-5 text-gray-500 mb-3">
                  Total egresos:{" "}
                  <span className="text-red-600 font-bold">
                    ${corte.totalEgresos}
                  </span>
                </p>
              </div>
            </div>

            <div className="border-t flex border-gray-200 pt-3">
              <h3 className="text-2xl font-semibold mr-1">Total:</h3>
              <p className="text-2xl font-bold text-green-500 ">
                ${corte.total}
              </p>
            </div>

            <div ref={componentReff} className="printable-content p-1">
              <div className="">
              <h1 className="text-center text-base font-bold mb-2 text-blue-500 ">
                  SERVICIO MEDICO CRISTO MEDICO
                </h1>
                <p className="text-[8px] text-center">
                  CIRUGIA GENERAL • CONSULTAS • URGENCIAS • ULTRASONIDOS
                </p>
                <p className="text-center text-sm mt-2">
                  Dr. Luis Abelardo Sotelo Vargas
                </p>
                <p className="text-center text-xs">MEDICO CIRUJANO</p>
                <p className="text-center">Cedula Profesional: 8926487</p>
                <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light mb-2 mt-3">{corte.nombre}</h2>
                <p className="text-sm text-gray-400 mt-2 mr-4">
                  {new Date(corte.createdAt).toLocaleDateString()}
                </p>
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold mb-1 text-blue-500">
                    Ingresos
                  </h3>
                  <ul className="list-none space-y-2">
                    {Array.isArray(corte.ingresos) ? (
                      corte.ingresos.map((ingreso, idx) => (
                        <li key={idx} className="text-gray-600">
                          ${ingreso}
                        </li>
                      ))
                    ) : (
                      <li>No hay ingresos disponibles</li>
                    )}
                  </ul>
                  <p className="text-lg font-semibold mt-5 text-gray-500 mb-3">
                    Total ingresos:{" "}
                    <span className="text-green-500 font-bold">
                      ${corte.totalIngresos}
                    </span>
                  </p>
                </div>

                <div className="mb-3">
                  <h3 className="text-lg font-semibold mb-1 text-blue-500">
                    Egresos
                  </h3>

                  <ul className="list-none space-y-2">
                    {Array.isArray(corte.egresos) ? (
                      corte.egresos.map((egreso, idx) => (
                        <li key={idx} className="text-gray-600">
                          ${egreso}
                        </li>
                      ))
                    ) : (
                      <li>No hay egresos disponibles</li>
                    )}
                  </ul>
                  <p className="text-lg font-semibold mt-5 text-gray-500 mb-3">
                    Total egresos:{" "}
                    <span className="text-red-600 font-bold">
                      ${corte.totalEgresos}
                    </span>
                  </p>
                </div>
              </div>
              <div className="border-t flex border-gray-200 pt-3">
                <h3 className="text-2xl font-semibold mr-1">Total:</h3>
                <p className="text-2xl font-bold text-green-500 ">
                  ${corte.total}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <ReactToPrint
                trigger={() => (
                  <button className="flex items-center p-2 bg-blue-500 rounded-md text-sm text-white hover:bg-blue-600 transition duration-200">
                    <Image className="mr-1" src={print} alt="print" />
                    Imprimir Cohorte
                  </button>
                )}
                content={() => componentReff.current}
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Cargando detalles del cohorte...
          </p>
        )}
      </Modal>

      <style jsx>{`
        @media print {
          .printable-content {
            display: block !important;
            width: 80mm;
          }
        }

        @media screen {
          .printable-content {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
