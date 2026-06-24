import React from 'react';
import { FiEdit3 } from 'react-icons/fi';

const UpdateButton = ({ id }) => {
  console.log(id);
  return (
    <div>
      <button
        title="Update Recipe"
        className="p-2 flex items-center gap-2 text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg cursor-pointer hover:bg-orange-500/20 hover:text-orange-300 transition duration-200"
      >
        <FiEdit3 size={18} />
        update
      </button>
    </div>
  );
};

export default UpdateButton;
