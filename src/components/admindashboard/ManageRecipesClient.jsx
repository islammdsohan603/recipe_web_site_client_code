'use client';

import { useState } from 'react';
import {
  Trash2,
  Pencil,
  Star,
  StarOff,
  Search,
  BookOpen,
  X,
  Save,
} from 'lucide-react';
import { toast } from 'react-toastify';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// ─── Edit Modal ──────────────────────────────────────────────────────────────
const EditModal = ({ recipe, onClose, onSaved }) => {
  const [form, setForm] = useState({
    recipeName: recipe.recipeName || '',
    category: recipe.category || '',
    cuisineType: recipe.cuisineType || '',
    difficultyLevel: recipe.difficultyLevel || '',
    preparationTime: recipe.preparationTime || '',
    ingredients: recipe.ingredients || '',
    instructions: recipe.instructions || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${baseUrl}/api/admin/recipes/${recipe._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: recipe.source }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Recipe updated successfully!');
        onSaved({ ...recipe, ...form });
        onClose();
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { name: 'recipeName', label: 'Recipe Name' },
    { name: 'category', label: 'Category' },
    { name: 'cuisineType', label: 'Cuisine Type' },
    { name: 'difficultyLevel', label: 'Difficulty Level' },
    { name: 'preparationTime', label: 'Preparation Time' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#1a0f0c] border border-orange-900/30 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800/60">
          <h2 className="text-lg font-serif text-[#ebd6c8]">Edit Recipe</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1.5">
                {f.label}
              </label>
              <input
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                className="w-full bg-[#110a07] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1.5">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#110a07] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1.5">
              Instructions
            </label>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#110a07] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-zinc-800/60">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={14} />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ManageRecipesClient = ({ initialRecipes }) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [search, setSearch] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [loadingAction, setLoadingAction] = useState('');

  const filtered = recipes.filter(
    (r) =>
      r.recipeName?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase()) ||
      r.category?.toLowerCase().includes(search.toLowerCase())
  );

  // Delete
  const handleDelete = async (recipe) => {
    if (!confirm(`Delete "${recipe.recipeName}"? This cannot be undone.`)) return;

    setLoadingId(recipe._id);
    setLoadingAction('delete');
    try {
      const res = await fetch(
        `${baseUrl}/api/admin/recipes/${recipe._id}?source=${recipe.source}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      if (data.success) {
        setRecipes((prev) => prev.filter((r) => r._id !== recipe._id));
        toast.success('Recipe deleted!');
      } else {
        toast.error(data.message || 'Delete failed');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setLoadingId(null);
      setLoadingAction('');
    }
  };

  // Feature Toggle
  const handleFeature = async (recipe) => {
    setLoadingId(recipe._id);
    setLoadingAction('feature');
    const newFeatured = !recipe.isFeatured;
    try {
      const res = await fetch(
        `${baseUrl}/api/admin/recipes/${recipe._id}/feature`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isFeatured: newFeatured, source: recipe.source }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setRecipes((prev) =>
          prev.map((r) =>
            r._id === recipe._id ? { ...r, isFeatured: newFeatured } : r
          )
        );
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Feature update failed');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setLoadingId(null);
      setLoadingAction('');
    }
  };

  // After edit save
  const handleSaved = (updated) => {
    setRecipes((prev) =>
      prev.map((r) => (r._id === updated._id ? updated : r))
    );
  };

  const isLoading = (id, action) =>
    loadingId === id && loadingAction === action;

  return (
    <>
      {editingRecipe && (
        <EditModal
          recipe={editingRecipe}
          onClose={() => setEditingRecipe(null)}
          onSaved={handleSaved}
        />
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          type="text"
          placeholder="Search by name, email, or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1c1919] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
        />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500">
        <BookOpen size={13} />
        <span>
          Showing{' '}
          <span className="text-zinc-300 font-semibold">{filtered.length}</span>{' '}
          of{' '}
          <span className="text-zinc-300 font-semibold">{recipes.length}</span>{' '}
          recipes
        </span>
      </div>

      {/* Table */}
      <div className="bg-[#131111] border border-zinc-900/60 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Recipe
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500 hidden lg:table-cell">
                  Author
                </th>
                <th className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Featured
                </th>
                <th className="text-right px-5 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-zinc-500">
                    No recipes found.
                  </td>
                </tr>
              ) : (
                filtered.map((recipe, i) => (
                  <tr
                    key={recipe._id}
                    className={`border-b border-zinc-900/50 hover:bg-zinc-800/20 transition-colors ${
                      i === filtered.length - 1 ? 'border-none' : ''
                    }`}
                  >
                    {/* Recipe Name + Image */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {recipe.recipeImage ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                            <img
                              src={recipe.recipeImage}
                              alt={recipe.recipeName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                            <BookOpen size={16} className="text-orange-400" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-zinc-200 line-clamp-1">
                            {recipe.recipeName || 'Unnamed Recipe'}
                          </p>
                          <p className="text-xs text-zinc-600">
                            {recipe.difficultyLevel || '—'} •{' '}
                            {recipe.preparationTime || '—'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {recipe.category || '—'}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="px-5 py-4 text-sm text-zinc-500 hidden lg:table-cell">
                      {recipe.email || '—'}
                    </td>

                    {/* Featured Badge */}
                    <td className="px-5 py-4">
                      {recipe.isFeatured ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
                          <Star size={10} fill="currentColor" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-700">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Feature Toggle */}
                        <button
                          disabled={loadingId === recipe._id}
                          onClick={() => handleFeature(recipe)}
                          title={recipe.isFeatured ? 'Unfeature' : 'Feature'}
                          className={`p-2 rounded-lg text-xs transition-all duration-200 disabled:opacity-50 ${
                            recipe.isFeatured
                              ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/25'
                              : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:border-yellow-500/40 hover:text-yellow-400'
                          }`}
                        >
                          {isLoading(recipe._id, 'feature') ? (
                            <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin block" />
                          ) : recipe.isFeatured ? (
                            <StarOff size={14} />
                          ) : (
                            <Star size={14} />
                          )}
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => setEditingRecipe(recipe)}
                          title="Edit"
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>

                        {/* Delete */}
                        <button
                          disabled={loadingId === recipe._id}
                          onClick={() => handleDelete(recipe)}
                          title="Delete"
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                          {isLoading(recipe._id, 'delete') ? (
                            <span className="w-3.5 h-3.5 border border-red-400 border-t-transparent rounded-full animate-spin block" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageRecipesClient;
