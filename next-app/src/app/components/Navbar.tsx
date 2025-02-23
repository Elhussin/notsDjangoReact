"use client"; // إذا كنت تستخدم Next.js مع App Router
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 text-white bg-blue-600">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">الرئيسية</Link>
        </li>
        <li>
          <Link href="/about">من نحن</Link>
        </li>
        <li>
          <Link href="/contact">تواصل معنا</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
