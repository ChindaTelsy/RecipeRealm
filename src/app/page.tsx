import HomePage from './Homepage/page'; // or wherever your HomePage is

export const metadata = {
  title: 'RecipeRealm | Home',
  description: 'Discover delicious Cameroonian, African, and international recipes.',
  keywords: 'recipes, food, cooking, Cameroonian, African, international',
  openGraph: {
    title: 'RecipeRealm',
    description: 'Explore and share your favorite recipes from around the world.',
    url: 'https://yourdomain.com',
    siteName: 'RecipeRealm',
    images: [
      {
        url: '/images/preview.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function Page() {
  return <HomePage />;
}
