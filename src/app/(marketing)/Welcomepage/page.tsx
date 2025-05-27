
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import { Recipe } from '@/model/Recipe';
import RecipeCard from '@/components/RecipeCard';

const Playfair_DisplayFont = Playfair_Display({ subsets: ['latin'], weight: ['400'] });


const initialRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Ndolé',
    description: 'A bitterleaf stew with peanuts and meat.',
    image: '/images/ndole-1.webp',
    rating: 5,
    liked: false,
  },
  {
    id: '2',
    title: 'Eru',
    description: 'A flavorful mix of green leaves and water fufu.',
    image: '/images/Eru.jpeg',
    rating: 4,
    liked: false,
  },
  {
    id: '3',
    title: 'Jollof Rice',
    description: 'Classic West African rice cooked in spicy tomato sauce.',
    image: '/images/jolof rice.jpeg',
    rating: 4,
    liked: false,
  },
  {
    id: '4',
    title: 'Fufu & Light Soup',
    description: 'Ghanaian fufu served with spicy light soup.',
    image: '/images/Fufu and light soup.jpeg',
    rating: 3,
    liked: false,
  },
  {
    id: '5',
    title: 'Spaghetti Bolognese',
    description: 'Italian classic with rich meat sauce.',
    image: '/images/spaghetti-bolognese.jpeg',
    rating: 5,
    liked: false,
  },
  {
    id: '6',
    title: 'Chicken Curry',
    description: 'Aromatic curry with tender chicken pieces.',
    image: '/images/chicken curry.jpeg',
    rating: 4,
    liked: false,
  },
  {
    id: '7',
    title: 'Puff Puff',
    description: 'A local breakfast with a beautiful texture.',
    image: '/images/puff puff.jpeg',
    rating: 4,
    liked: false,
  },
  {
    id: '8',
    title: 'Folere',
    description: 'Local refreshing drink to brighten your day.',
    image: '/images/Folere.jpg',
    rating: 4,
    liked: false,
  },
];


export default function Welcomepage() {
  const [recipes, setRecipes] = useState(initialRecipes);

  const handleLike = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, liked: !r.liked } : r
      )
    );
  };

  const handleRate = (id: string, rating: number) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, rating } : r
      )
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className={`${Playfair_DisplayFont.className} text-2xl  font-medium text-gray-700`}>
          To save and share content, create a free account and start posting today.{' '}
          <Link href="/signup" className="text-orange-500 hover:underline">
            Sign up now!
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.slice(0, 12).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onLike={handleLike}
            onRate={handleRate}
          />
        ))}
      </div>
    </main>
  );
}
