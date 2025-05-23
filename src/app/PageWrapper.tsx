'use client';

import { usePathname } from 'next/navigation';
import header from '../components/common/header';
import headerMin from '../components/common/headerMin';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  let HeaderComponent = null;

  // Define which header to use per route
  if (pathname.startsWith('/recipes') || pathname === '/Add-Recipe' || pathname === '/profile') {
    HeaderComponent = headerMin;
  } else if (['/', '/login', '/signup'].includes(pathname)) {
    HeaderComponent = header;
  }

  return (
    <>
      {HeaderComponent && <HeaderComponent />}
      <main className="flex-grow">{children}</main>
    </>
  );
}
