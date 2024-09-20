import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

export default function CorteDetail({ isCorteOpen, onClose, index }) {
  const [corte, setCorte] = useState(null);

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
        bodyStyle={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px' }}
        centered
      >
        {corte ? (
          <div key={corte.id} className="font-poppins text-gray-800">
            <h2 className="text-3xl font-light mb-4">{corte.nombre}</h2>
            <p className="text-sm text-gray-400 mb-4">{new Date(corte.createdAt).toLocaleDateString()}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1 text-blue-500">Ingresos</h3>
              <ul className="list-none space-y-2">
                {Array.isArray(corte.ingresos) ? (
                  corte.ingresos.map((ingreso, idx) => (
                    <li key={idx} className="text-gray-600">${ingreso}</li>
                  ))
                ) : (
                  <li>No hay ingresos disponibles</li>
                )}
              </ul>
              <p className="text-sm text-gray-500 mb-3">Total ingresos: <span className="text-green-600 font-bold">${corte.totalIngresos}</span></p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1 text-blue-500">Egresos</h3>
              
              <ul className="list-none space-y-2">
                {Array.isArray(corte.egresos) ? (
                  corte.egresos.map((egreso, idx) => (
                    <li key={idx} className="text-gray-600">${egreso}</li>
                  ))
                ) : (
                  <li>No hay egresos disponibles</li>
                )}
              </ul>
              <p className="text-sm text-gray-500 mb-3">Total egresos: <span className="text-red-600 font-bold">${corte.totalEgresos}</span></p>
            </div>

            <div className="border-t flex border-gray-200 pt-4">
              <h3 className="text-2xl font-semibold mr-1">Total:</h3>
              <p className="text-2xl font-bold text-green-500 ">${corte.total}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Cargando detalles del corte...</p>
        )}
      </Modal>
    </div>
  );
}
