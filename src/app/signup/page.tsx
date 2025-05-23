"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";



export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Sign Up submitted", { email, password, confirmPassword });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/R.jpeg')" }} // Update path if needed
    >
      {/* Overlay blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"></div>

      {/* Card */}
      <div className="w-full max-w-lg px-4 py-8 sm:max-w-xl sm:px-10 sm:py-10 bg-white/90 rounded-2xl shadow-2xl backdrop-blur-md mx-4 z-10">

        <h1 className="text-4xl font-bold text-center text-orange-700 mb-8 tracking-wide">
          RecipeRealm
        </h1>

         <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 tracking-wide">
          SignUp For Recipes
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-600 hover:underline">
            Login
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-orange-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-orange-600 hover:underline">
            Privacy Policy
          </Link>.
        </p>

      </div>
    </div>
   );
   
}
