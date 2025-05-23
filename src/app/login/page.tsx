"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login submitted", { email, password });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
      {/* Background image with fallback */}
      <div
        className="absolute inset-0 bg-[url('/images/Ndole.webp')] bg-cover bg-center blur-sm bg-gray-100"
      ></div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Login Card */}
      <div className="w-full max-w-lg px-4 py-8 sm:max-w-xl sm:px-10 sm:py-10 bg-white/90 rounded-2xl shadow-2xl backdrop-blur-md mx-4 z-10">
        <h1 className="text-4xl font-bold text-center text-orange-700 mb-8 tracking-wide">
          RecipeRealm
        </h1>

         <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 tracking-wide">
          LogIn To Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
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
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              placeholder="Enter your password"
            />
          </div>

            {/* ✅ Remember Me & Forgot Password Row */}
    <div className="flex justify-between items-center text-sm text-gray-600">
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox text-orange-600" />
      <span>Remember me</span>
    </label>
    <Link href="/forgot-password" className="text-orange-600 hover:underline">
      Forgot password?
    </Link>
  </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-orange-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}