'use client';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function Navbar() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-600">AIStore</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-green-500">
                Home
              </Link>
              <Link href="/products" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-green-500">
                Products
              </Link>
              <Link href="/aboutUs" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-green-500">
                About
              </Link>
              <Link href="/contact" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-green-500">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user.firstName}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-900 hover:text-green-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 