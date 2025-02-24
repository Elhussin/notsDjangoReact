
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
// import Logout from '../components/Logout';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // useEffect(() => {
  //   let lastScrollY = window.scrollY;

  //   const handleScroll = () => {
  //     setShowNavbar(window.scrollY < lastScrollY);
  //     lastScrollY = window.scrollY;
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    // <nav
    //   className={`fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md transition-transform duration-300 ${
    //     showNavbar ? 'translate-y-0' : '-translate-y-full'
    //   }`}
    // >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          Home
        </Link>
        
        <div className="space-x-4">
          <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Dashboard
          </Link>
          <Link href="/admin" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Admin
          </Link>
          <Link href="/branch" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Branches
          </Link>
          {/* <Logout /> */}
        </div>

        {/* <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
