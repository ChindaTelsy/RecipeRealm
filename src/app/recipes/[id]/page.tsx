"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const recipeData = [
  {
    id: "1",
    title: "Ndolé",
    description: "Traditional Cameroonian dish made with bitterleaf and groundnuts.",
    image: "/images/Ndole-1.webp",
    ingredients: ["Bitterleaf", "Groundnuts", "Meat", "Maggi", "Salt"],
    steps: [
      "Boil the bitterleaf and drain.",
      "Grind the groundnuts into a paste.",
      "Cook meat with seasoning.",
      "Mix all together and simmer.",
    ],
    likes: 40,
    rating: 4.7,
    author: "Jane Doe",
    prepTime: "20 mins",
    cookTime: "1 hr",
    reviews: [
      { id: 1, user: "Alice", rating: 5 },
      { id: 2, user: "Bob", rating: 4 },
    ],
  },
  {
    id: "2",
    title: "Eru",
    description: "Spicy green leafy vegetable dish popular in the southwest of Cameroon.",
    image: "/images/Eru.jpeg",
    ingredients: ["Eru leaves", "Waterleaf", "Palm oil", "Smoked fish", "Beef", "Crayfish"],
    steps: [
      "Prepare eru and waterleaf.",
      "Boil meat and smoked fish.",
      "Mix with oil and seasonings.",
      "Simmer until well combined.",
    ],
    likes: 32,
    rating: 4.7,
    author: "Jane Doe",
    prepTime: "15 mins",
    cookTime: "45 mins",
    reviews: [
      { id: 1, user: "Alice", rating: 5 },
      { id: 2, user: "Bob", rating: 4 },
    ],
  },
];

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const actualParams = React.use(params);
  const recipeId = actualParams.id;

  const recipe = recipeData.find((r) => r.id === recipeId);
  if (!recipe) return notFound();

  const recipeRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!recipeRef.current) return;

    const canvas = await html2canvas(recipeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${recipe.title}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div
        ref={recipeRef}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6"
        id="recipe-content"
      >
        {/* Header with image and title */}
        <div className="flex items-start mb-2">
          <div className="flex-shrink-0 mr-6">
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={150}
              height={100}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-orange-600">{recipe.title}</h1>
            <div className="flex items-center space-x-4 mt-1 text-gray-600">
              <div className="flex items-center space-x-1 text-red-500">
                <span>❤️</span>
                <span>{recipe.likes} Likes</span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.round(recipe.rating) ? "★" : "☆"}</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 italic mb-6">{recipe.description}</p>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-300" />

        {/* Prep and cook times */}
        <div className="flex items-center justify-start text-gray-600 mb-4 space-x-6">
          <div>
            <strong>PREP TIME:</strong> {recipe.prepTime}
          </div>
          <div>
            <strong>COOK TIME:</strong> {recipe.cookTime}
          </div>
        </div>

        <hr className="my-6 border-t border-gray-300" />

        {/* Ingredients */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">INGREDIENTS</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <hr className="my-6 border-t border-gray-300" />

        {/* Preparation Steps */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">PREPARATION STEPS</h2>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        <hr className="my-6 border-t border-gray-300" />

        {/* Reviews */}
        {recipe.reviews.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Reviews</h2>
            <div className="space-y-4">
              {recipe.reviews.map((review) => (
                <div key={review.id} className="border-1 p-2 rounded bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{review.user}</span>
                    <span>⭐ {review.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save as PDF Button */}
        <div className="max-w-4xl mx-auto mt-6 flex justify-end">
          <button
            onClick={generatePDF}
            className="px-5 py-2 bg-orange-700 hover:bg-orange-500 text-white rounded font-semibold"
          >
            Save Recipe as PDF
          </button>
        </div>
      </div>

      {/* Footer */}
<footer className="mt-12 bg-gray-50  py-2">
  <div className="max-w-full mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-gray-700">
    <p className="text-sm mb-2 sm:mb-0">&copy; {new Date().getFullYear()} RecipeRealm. All rights reserved.</p>
    <nav className="flex space-x-8 text-sm text-center">
      <a href="/Welcomepage" className="hover:text-orange-600">Home</a>
      <a href="/about" className="hover:text-orange-600">About</a>
      <a href="/Home" className="hover:text-orange-600">Recipes</a>
    </nav>
  </div>
</footer>

</div>

  );
}



