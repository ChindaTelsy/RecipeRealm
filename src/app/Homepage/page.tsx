'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Playfair_Display } from 'next/font/google';

const Playfair_DisplayFont = Playfair_Display({ subsets: ['latin'], weight: ['400'] });

const initialRecipes = [
  {
    id: 1,
    title: 'Ndolé',
    description: 'A bitterleaf stew with peanuts and meat.',
    image: '/images/ndole-1.webp',
    rating: 5,
    liked: false,
  },
  {
    id: 2,
    title: 'Eru',
    description: 'A flavorful mix of green leaves and water fufu.',
    image: '/images/Eru.jpeg',
    rating: 4,
    liked: false,
  },
  {
    id: 3,
    title: 'Jollof Rice',
    description: 'Classic West African rice cooked in spicy tomato sauce.',
    image: '/images/jolof rice.jpeg',
    rating: 4,
    liked: false,
  },
  {
    id: 4,
    title: 'Fufu & Light Soup',
    description: 'Ghanaian fufu served with spicy light soup.',
    image: '/images/Fufu and light soup.jpeg',
    rating: 3,
    liked: false,
  },
  {
    id: 5,
    title: 'Spaghetti Bolognese',
    description: 'Italian classic with rich meat sauce.',
    image: '/images/spaghetti-bolognese.jpeg',
    rating: 5,
    liked: false,
  },
  {
    id: 6,
    title: 'Chicken Curry',
    description: 'Aromatic curry with tender chicken pieces.',
    image: '/images/chicken curry.jpeg',
    rating: 4,
    liked: false,
  },
  {
    id: 7,
    title: 'Puff Puff',
    description: 'A local breakfast with a beautiful texture.',
    image: '/images/puff puff.jpeg',
    rating: 4,
    liked: false,
  },
  {
    id: 8,
    title: 'Folere',
    description: 'Local refreshing drink to brighten your day.',
    image: '/images/Folere.jpg',
    rating: 4,
    liked: false,
  },
];

export default function HomePage() {
  const [recipes, setRecipes] = useState(initialRecipes);

  const handleLike = (id: number) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, liked: !r.liked } : r
      )
    );
  };

  const handleRate = (id: number, rating: number) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, rating } : r
      )
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className={`${Playfair_DisplayFont.className} text-2xl font-medium text-gray-700`}>
          To save and share content, create a free account and start posting today.{' '}
          <Link href="/signup" className="text-orange-500 hover:underline">
            Sign up now!
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.slice(0, 12).map((recipe) => (
          <div
  key={recipe.id}
  className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md"
>
  <Link href={`/recipes/${recipe.id}`}>
    <div className="relative w-full h-64"> {/* increased height */}
      <Image
        src={recipe.image}
        alt={recipe.title}
        fill
        className="object-cover"
      />
    </div>
  </Link>

  <div className="p-4 min-h-[140px]"> {/* optional min-height for more space */}
    <div className="flex justify-between items-start">
      <Link href={`/recipes/${recipe.id}`}>
        <h2 className="text-lg font-semibold text-gray-800 hover:underline">
          {recipe.title}
        </h2>
      </Link>
      <Heart
        onClick={() => handleLike(recipe.id)}
        className={`w-5 h-5 cursor-pointer ${
          recipe.liked ? 'text-red-600 fill-red-600' : 'text-red-300 hover:text-red-500'  
        }`}
      />
    </div>
    <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
    <div className="flex mt-2 text-yellow-400">
      {[...Array(5)].map((_, idx) => (
        <Star
          key={idx}
          className={`w-4 h-4 cursor-pointer ${
            idx < recipe.rating ? 'fill-yellow-400' : 'stroke-yellow-400'
          }`}
          fill={idx < recipe.rating ? 'currentColor' : 'none'}
          onClick={() => handleRate(recipe.id, idx + 1)}
        />
      ))}
    </div>
  </div>
</div>
        ))}
      </div>
    </main>
  );
}
