import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import SearchDropdown from '../search/SearchDropdown';
import ToolsDropdown from './ToolsDropdown';
import { ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle mouse enter with immediate open and clear any pending close
  const handleToolsMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setToolsDropdownOpen(true);
  };

  // Handle mouse leave with delay before closing
  const handleToolsMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setToolsDropdownOpen(false);
    }, 300);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl font-bold text-primary-600">🛠️</span>
            <span className="text-xl font-heading font-bold text-gray-900 hidden sm:inline">ToolStack Online</span>
          </Link>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchDropdown />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
            <Link to="/" className="font-heading text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Home
            </Link>
            <div 
              className="relative"
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              <button 
                className="font-heading flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                aria-expanded={toolsDropdownOpen}
                aria-haspopup="true"
              >
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Desktop Tools Dropdown - Positioned within hover container */}
              <div
                onMouseEnter={handleToolsMouseEnter}
                onMouseLeave={handleToolsMouseLeave}
              >
                <ToolsDropdown 
                  isOpen={toolsDropdownOpen} 
                  onClose={() => setToolsDropdownOpen(false)}
                  isMobile={false}
                />
              </div>
            </div>
            <Link to="/tools" className="font-heading text-gray-700 hover:text-primary-600 transition-colors font-medium">
              All Tools
            </Link>
            <Link to="/about" className="font-heading text-gray-700 hover:text-primary-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="font-heading text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 space-y-4">
            {/* Mobile Search */}
            <div className="pb-4">
              <SearchDropdown />
            </div>
            
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="font-heading text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="space-y-2">
                <button
                  onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                  className="font-heading flex items-center justify-between w-full text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  aria-expanded={toolsDropdownOpen}
                >
                  Tools
                  <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <ToolsDropdown 
                  isOpen={toolsDropdownOpen} 
                  onClose={() => {
                    setToolsDropdownOpen(false);
                    setMobileMenuOpen(false);
                  }}
                  isMobile={true}
                />
              </div>
              <Link
                to="/tools"
                className="font-heading text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Tools
              </Link>
              <Link
                to="/about"
                className="font-heading text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="font-heading text-gray-700 hover:text-primary-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
