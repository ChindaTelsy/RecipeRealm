import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { UserRecipe } from '@/model/Recipe';

interface RecipeProps {
  UserRecipe: UserRecipe;
  liked?: boolean;
  rating?: number;
  onLike?: (id: string) => void;
  onRate?: (id: string, rating: number) => void;
}

export default function RecipesCards({
  UserRecipe,
  liked,
  rating,
  onLike,
  onRate
}: RecipeProps) {
  const { id, title, image, category } = UserRecipe;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden relative cursor-pointer">
      <Link href={`/recipes/${id}`} className="block relative w-full h-64">
        <Image src={image} alt={title} fill className="object-cover" />
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onLike?.(id);
        }}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 z-10"
        aria-label="Like recipe"
      >
        <Heart
          className={`w-6 h-6 ${liked ? 'fill-red-600' : 'stroke-red-400'}`}
          fill={liked ? 'currentColor' : 'none'}
        />
      </button>

      <div className="p-4 min-h-[130px]">
        <h2 className="text-lg font-semibold text-gray-800">
          <Link href={`/recipes/${id}`} className="hover:underline hover:text-orange-600">
            {title}
          </Link>
        </h2>
        <p className="text-sm text-gray-500">{category}</p>

        <div className="flex mt-2 text-yellow-400">
          {[...Array(5)].map((_, idx) => {
            const starValue = idx + 1;
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onRate?.(id, starValue);
                }}
                aria-label={`Set rating to ${starValue} stars`}
                className="focus:outline-none"
              >
                <Star
                  className={`w-5 h-5 cursor-pointer ${
                    starValue <= (rating ?? 0) ? 'fill-yellow-400' : 'stroke-yellow-400'
                  }`}
                  fill={starValue <= (rating ?? 0) ? 'currentColor' : 'none'}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
