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

  // Desktop dropdown layout - Wide mega menu style
  return (
    <div
      ref={dropdownRef}
      className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-2xl border border-gray-200 rounded-2xl z-50 animate-fadeIn"
      style={{
        width: '95vw',
        maxWidth: '1400px',
      }}
    >
      <div className="p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">Browse Tools by Category</h3>
          <p className="font-sans text-gray-600">Select a category or tool to get started</p>
        </div>

        {/* Categories Grid - 5 columns for better spread */}
        <div className="grid grid-cols-5 gap-8 mb-8">
          {toolsByCategory.map(({ category, tools: categoryTools }) => (
            <div key={category.id} className="space-y-4">
              {/* Category Header */}
              <Link
                to={`/category/${category.id}`}
                className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl hover:from-primary-100 hover:to-primary-200 transition-all duration-200 group"
                onClick={onClose}
              >
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                  <CategoryIcon iconName={category.icon} className="w-8 h-8 text-primary-600" />
                </div>
                <span className="font-heading font-bold text-center text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </span>
              </Link>

              {/* Tool Links */}
              <div className="space-y-1">
                {categoryTools.map(tool => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="block px-3 py-2 text-sm font-sans text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    {tool.name}
                  </Link>
                ))}
                {tools.filter(t => t.category === category.id).length > 5 && (
                  <Link
                    to={`/category/${category.id}`}
                    className="block px-3 py-2 text-sm font-heading font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    View all →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-heading font-semibold rounded-xl hover:from-primary-700 hover:to-accent-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={onClose}
          >
            Browse All Tools
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
