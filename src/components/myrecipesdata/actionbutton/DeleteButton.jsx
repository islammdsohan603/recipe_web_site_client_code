'use client';

import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const DeleteButton = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleDelete = async () => {
    const proceed = window.confirm(
      'Are you sure you want to delete this recipe',
    );

    if (!proceed) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${baseUrl}/api/delete-view-recipe?id=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      if (data.success) {
        toast.success('Recipe Delete SuccessFully!');

        window.location.reload();
      } else {
        toast.error('Failed to Delete Recipe');
      }
    } catch (error) {
      toast.warning('Something went wrong while deleting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={loading}
        title="Delete Recipe"
        className="p-2 flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 transition duration-200"
      >
        <FiTrash2 size={18} />
        {loading ? 'deleting' : 'delte'}
      </button>
    </div>
  );
};

export default DeleteButton;
