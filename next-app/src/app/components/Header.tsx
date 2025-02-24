"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <h1 className="text-lg font-bold">Solo Vizion</h1>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/home" className=" transition hover:text-blue-500 dark:hover:text-blue-400 ">
            Home
          </Link>

          <Link href="/shop" className="hover:text-gray-300 transition">
            Shop
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Link href="/login" className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition">
            Login
          </Link>
          <Link href="/cart" className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition">
            Cart
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
