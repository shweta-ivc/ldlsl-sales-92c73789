'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, FileText, PlusCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Newsletter Blogs', href: '/newsletter-blogs', icon: FileText },
    { name: 'Create Blog', href: '/newsletter-blogs/create', icon: PlusCircle },
  ];

  const handleLogout = () => {
    // In a real app, you would:
    // 1. Clear auth tokens from storage
    // 2. Reset any user state in context/store
    // 3. Redirect to login page
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">Newsletter Blogs Manager</span>
            </div>
            <nav className="ml-6 flex space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href} className="flex items-center">
                    <Button 
                      variant="ghost" 
                      className={`flex items-center ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" onClick={handleLogout} className="flex items-center text-gray-600 hover:bg-gray-100">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}