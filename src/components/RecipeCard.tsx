  

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';    
import { Recipe } from '@/model/Recipe';

interface RecipeProps {
    recipe: Recipe;
    onLike?: (id: string) => void;
    onRate?: (id: string, rating: number) => void;
}

export default function RecipeCard({ recipe, onLike, onRate }: RecipeProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-md">
      <Link href={`/recipes/${recipe.id}`}>
        <div className="relative w-full h-64">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4 min-h-[140px]">
        <div className="flex justify-between items-start">
          <Link href={`/recipes/${recipe.id}`}>
            <h2 className="text-lg font-semibold text-gray-800 hover:underline">
              {recipe.title}
            </h2>
          </Link>
          <button onClick={() => onLike?.(recipe.id)} aria-label="Like recipe">
            <Heart
              className={`w-5 h-5 cursor-pointer ${recipe.liked ? 'text-red-600 fill-red-600' : 'text-red-300 hover:text-red-500'}`}
            />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
        <div className="flex mt-2 text-yellow-400">
          {[...Array(5)].map((_, idx) => (
            <button key={idx} onClick={() => onRate?.(recipe.id, idx + 1)} aria-label={`Rate ${idx + 1} stars`}>
              <Star
                className={`w-4 h-4 ${idx < recipe.rating ? 'fill-yellow-400' : 'stroke-yellow-400'}`}
                fill={idx < recipe.rating ? 'currentColor' : 'none'}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
