'use client';

import { Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="relative w-full px-6 md:px-10 py-4 flex items-center justify-between border-b border-gray-800 bg-black sticky top-0 z-50">
      {/* Left Logo */}
      <div className="flex items-center space-x-2 z-10">
        <Activity className="w-8 h-8 text-green-500 animate-pulse" />
        <span className="text-2xl font-bold text-white">FitTrack</span>
      </div>

      {/* Center Navigation */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8">
        <Link
          href="/"
          className="text-white hover:text-green-500 hover:scale-105 transition-all font-semibold"
        >
          Home
        </Link>
        <Link
          href="/Services"
          className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all font-semibold"
        >
          Services
        </Link>
        <Link
          href="/about"
          className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all font-semibold"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all font-semibold"
        >
          Contact
        </Link>
      </div>

      {/* Right Login Button */}
      <div className="z-10">
        <button
          onClick={() => router.push('/login')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 transition-all"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
