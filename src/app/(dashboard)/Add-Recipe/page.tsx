'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addRecipe } from '@/store/RecipeSlice'; // Adjust path if needed
import { v4 as uuidv4 } from 'uuid';

// Import the VisibleOn type to ensure type safety
import type { VisibleOn } from '@/store/RecipeSlice';

export default function AddRecipePage() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const categories = [
    'North west Region', 'South west Region', 'Littoral Region', 'Centre Region',
    'Far north Region', 'West Region', 'South Region', 'North Region', 'East Region',
    'Adamawa Region', 'West African Flavors', 'Central African Cuisine', 'North African Dishes',
    'Vegetarian', 'Quick & Easy Recipes', 'Street Food Favorites', 'International Favorites',
    'Snacks', 'Breakfasts', 'Desserts', 'Drinks'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large! Please upload an image smaller than 5MB.');
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !ingredients || !instructions) {
      alert('Please fill in all required fields.');
      return;
    }

    // Convert comma separated ingredients string to array and trim whitespace
    const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item.length > 0);

    // Use preview URL as image URL placeholder (you’d replace this with real upload in a real app)
    const imageUrl = preview || '';

    const newRecipe = {
      id: uuidv4(), // Add unique ID (though this will be overridden in the reducer)
      title,
      description,
      ingredients: ingredientsArray,
      instructions,
      category,
      image: imageUrl,
      rating: 0,
      liked: false,
      visibleOn: 'home' as VisibleOn, // Use a valid VisibleOn value
    };

    dispatch(addRecipe(newRecipe));

    alert('Recipe submitted!');

    // Reset form fields
    setTitle('');
    setDescription('');
    setIngredients('');
    setInstructions('');
    setCategory('');
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-orange-600">Add a New Recipe</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ingredients (comma separated)</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              rows={3}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="e.g. 1 cup flour, 2 eggs, 1/2 cup sugar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              rows={5}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Step-by-step instructions here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recipe Image</label>
            <label className="cursor-pointer text-orange-600 underline">
              Choose an image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {preview && (
              <div className="mt-4">
                <Image
                  src={preview}
                  alt="Recipe preview"
                  width={400}
                  height={250}
                  className="rounded-md border"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md text-base transition"
          >
            Submit Recipe
          </button>

        </form>
      </main>
    </div>
  );
}