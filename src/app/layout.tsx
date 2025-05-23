import Footer from '../components/common/footer';
import '../styles/globals.css';
import { ReactNode } from 'react';
import PageWrapper from './PageWrapper';

export const metadata = {
  title: {
    default: 'RecipeRealm',
    template: '%s | RecipeRealm',
  },
  description: 'A recipe sharing platform featuring authentic Cameroonian cuisine and more.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <PageWrapper>{children}</PageWrapper>
        <Footer />
      </body>
    </html>
  );
}
