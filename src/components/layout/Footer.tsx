import { Link } from 'react-router-dom';
import { categoryInfo } from '../../config/tools';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🛠️</span>
              <span className="text-xl font-heading font-bold text-white">ToolStack Online</span>
            </div>
            <p className="text-sm font-sans text-gray-400">
              Free online tools to make your work easier. Fast, secure, and always available.
            </p>
          </div>

          {/* Tool Categories */}
          <div className="col-span-1">
            <h3 className="text-white font-heading font-semibold mb-4">Tool Categories</h3>
            <ul className="space-y-2">
              {Object.values(categoryInfo).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="text-sm font-sans hover:text-blue-400 transition-colors"
                  >
                    {category.icon} {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm font-sans hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-sm font-sans hover:text-blue-400 transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm font-sans hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm font-sans hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-white font-heading font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-sm font-sans hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-sm font-sans hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm font-sans text-gray-400">
            © {currentYear} ToolStack Online. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
