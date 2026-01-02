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

  // Desktop dropdown layout - Simple grid with 4 tools per category
  return (
    <div
      ref={dropdownRef}
      className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-xl border border-gray-200 rounded-lg z-50 animate-fadeIn"
      style={{
        width: '90vw',
        maxWidth: '1100px',
      }}
    >
      <div className="p-6">
        {/* Categories Grid - 5 columns, simple tiles */}
        <div className="grid grid-cols-5 gap-6">
          {toolsByCategory.map(({ category, tools: categoryTools }) => (
            <div key={category.id} className="space-y-3">
              {/* Category Header - Simple text, no big logo */}
              <Link
                to={`/category/${category.id}`}
                className="block font-heading font-bold text-gray-900 hover:text-primary-600 transition-colors text-sm mb-3 pb-2 border-b-2 border-gray-200"
                onClick={onClose}
              >
                {category.name}
              </Link>

              {/* Tool Links - Show only 4 tools */}
              <div className="space-y-2">
                {categoryTools.slice(0, 4).map(tool => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="block px-2 py-1.5 text-sm font-sans text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View All Tools Button */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <Link
            to="/tools"
            className="inline-block px-6 py-2.5 bg-primary-600 text-white font-heading font-medium rounded-lg hover:bg-primary-700 transition-colors text-sm"
            onClick={onClose}
          >
            View All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
