import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Newsletter Blogs Manager',
  description: 'Manage your newsletter blogs with subscriber data and scheduling',
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // If user is not authenticated and trying to access protected routes
  const.protectedRoutes = ['/dashboard', '/newsletter-blogs'];
  const isProtectedRoute =.protectedRoutes.some(route => 
    typeof window !== 'undefined' ? window.location.pathname.startsWith(route) : false
  );

  if (isProtectedRoute && !session) {
    redirect('/login');
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-gray-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}