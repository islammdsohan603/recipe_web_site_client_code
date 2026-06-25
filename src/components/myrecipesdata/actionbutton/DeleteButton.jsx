import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const DeleteButton = ({ id }) => {
  console.log(id);
  return (
    <div>
      <button
        title="Delete Recipe"
        className="p-2 flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 transition duration-200"
      >
        <FiTrash2 size={18} />
        delete
      </button>
    </div>
  );
};

export default DeleteButton;
