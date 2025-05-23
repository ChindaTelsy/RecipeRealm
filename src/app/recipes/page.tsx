'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star, Heart,  ChevronDown, ChevronUp } from 'lucide-react';
import { Playfair_Display } from 'next/font/google';

const Playfair_DisplayFont = Playfair_Display({ subsets: ['latin'], weight: ['400'] });

const sampleRecipes = [
  { id: 1, title: 'Ndolé', category: 'Cameroonian', description: 'A bitterleaf stew with peanuts and meat.', image: '/images/ndole-1.webp', rating: 5 },
  { id: 2, title: 'Jollof Rice', category: 'African', description: 'Classic West African rice cooked in spicy tomato sauce.', image: '/images/jolof rice.jpeg', rating: 4 },
  // Add more...
];

const allCategories = [
  'All', 'Latest', 'North west Region', 'South west Region', 'Littoral Region', 'Centre Region',
  'Far north Region', 'West Region', 'South Region', 'North Region', 'East Region', 'Adamawa Region',
  'West African Flavors', 'Central African Cuisine', 'North African Dishes', 'Vegetarian',
  'Quick & Easy Recipes', 'Street Food Favorites', 'International Favorites', 'Snacks', 'Breakfasts',
  'Desserts', 'Drinks'
];

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [showAllCategories, setShowAllCategories] = useState(false);
  const visibleCategories = showAllCategories ? allCategories : allCategories.slice(0, 6);

  // Filter recipes based on category param
  const filteredRecipes =
    categoryParam === 'All'
      ? sampleRecipes
      : sampleRecipes.filter((recipe) => recipe.category === categoryParam);

  // Local state to track liked recipes by id
  const [likedRecipes, setLikedRecipes] = useState<{ [key: number]: boolean }>({});

  // Toggle like status for a recipe
  const toggleLike = (id: number) => {
    setLikedRecipes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      

      {/* Content */}
      <main className="flex-grow px-6 py-8 bg-gray-50">
        <h1 className={`${Playfair_DisplayFont.className} text-2xl font-semibold mb-6`}>Explore Recipes by Category</h1>

        {/* Categories with toggle */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          {visibleCategories.map((cat) => (
            <Link
              key={cat}
              href={`/recipes?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                categoryParam === cat
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
            >
              {cat}
            </Link>
          ))}
          <button
            onClick={() => setShowAllCategories((prev) => !prev)}
            className="flex items-center text-orange-600 hover:text-orange-800 font-medium text-sm"
          >
            {showAllCategories ? (
              <>
                Show less <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                Show all <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </button>
        </div>
{/* Recipe Boxes */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {filteredRecipes.length > 0 ? (
    filteredRecipes.map((recipe) => (
      <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="cursor-pointer">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden relative">
          <div className="relative w-full h-64"> {/* Increased height */}
            <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
            {/* Heart icon on top right */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault(); // Prevent Link navigation on heart click
                toggleLike(recipe.id);
              }}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600"
              aria-label="Like recipe"
            >
              <Heart
                className={`w-6 h-6 ${likedRecipes[recipe.id] ? 'fill-red-600' : 'stroke-red-400'}`}
                fill={likedRecipes[recipe.id] ? 'currentColor' : 'none'}
              />
            </button>
          </div>
          <div className="p-4 min-h-[130px]"> {/* Optional min-height for content area */}
            <h2 className="text-lg font-semibold text-gray-800">{recipe.title}</h2>
            <p className="text-sm text-gray-500">{recipe.category}</p>
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
        </div>
      </Link>
    ))
  ) : (
    <p>No recipes found for category "{categoryParam}".</p>
  )}
</div>

      </main>
    </div>
  );
}
