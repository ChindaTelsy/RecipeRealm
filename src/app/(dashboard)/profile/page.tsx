'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

interface User {
  name: string;
  bio: string;
  joinDate: string;
  profileImage?: string;
  location: string;
  stats: {
    recipes: number;
    likes: number;
    avgRating: number;
  };
  recipes: Array<{
    id: number;
    title: string;
    image: string;
    likes: number;
    rating: number;
  }>;
}


// Simulate fetching user (replace with Firebase/Auth logic later)

const fetchUser = (): User | null => {
    // Return `null` if not signed in
  return null;
  // Example user data if logged in
  // return {
  //   name: 'Jane Doe',
  //   bio: 'Lover of Cameroonian cuisine 🌶️',
  //   joinDate: 'March 2025',
  //   profileImage: '/default-profile.png',
  //   location: 'Cameroon',
  //   stats: {
  //     recipes: 8,
  //     likes: 120,
  //     avgRating: 4.6,
  //   },
  //   recipes: [
  //     {
  //       id: 1,
  //       title: 'Ndolé with Plantains',
  //       image: '/recipes/ndole.jpg',
  //       likes: 40,
  //       rating: 4.7,
  //     },
  //     {
  //       id: 2,
  //       title: 'Eru Soup',
  //       image: '/recipes/eru.jpg',
  //       likes: 32,
  //       rating: 4.5,
  //     },
  //   ]
  // };
};

export default function ProfilePage() {
  const [hydrated, setHydrated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('myRecipes');
  const [profileImg, setProfileImg] = useState<string>('/default-profile.png');


  useEffect(() => {
    setHydrated(true);
    const fetchedUser = fetchUser();
    setUser(fetchedUser);
    setProfileImg(fetchedUser?.profileImage ?? '/default-profile.png');
  }, []);

  if (!hydrated) {
    // Return nothing or a loading spinner while waiting for hydration/client fetch
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfileImg(previewUrl);
      // Normally upload to server here
    }
  };

   if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center bg-white p-10 rounded shadow-md max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">No Profile Found</h1>
          <p className="text-gray-600 mb-6">
            You haven't created a profile yet. Please{' '}
            <a href="/signup" className="text-orange-500 underline">
              sign up
            </a>{' '}
            or{' '}
            <a href="/login" className="text-orange-500 underline">
              log in
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden shadow-lg border-2 border-orange-400">
              <Image
                src={profileImg || '/default-profile.png'}
                alt="Profile"
                fill
                sizes="100px"
                className="object-cover"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                aria-label="Edit profile picture"
                className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-orange-100 transition"
              >
                {/* Pencil SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z"
                  />
                </svg>
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{user.name ?? 'Unnamed User'}</h1>
              <p className="text-sm text-gray-600">{user.bio ?? ''}</p>
              <p className="text-sm text-gray-500 mt-1">
                📍 {user.location ?? 'Unknown Location'} — Joined {user.joinDate ?? 'N/A'}
              </p>
            </div>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 flex space-x-6 text-sm text-gray-700">
          <div>
            <strong>{user.stats?.recipes ?? 0}</strong> Recipes
          </div>
          <div>
            <strong>{user.stats?.likes ?? 0}</strong> Likes
          </div>
          <div>
            <strong>{(user.stats?.avgRating ?? 0).toFixed(1)}</strong> Avg Rating ⭐
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <nav className="flex space-x-4 text-sm font-medium">
            <button
              onClick={() => setActiveTab('myRecipes')}
              className={`pb-2 ${
                activeTab === 'myRecipes' ? 'text-orange-600 font-semibold' : 'text-gray-500'
              }`}
            >
              My Recipes
            </button>
            <button
              onClick={() => setActiveTab('likedRecipes')}
              className={`pb-2 ${
                activeTab === 'likedRecipes' ? 'text-orange-600 font-semibold' : 'text-gray-500'
              }`}
            >
              Liked Recipes
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'myRecipes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(user.recipes ?? []).map((recipe: any) => (
                <div key={recipe.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{recipe.title}</h3>
                    <p className="text-sm text-gray-600">
                      {recipe.likes} likes · ⭐ {recipe.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'likedRecipes' && (
            <p className="text-gray-600">This feature is coming soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
