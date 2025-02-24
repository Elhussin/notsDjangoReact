"use client";
import clsx from "clsx"; 
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
const styles = {
  header: "sticky top-0 text-gray-100 shadow-md bg-sky-500 dark:bg-gray-900 dark:text-gray-100",
  container: "container flex items-center justify-between px-6 py-4 mx-auto",
  nav: "hidden space-x-6 md:flex",
  action: "flex space-x-4",
};
const Header: React.FC = () => {
  return (

    <header className={`${styles.header}`}>
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        {/* Logo */}
        <h1 className="text-lg font-bold">Solo Vizion</h1>

        {/* Navigation Links */}
        <nav className="hidden space-x-6 md:flex">
          <Link href="/home" className="transition hover:text-gray-300">
            Home
          </Link>
          <Link href="/shop" className="transition hover:text-gray-300">
            Shop
          </Link>
          <Link href="/about" className="transition hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-gray-300">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Link href="/cart" className={clsx("px-4 py-2 transition text-white-900 rounded-md bg-sky-600 tran-sition hover:bg-sky-800")}>
            Cart
          </Link>
          <Link href="/login" className="px-4 py-2 transition bg-gray-200 rounded-md hover:bg-gray-600">
            Login
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
