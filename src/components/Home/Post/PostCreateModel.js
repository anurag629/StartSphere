// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="text-white text-xl font-bold absolute top-4 right-4">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
