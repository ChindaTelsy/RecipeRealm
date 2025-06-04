'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { toggleLike, setRating } from '@/store/RecipeSlice';
import RecipeCard from '@/components/RecipeCard';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Welcomepage() {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);

  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';

  const { t } = useTranslation('welcome');

  const visibleRecipes = useMemo(() => {
    return recipes.filter(recipe => 
      recipe.visibleOn === 'welcome' || recipe.visibleOn === 'both'
    );
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    if (!query) return [];
    return visibleRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );
  }, [query, visibleRecipes]);

  const handleLike = (id: string) => {
    dispatch(toggleLike(id));
  };

  const handleRate = (id: string, rating: number) => {
    dispatch(setRating({ id, rating }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      
      <div className="text-center mb-8">
        <h1 className="font-playfair text-3xl font-semibold mb-6 text-center">
          {query ? t('searchResults', { query }) : t('title')}
        </h1>

        {query && filteredRecipes.length === 0 && (
          <p className="text-gray-500">{t('noResults')}</p>
        )}

        <p className="font-playfair text-2xl font-medium text-gray-700">
          {t('cta')}{' '}
          <Link href="/signup" className="text-orange-500 hover:underline">
            {t('signup')}
          </Link>
        </p>
      </div>
      

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {(query ? filteredRecipes : visibleRecipes.slice(0, 12)).map((recipe) => (
          <motion.div key={recipe.id} variants={cardVariants}>
            <RecipeCard
              recipe={recipe}
              onLike={handleLike}
              onRate={handleRate}
            />
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
