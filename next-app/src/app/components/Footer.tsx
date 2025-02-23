import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-6 font-sans text-white bg-gray-900">
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
              <li>
                <Link href="/" className="transition hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="transition hover:text-gray-400">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-gray-400">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-gray-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-gray-400"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-gray-400"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-gray-400"
                >
                  Twitter
                </a>
              </li>
            </ul>
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
