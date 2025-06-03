import Head from 'next/head';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | RecipeRealm</title>
        <meta name="description" content="Learn about RecipeRealm, our mission, and our global community of food lovers." />
      </Head>

      <main className="min-h-screen bg-gray-50 px-6 py-12 text-gray-800">
        {/* Intro Section */}
        <section className="max-w-4xl mx-auto text-left mb-16">
          <h1 className="text-4xl font-bold text-center mb-4 text-orange-700">About RecipeRealm</h1>
          <p className="text-lg">
            Welcome to RecipeRealm a global platform for food lovers, home cooks, and culinary explorers!

At RecipeRealm, we believe that food brings people together, tells stories, and connects cultures. We created this platform as a community-driven space where anyone, from passionate home chefs to curious beginners, can share their favorite recipes, discover new dishes, and learn from a diverse community.

Whether you’re hunting for your grandma’s classic stew, a 15-minute dinner idea, or a modern twist on a traditional dish, you’ll find inspiration here. With intuitive search, user ratings, curated categories, and easy-to-follow instructions, RecipeRealm makes cooking a joyful and inclusive experience.

What sets us apart? It’s the heart and stories behind each recipe. Every submission is a window into someone’s culture, creativity, and passion. Join us in building a kitchen without borders  one recipe at a time.
          </p>
          <div className="mt-6 flex justify-center">
            <Image
              src="/images/about.jpeg" // You should place an image in public/images/
              alt="People cooking together"
              width={700}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-gray-100 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">🌍 Global Flavors</h2>
            <p>Explore diverse recipes contributed by people from different cultures.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">🤝 Community Driven</h2>
            <p>Engage with passionate cooks through comments, ratings, and sharing.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">💡 Inspiring Creativity</h2>
            <p>Get inspired to try new dishes and create your own unique recipes.</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-2xl font-bold mb-4 text-orange-700">Our Mission</h2>
          <p className="text-lg mb-4">
            We aim to make cooking accessible, fun, and creative for everyone. Whether you're
            a beginner or a seasoned chef, RecipeRealm is your home for culinary exploration.
          </p>
          <p className="text-lg">
            We believe that food connects us, and every dish tells a story. Our mission is to preserve
            culinary traditions, support creativity in the kitchen, and foster a global cooking community.
          </p>
        </section>

        {/* Quote/Testimonial Section */}
        <section className="max-w-3xl mx-auto text-center mb-16">
          <blockquote className="italic text-gray-600 text-lg">
            "Thanks to RecipeRealm, I've rediscovered the joy of cooking and connected with people who love food as much as I do."
          </blockquote>
          <p className="mt-2 text-sm text-gray-500">— Amina, RecipeRealm Member from Morocco</p>
        </section>

        
      </main>
    </>
  );
}
