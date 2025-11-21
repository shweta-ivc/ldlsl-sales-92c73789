'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Users, 
  Settings,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    requiresAuth: false
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    requiresAuth: true
  },
  {
    name: 'Newsletter Blogs',
    href: '/newsletter-blogs',
    icon: FileText,
    requiresAuth: true
  },
  {
    name: 'Create Blog',
    href: '/newsletter-blogs/create',
    icon: PlusCircle,
    requiresAuth: true
  },
  {
    name: 'Login',
    href: '/login',
    icon: LogIn,
    requiresAuth: false
  },
  {
    name: 'Register',
    href: '/register',
    icon: UserPlus,
    requiresAuth: false
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <h1 className="text-xl font-bold">Newsletter Blogs Manager</h1>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-800 p-4">
          <Button variant="outline" className="w-full text-gray-300 border-gray-700 hover:bg-gray-800">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}