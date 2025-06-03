'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/UserSlice';
import { RootState } from '@/store/store';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<'my' | 'liked'>('my');
  const [isEditing, setIsEditing] = useState(false);

  // Editable profile fields state
  const [editName, setEditName] = useState(user?.name || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editLocation, setEditLocation] = useState(user?.location || '');

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const storageRef = ref(storage, `profileImages/${user.uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, { profileImage: downloadURL });

    dispatch(setUser({ ...user, profileImage: downloadURL }));
  };

  // Save edited profile info
  const saveProfile = async () => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    const updatedData = {
      name: editName,
      bio: editBio,
      location: editLocation,
    };

    await updateDoc(userDocRef, updatedData);

    dispatch(setUser({ ...user, ...updatedData }));
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center bg-white p-10 rounded shadow-md max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">No Profile Found</h1>
          <p className="text-gray-600 mb-6">
            You are not logged in.{' '}
            <a href="/login" className="text-orange-500 underline">Log in</a> or{' '}
            <a href="/signup" className="text-orange-500 underline">sign up</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-8">

        {/* Profile header */}
        <div className="flex items-center gap-8 mb-10">
          <div className="relative w-28 h-28">
            <Image
              src={user.profileImage || '/default-profile.png'}
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Change profile picture"
            />
          </div>

          <div className="flex-grow">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border-b border-gray-300 text-xl font-semibold focus:outline-none focus:border-orange-500 mb-2"
                  placeholder="Name"
                />
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full border-b border-gray-300 text-gray-600 focus:outline-none focus:border-orange-500 mb-2"
                  placeholder="Bio"
                  rows={2}
                />
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full border-b border-gray-300 text-gray-500 focus:outline-none focus:border-orange-500"
                  placeholder="Location"
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.bio}</p>
                <p className="text-sm text-gray-500">Joined: {user.joinDate}</p>
                <p className="text-sm text-gray-500">Location: {user.location}</p>
              </>
            )}
          </div>

          <div>
            {isEditing ? (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={saveProfile}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 text-center mb-10">
          <div>
            <p className="text-2xl font-extrabold text-orange-500">{user.stats.recipes}</p>
            <p className="text-sm text-gray-600">Recipes</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-orange-500">{user.stats.likes}</p>
            <p className="text-sm text-gray-600">Likes</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-orange-500">{user.stats.avgRating.toFixed(1)}</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative flex justify-center mb-6 border-b border-gray-300">
          <button
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === 'my' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('my')}
          >
            My Recipes
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === 'liked' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('liked')}
          >
            Liked Recipes
          </button>
        </div>

        {/* Recipes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(activeTab === 'my' ? user.recipes : user.likedRecipes).map((recipe) => (
            <div
              key={recipe.id}
              className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300"
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={300}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{recipe.title}</h3>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <span>❤️ {recipe.likes}</span>
                  <span>⭐ {recipe.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
