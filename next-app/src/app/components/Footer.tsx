import Link from "next/link";
import clsx from "clsx"; 
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; 
const pages = ["Home", "Shop", "About", "Contact"];
const Footer = () => {
  return (
    // <div className="p-4 text-black bg-gray-100 dark:bg-gray-900 dark:text-white">

    <footer className={clsx("py-6 font-sans text-black bg-gray-100 dark:bg-gray-900 dark:text-white")}>
      <div className="container px-6 mx-auto md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          
          {/* About Us Section */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">About Us</h3>
            <p className="text-sm">
              We provide the best eyewear products to enhance your vision and
              style.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
              {pages.map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className={clsx("hover:text-gray-400", "transition")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
{/* Social Media Section */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="w-6 h-6 transition hover:text-blue-500" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="w-6 h-6 transition hover:text-pink-500" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="w-6 h-6 transition hover:text-blue-400" />
              </a>
            </div>
        </div>
        </div>
        {/* Copyright Section */}
        <div className="pt-4 mt-6 text-sm text-center border-t border-gray-700">
          &copy; {new Date().getFullYear()} Solo Vizion. All Rights Reserved.
        </div>
        

      </div>
    </footer>
  );
};


export default Footer;
