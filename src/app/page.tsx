'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Star } from 'lucide-react';

// Sample data with categories
const allRecipes = [
  {
    id: 1,
    title: 'Ndolé',
    category: 'Cameroonian',
    description: 'A bitterleaf stew with peanuts and meat.',
    image: '/images/cameroonian/ndole.jpg',
    rating: 5,
  },
  {
    id: 2,
    title: 'Eru',
    category: 'Cameroonian',
    description: 'A flavorful mix of green leaves and water fufu.',
    image: '/images/cameroonian/eru.jpg',
    rating: 4,
  },
  {
    id: 3,
    title: 'Jollof Rice',
    category: 'African',
    description: 'Classic West African rice cooked in spicy tomato sauce.',
    image: '/images/african/jollof.jpg',
    rating: 4,
  },
  {
    id: 4,
    title: 'Fufu & Light Soup',
    category: 'African',
    description: 'Ghanaian fufu served with spicy light soup.',
    image: '/images/african/fufu-soup.jpg',
    rating: 3,
  },
  {
    id: 5,
    title: 'Spaghetti Bolognese',
    category: 'Foreign',
    description: 'Italian classic with rich meat sauce.',
    image: '/images/foreign/spaghetti.jpg',
    rating: 5,
  },
  {
    id: 6,
    title: 'Chicken Curry',
    category: 'Foreign',
    description: 'Aromatic curry with tender chicken pieces.',
    image: '/images/foreign/curry.jpg',
    rating: 4,
  },
  // Add more recipes up to 12 if desired...
];

const categories = ['All', 'Cameroonian', 'African', 'Foreign'];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes =
    selectedCategory === 'All'
      ? allRecipes
      : allRecipes.filter((r) => r.category === selectedCategory);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Featured Recipes</h1>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === cat
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-orange-100'
            } transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecipes.slice(0, 12).map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative w-full h-48">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-gray-800">{recipe.title}</h2>
                <Heart className="w-5 h-5 text-red-400 hover:text-red-600 cursor-pointer" />
              </div>
              <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
              <div className="flex mt-2 text-yellow-400">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < recipe.rating ? 'fill-yellow-400' : 'stroke-yellow-400'
                    }`}
                    fill={idx < recipe.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
