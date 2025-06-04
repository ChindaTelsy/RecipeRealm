'use client';

import { useMemo, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import RecipesCards from '@/components/RecipesCards';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { toggleLike, setRating } from '@/store/RecipeSlice';


const ALL_CATEGORIES = [
  'All', 'Latest', 'North west Region', 'South west Region', 'Littoral Region', 'Centre Region',
  'Far north Region', 'West Region', 'South Region', 'North Region', 'East Region', 'Adamawa Region',
  'West African Flavors', 'Central African Cuisine', 'North African Dishes', 'Vegetarian',
  'Quick & Easy Recipes', 'Street Food Favorites', 'International Favorites', 'Snacks', 'Breakfasts',
  'Desserts', 'Drinks'
];

export default function HomePage() {
   const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  const query = (searchParams.get('query') || '').toLowerCase();
  const categoryParam = searchParams.get('category') || 'All';

  const [showAllCategories, setShowAllCategories] = useState(false);

  const visibleCategories = useMemo(() => (
    showAllCategories ? ALL_CATEGORIES : ALL_CATEGORIES.slice(0, 6)
  ), [showAllCategories]);

  // Filter recipes based on visibility first
  const visibleRecipes = useMemo(() => {
    return recipes.filter(recipe =>
      recipe.visibleOn === 'home' || recipe.visibleOn === 'both'
    );
  }, [recipes]);

  // Apply search/category filters to visible recipes
  const filteredRecipes = useMemo(() => {
    let filtered = [...visibleRecipes];

    if (query) {
      return filtered.filter(recipe =>
        (recipe.title?.toLowerCase() ?? '').includes(query) ||
        (recipe.description?.toLowerCase() ?? '').includes(query)
      );
    }

    if (categoryParam === 'Latest') {
      return filtered
        .filter(recipe => recipe.createdAt)
        .sort((a, b) =>
          new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime()
        );
    }

    if (categoryParam !== 'All') {
      return filtered.filter(recipe => recipe.category === categoryParam);
    }

    return filtered;
  }, [visibleRecipes, query, categoryParam]);

  const handleLike = useCallback((id: string) => {
    dispatch(toggleLike(id));
  }, [dispatch]);

  const handleRate = useCallback((id: string, rating: number) => {
    dispatch(setRating({ id, rating }));
  }, [dispatch]);

  const handleCategoryClick = (category: string) => {
    router.push(`?category=${encodeURIComponent(category)}`);
  };

  return (
   <div className="min-h-screen flex flex-col">
      <main className="flex-grow px-6 py-8">
        <h1 className="font-playfair text-2xl font-semibold mb-6">
          {query ? `Search results for "${query}"` : 'Explore Recipes by Category'}
        </h1>

        {!query && (
          <div className="flex flex-wrap gap-3 items-center mb-6">
            {visibleCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoryParam === cat
                    ? 'bg-orange-600 text-white'
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
                title={`Filter recipes by ${cat}`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => setShowAllCategories(prev => !prev)}
              className="flex items-center text-orange-600 hover:text-orange-800 font-medium text-sm"
              title={showAllCategories ? 'Show fewer categories' : 'Show all categories'}
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
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipesCards
                key={recipe.id}
                recipe={recipe}
                liked={recipe.liked}
                rating={recipe.rating}
                onLike={handleLike}
                onRate={handleRate}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              {query
                ? 'No recipes found matching your search.'
                : `No recipes found for category "${categoryParam}".`}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
