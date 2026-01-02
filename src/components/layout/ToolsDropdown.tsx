import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { tools, categoryInfo } from '../../config/tools';
import CategoryIcon from '../common/CategoryIcon';
import type { ToolCategory } from '../../types';

interface ToolsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export default function ToolsDropdown({ isOpen, onClose, isMobile = false }: ToolsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, isMobile]);

  if (!isOpen) return null;

  // Group tools by category
  const categories: ToolCategory[] = ['text-tools', 'calculator-tools', 'converter-tools', 'developer-tools', 'seo-tools'];
  const toolsByCategory = categories.map(categoryId => ({
    category: categoryInfo[categoryId],
    tools: tools.filter(tool => tool.category === categoryId).slice(0, 5) // Limit to 5 tools per category for dropdown
  }));

  if (isMobile) {
    // Mobile accordion layout
    return (
      <div className="py-4 border-t border-gray-200">
        <div className="space-y-4">
          {toolsByCategory.map(({ category, tools: categoryTools }) => (
            <div key={category.id} className="space-y-2">
              <Link
                to={`/category/${category.id}`}
                className="flex items-center gap-2 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                onClick={onClose}
              >
                <CategoryIcon iconName={category.icon} className="w-5 h-5" />
                <span>{category.name}</span>
              </Link>
              <div className="pl-7 space-y-2">
                {categoryTools.map(tool => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="block font-sans text-gray-700 hover:text-primary-600 transition-colors text-sm"
                    onClick={onClose}
                  >
                    {tool.name}
                  </Link>
                ))}
                {tools.filter(t => t.category === category.id).length > 5 && (
                  <Link
                    to={`/category/${category.id}`}
                    className="block font-heading text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
                    onClick={onClose}
                  >
                    View all {category.name.toLowerCase()} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop dropdown layout
  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl border border-gray-100 rounded-xl z-50 animate-fadeIn overflow-hidden"
      style={{
        maxWidth: '1200px',
        margin: '8px auto 0',
      }}
    >
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 px-6 py-4 border-b border-gray-100">
        <h3 className="font-heading font-bold text-lg text-gray-900">Explore Our Tools</h3>
        <p className="font-sans text-sm text-gray-600 mt-1">Choose from our collection of helpful utilities</p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Column 1: Text Tools + Calculator Tools */}
          <div className="space-y-6">
            {toolsByCategory.slice(0, 2).map(({ category, tools: categoryTools }) => (
              <div key={category.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200">
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center gap-3 mb-4 font-heading font-bold text-gray-900 hover:text-primary-600 transition-colors group"
                  onClick={onClose}
                >
                  <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <CategoryIcon iconName={category.icon} className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className="text-base">{category.name}</span>
                </Link>
                <div className="space-y-1.5 ml-1">
                  {categoryTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="block font-sans text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-150 text-sm hover:translate-x-1"
                      onClick={onClose}
                    >
                      • {tool.name}
                    </Link>
                  ))}
                  {tools.filter(t => t.category === category.id).length > 5 && (
                    <Link
                      to={`/category/${category.id}`}
                      className="block font-heading text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-150 text-sm font-semibold mt-2"
                      onClick={onClose}
                    >
                      View all {category.name.toLowerCase()} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Converter Tools + Developer Tools */}
          <div className="space-y-6">
            {toolsByCategory.slice(2, 4).map(({ category, tools: categoryTools }) => (
              <div key={category.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200">
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center gap-3 mb-4 font-heading font-bold text-gray-900 hover:text-primary-600 transition-colors group"
                  onClick={onClose}
                >
                  <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <CategoryIcon iconName={category.icon} className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className="text-base">{category.name}</span>
                </Link>
                <div className="space-y-1.5 ml-1">
                  {categoryTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="block font-sans text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-150 text-sm hover:translate-x-1"
                      onClick={onClose}
                    >
                      • {tool.name}
                    </Link>
                  ))}
                  {tools.filter(t => t.category === category.id).length > 5 && (
                    <Link
                      to={`/category/${category.id}`}
                      className="block font-heading text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-150 text-sm font-semibold mt-2"
                      onClick={onClose}
                    >
                      View all {category.name.toLowerCase()} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: SEO Tools + CTA */}
          <div className="space-y-6">
            {toolsByCategory.slice(4, 5).map(({ category, tools: categoryTools }) => (
              <div key={category.id} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200">
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center gap-3 mb-4 font-heading font-bold text-gray-900 hover:text-primary-600 transition-colors group"
                  onClick={onClose}
                >
                  <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <CategoryIcon iconName={category.icon} className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className="text-base">{category.name}</span>
                </Link>
                <div className="space-y-1.5 ml-1">
                  {categoryTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="block font-sans text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-150 text-sm hover:translate-x-1"
                      onClick={onClose}
                    >
                      • {tool.name}
                    </Link>
                  ))}
                  {tools.filter(t => t.category === category.id).length > 5 && (
                    <Link
                      to={`/category/${category.id}`}
                      className="block font-heading text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all duration-150 text-sm font-semibold mt-2"
                      onClick={onClose}
                    >
                      View all {category.name.toLowerCase()} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            
            {/* View All Tools CTA */}
            <div className="bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <h4 className="font-heading font-bold text-lg mb-2">Discover More</h4>
              <p className="font-sans text-sm text-white/90 mb-4">Browse our complete collection of productivity tools</p>
              <Link
                to="/tools"
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-primary-600 rounded-lg hover:bg-gray-50 transition-all duration-200 font-heading font-semibold shadow-md hover:shadow-lg"
                onClick={onClose}
              >
                View All Tools →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
