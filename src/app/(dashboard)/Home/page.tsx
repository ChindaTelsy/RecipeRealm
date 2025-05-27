'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Playfair_Display } from 'next/font/google';
import RecipesCards from '@/components/RecipesCards';
import { UserRecipe } from '@/model/Recipe'; 

const Playfair_DisplayFont = Playfair_Display({ subsets: ['latin'], weight: ['400'] });

// ✅ Sample recipes with category
const sampleRecipes: UserRecipe[] = [
  {
    id: '1',
    title: 'Ndolé',
    category: 'West Region',
    description: 'A bitterleaf stew with peanuts and meat.',
    image: '/images/ndole-1.webp',
    rating: 5,
    liked: false
  },
  {
    id: '2',
    title: 'Jollof Rice',
    category: 'West African Flavors',
    description: 'Classic West African rice cooked in spicy tomato sauce.',
    image: '/images/jolof rice.jpeg',
    rating: 4,
    liked: false
  },
];

// ✅ Define allCategories
const allCategories = [ 'All', 'Latest', 'North west Region', 'South west Region', 'Littoral Region', 'Centre Region',
  'Far north Region', 'West Region', 'South Region', 'North Region', 'East Region', 'Adamawa Region',
  'West African Flavors', 'Central African Cuisine', 'North African Dishes', 'Vegetarian',
  'Quick & Easy Recipes', 'Street Food Favorites', 'International Favorites', 'Snacks', 'Breakfasts',
  'Desserts', 'Drinks'];

export default function HomePage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [showAllCategories, setShowAllCategories] = useState(false);
  const visibleCategories = showAllCategories ? allCategories : allCategories.slice(0, 6);

  const filteredRecipes =
    categoryParam === 'All'
      ? sampleRecipes
      : sampleRecipes.filter((recipe) => recipe.category === categoryParam);

  const [likedRecipes, setLikedRecipes] = useState<{ [key: string]: boolean }>({});
  const [recipeRatings, setRecipeRatings] = useState<{ [key: string]: number }>(
    () => filteredRecipes.reduce((acc, r) => ({ ...acc, [r.id]: r.rating }), {})
  );

  const toggleLike = (id: string) => {
    setLikedRecipes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const setRating = (id: string, rating: number) => {
    setRecipeRatings((prev) => ({ ...prev, [id]: rating }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow px-6 py-8 ">
        <h1 className={`${Playfair_DisplayFont.className} text-2xl italic font-semibold mb-6`}>
          Explore Recipes by Category
        </h1>

        {/* Category Filter */}
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

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipesCards
                key={recipe.id}
                UserRecipe={recipe}
                liked={likedRecipes[recipe.id] || false}
                rating={recipeRatings[recipe.id] || recipe.rating}
                onLike={toggleLike}
                onRate={setRating}
              />
            ))
          ) : (
            <p>No recipes found for category "{categoryParam}".</p>
          )}
        </div>
      </main>
    </div>
  );
}
