import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'

export default function CorteDetail({ isCorteOpen, onClose,index }) {

    const [corte, setCorte] = useState(null)

    useEffect(() => {
        const fetchCorte = async (id) => {
          try {
            const response = await fetch(`/api/cortes/${index}`);
            const data = await response.json();
            setCorte(data);
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchCorte();
      }, []);

  return (
    <div>
      <Modal
      open={isCorteOpen}
      onCancel={onClose}
      footer={null}
      >
        {corte ? ( // Verifica si `corte` tiene datos antes de renderizar
          <div key={corte.id}>
            <h2>{corte.nombre}</h2>
            <p>Ingresos: {corte.ingresos}</p>
            <p>Egresos: {corte.egresos}</p>
            <p>Total: {corte.total}</p>
          </div>
        ) : (
          <p>Cargando detalles del corte...</p> // Mensaje mientras se cargan los datos
        )}
      </Modal>
    </div>
  )
}
