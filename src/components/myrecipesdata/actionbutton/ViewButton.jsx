import Link from 'next/link';
import React from 'react';
import { FiEye } from 'react-icons/fi';

const ViewButton = ({ id }) => {
  console.log(id);
  return (
    <div>
      <Link
        href={`/viewdetails/${id}`}
        title="View Details"
        className="p-2 flex items-center gap-2 text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800 hover:text-white transition duration-200"
      >
        <FiEye size={18} />
        view
      </Link>
    </div>
  );
};

export default ViewButton;
