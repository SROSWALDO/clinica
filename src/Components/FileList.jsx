import React, { useEffect, useState } from 'react';

const ExpedientesList = ({downloadURL}) => {
  const [expedientes, setExpedientes] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div className='w-[900px] m-auto bg-blue-500 shadow text-white mt-5 text-lg border-b-2 border-b-white rounded-md' >
      <h2 className='p-1'>Lista de Expedientes</h2>
      {error && <p>{error}</p>}
      <div className='w-[900px] m-auto shadow border-t'>
        <table className="w-full m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-white uppercase font-poppins bg-blue-500">
            <tr>
            <th scope="col" className="px-2 py-3 w-[120px]">Fecha</th>
              <th scope="col" className="px-2 py-3 w-[120px]">Nombre del expediente</th>
              <th scope="col" className="px-2 py-3 w-[120px]">Archivo</th>
            </tr>
          </thead>
          {expedientes.map(expediente => (
          <tbody key={expediente.id}>
            <tr className='shadow bg-white '>
              <td className="px-6 py-4">{new Date(expediente.createdAt).toLocaleDateString("es-ES")}</td>
              <td className="px-6 py-4">{expediente.nombre}</td>
              <td className="px-6 py-4"><a className='bg-blue-500 p-2 rounded-lg text-white text-base' href={expediente.url} target='_blank' >Ver archivo</a></td>
            </tr>
          </tbody>
        ))}

        </table>
      </div>
      <ul>
        
      </ul>
    </div>
  );
};

export default ExpedientesList;
