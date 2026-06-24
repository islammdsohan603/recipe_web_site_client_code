'use client';

import { createNewRecipe } from '@/lib/action/newrecipe';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AddNewRecipeForm = () => {
  const categories = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Seafood',
    'Snack',
    'Vegetarian',
    'Main Course',
  ];

  const [recipeData, setRecipeData] = useState({
    recipeName: '',
    category: '',
    cuisineType: '',
    difficulty: 'Beginner',
    prepTime: '',
    image: '',
    ingredients: [''],
    steps: [''],
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setRecipeData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDifficulty = difficulty => {
    setRecipeData(prev => ({
      ...prev,
      difficulty,
    }));
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = value;

    setRecipeData(prev => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  const addIngredient = () => {
    setRecipeData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ''],
    }));
  };

  const removeIngredient = index => {
    setRecipeData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipeData.steps];
    updatedSteps[index] = value;

    setRecipeData(prev => ({
      ...prev,
      steps: updatedSteps,
    }));
  };

  const addStep = () => {
    setRecipeData(prev => ({
      ...prev,
      steps: [...prev.steps, ''],
    }));
  };

  const removeStep = index => {
    setRecipeData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      },
    );

    const data = await res.json();

    setRecipeData(prev => ({
      ...prev,
      image: data.data.url,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const payload = await createNewRecipe(recipeData);

      if (payload && payload.insertedId) {
        toast.success('Successfully added recipe!');

        setRecipeData({
          recipeName: '',
          category: '',
          cuisineType: '',
          difficulty: 'Beginner',
          prepTime: '',
          image: '',
          ingredients: [''],
          steps: [''],
        });
      } else {
        toast.error('Failed to save recipe');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-5xl font-serif text-orange-200 mb-2">
              Create New Masterpiece
            </h1>

            <p className="text-zinc-400 max-w-2xl">
              Share your culinary expertise with the world. Fill in the details
              below to add a new recipe to your collection.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="px-6 cursor-pointer py-3 border border-zinc-800 rounded-xl bg-zinc-950 hover:bg-zinc-900 transition"
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-orange-500 cursor-pointer hover:bg-orange-600 transition font-medium"
            >
              Publish Recipe
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information */}
            <div className="bg-[#111111] border border-zinc-900 rounded-2xl p-6">
              <h2 className="text-xl font-serif text-orange-200 mb-6">
                General Information
              </h2>

              <div className="space-y-5">
                {/* Recipe Name */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">
                    Recipe Name
                  </label>

                  <input
                    type="text"
                    name="recipeName"
                    value={recipeData.recipeName}
                    onChange={handleChange}
                    placeholder="e.g. Black Garlic & Herb Roasted Lamb"
                    className="w-full bg-[#1b110d] border border-orange-900/40 rounded-lg px-4 py-3 outline-none"
                  />
                </div>

                {/* Category & Cuisine */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Category
                    </label>

                    <select
                      name="category"
                      value={recipeData.category}
                      onChange={handleChange}
                      className="w-full bg-[#1b110d] border border-orange-900/40 rounded-lg px-4 py-3"
                    >
                      <option value="">Select Category</option>

                      {categories.map(item => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Cuisine Type
                    </label>

                    <input
                      type="text"
                      name="cuisineType"
                      value={recipeData.cuisineType}
                      onChange={handleChange}
                      placeholder="e.g. Modern Mediterranean"
                      className="w-full bg-[#1b110d] border border-orange-900/40 rounded-lg px-4 py-3"
                    />
                  </div>
                </div>

                {/* Difficulty & Prep Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Difficulty Level
                    </label>

                    <div className="flex gap-2 flex-wrap">
                      {['Beginner', 'Intermediate', 'Expert'].map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleDifficulty(level)}
                          className={`px-4 py-2 rounded-lg border text-sm ${
                            recipeData.difficulty === level
                              ? 'bg-orange-900/30 border-orange-700'
                              : 'bg-zinc-900 border-zinc-800'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Prep Time (Mins)
                    </label>

                    <input
                      type="number"
                      name="prepTime"
                      value={recipeData.prepTime}
                      onChange={handleChange}
                      placeholder="45"
                      className="w-full bg-[#1b110d] border border-orange-900/40 rounded-lg px-4 py-3"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients + Steps */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ingredients */}
              <div className="bg-[#111111] border border-zinc-900 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-xl font-serif text-orange-200">
                    Ingredients
                  </h3>

                  <button
                    type="button"
                    onClick={addIngredient}
                    className="text-orange-400 text-sm"
                  >
                    + Add New
                  </button>
                </div>

                <div className="space-y-3">
                  {recipeData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={ingredient}
                        onChange={e =>
                          handleIngredientChange(index, e.target.value)
                        }
                        placeholder="Enter ingredient"
                        className="flex-1 bg-[#1b110d] border border-orange-900/30 rounded-lg px-3 py-3"
                      />

                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="px-3 bg-red-500 rounded-lg"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="bg-[#111111] border border-zinc-900 rounded-2xl p-5">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-xl font-serif text-orange-200">Steps</h3>

                  <button
                    type="button"
                    onClick={addStep}
                    className="text-orange-400 text-sm"
                  >
                    + Add Step
                  </button>
                </div>

                <div className="space-y-3">
                  {recipeData.steps.map((step, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={step}
                        onChange={e => handleStepChange(index, e.target.value)}
                        placeholder={`Step ${index + 1}`}
                        rows={3}
                        className="flex-1 bg-[#1b110d] border border-orange-900/30 rounded-lg p-3"
                      />

                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="px-3 bg-red-500 rounded-lg h-fit"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-[#111111] border border-zinc-900 rounded-2xl p-6">
              <label
                htmlFor="recipe-image"
                className="group flex flex-col items-center justify-center h-72 cursor-pointer rounded-2xl border-2 border-dashed border-orange-900/40 bg-[#0d0d0d] hover:border-orange-500/50 hover:bg-[#121212] transition-all duration-300"
              >
                {/* Upload Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-16 h-16 text-orange-300 mb-6 group-hover:scale-110 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 014-4h1a5 5 0 019.9-1.1A4.5 4.5 0 0120.5 19H15m-3-8v9m0-9l-3 3m3-3l3 3"
                  />
                </svg>

                <h3 className="text-2xl font-semibold text-orange-100 mb-2">
                  Upload Recipe Photo
                </h3>

                <p className="text-center text-zinc-400 max-w-xs leading-relaxed">
                  Drag & drop or click to upload.
                  <br />
                  High-quality 4:3 images work best.
                </p>

                <input
                  id="recipe-image"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview */}
            <div className="overflow-hidden rounded-2xl border border-zinc-900 bg-[#111111]">
              {recipeData.image && (
                <Image
                  src={recipeData.image}
                  alt="preview"
                  width={600}
                  height={400}
                  className="w-full h-52 object-cover"
                />
              )}

              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full text-xs bg-orange-500/20 text-orange-300 mb-3">
                  PREVIEW MODE
                </span>

                <h3 className="text-xl font-serif mb-2">
                  {recipeData.recipeName || 'Your Recipe Name Here'}
                </h3>

                <div className="flex gap-4 text-xs text-zinc-500">
                  <span>{recipeData.prepTime || 0} MIN</span>
                  <span>{recipeData.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewRecipeForm;
