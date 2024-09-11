import { Modal } from 'antd'
import React from 'react'

export default function Formulario({ isModalOpen, onClose }) {
  return (
    <div>
    <Modal open={isModalOpen} onCancel={onClose} >
      <p>Hola</p>
    </Modal>
      
    </div>
  )
}
