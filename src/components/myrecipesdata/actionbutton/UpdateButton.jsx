'use client';
import React, { useState } from 'react';
import { FiEdit3, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const UpdateButton = ({ recipe }) => {
  const { _id, recipeName, category, preparationTime, cuisineType } =
    recipe || {};

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    recipeName: recipeName || '',
    category: category || '',
    preparationTime: preparationTime || '',
    cuisineType: cuisineType || '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/update-recipe`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: _id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success({
          title: 'Success!',
          text: 'Recipe updated successfully',
          icon: 'success',
          confirmButtonColor: '#f97316',
        });
        setIsOpen(false);

        window.location.reload();
      } else {
        toast.error(data.message || 'Something went wrong!');
      }
    } catch (error) {
      alert('Failed to update recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        title="Update Recipe"
        className="p-2 flex items-center gap-2 text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg cursor-pointer hover:bg-orange-500/20 hover:text-orange-300 transition duration-200"
      >
        <FiEdit3 size={18} />
        Update
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-6 bg-[#120a07] border border-orange-500/20 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FiEdit3 className="text-orange-500" /> Update Recipe Details
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Recipe Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Recipe Name
                </label>
                <input
                  type="text"
                  name="recipeName"
                  value={formData.recipeName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 transition"
                  placeholder="Enter recipe name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 transition"
                  placeholder="e.g. Dessert, Dinner"
                />
              </div>

              {/* Cuisine Type & Prep Time (Grid) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cuisine
                  </label>
                  <input
                    type="text"
                    name="cuisineType"
                    value={formData.cuisineType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 transition"
                    placeholder="e.g. Italian"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Time (Min)
                  </label>
                  <input
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500 transition"
                    placeholder="Minutes"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-medium bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 transition"
                >
                  {loading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateButton;
