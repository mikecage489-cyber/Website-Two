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
      className="absolute top-full left-0 right-0 mt-1 bg-white shadow-xl border border-gray-200 rounded-lg z-50 animate-fadeIn"
      style={{
        maxWidth: '1200px',
        margin: '4px auto 0',
      }}
    >
      <div className="p-6">
        <div className="grid grid-cols-3 gap-8">
          {/* Column 1: Text Tools + Calculator Tools */}
          <div className="space-y-6">
            {toolsByCategory.slice(0, 2).map(({ category, tools: categoryTools }) => (
              <div key={category.id}>
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center gap-2 mb-3 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors group"
                  onClick={onClose}
                >
                  <CategoryIcon iconName={category.icon} className="w-5 h-5 text-primary-600 group-hover:text-primary-700" />
                  <span>{category.name}</span>
                </Link>
                <div className="space-y-2">
                  {categoryTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="block font-sans text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors text-sm"
                      onClick={onClose}
                    >
                      {tool.name}
                    </Link>
                  ))}
                  {tools.filter(t => t.category === category.id).length > 5 && (
                    <Link
                      to={`/category/${category.id}`}
                      className="block font-heading text-primary-600 hover:text-primary-700 px-2 py-1 transition-colors text-sm font-medium"
                      onClick={onClose}
                    >
                      View all →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Converter Tools + Developer Tools */}
          <div className="space-y-6">
            {toolsByCategory.slice(2, 4).map(({ category, tools: categoryTools }) => (
              <div key={category.id}>
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center gap-2 mb-3 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors group"
                  onClick={onClose}
                >
                  <CategoryIcon iconName={category.icon} className="w-5 h-5 text-primary-600 group-hover:text-primary-700" />
                  <span>{category.name}</span>
                </Link>
                <div className="space-y-2">
                  {categoryTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="block font-sans text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors text-sm"
                      onClick={onClose}
                    >
                      {tool.name}
                    </Link>
                  ))}
                  {tools.filter(t => t.category === category.id).length > 5 && (
                    <Link
                      to={`/category/${category.id}`}
                      className="block font-heading text-primary-600 hover:text-primary-700 px-2 py-1 transition-colors text-sm font-medium"
                      onClick={onClose}
                    >
                      View all →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Column 3: SEO Tools */}
          <div className="space-y-6">
            {toolsByCategory.slice(4, 5).map(({ category, tools: categoryTools }) => (
              <div key={category.id}>
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center gap-2 mb-3 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors group"
                  onClick={onClose}
                >
                  <CategoryIcon iconName={category.icon} className="w-5 h-5 text-primary-600 group-hover:text-primary-700" />
                  <span>{category.name}</span>
                </Link>
                <div className="space-y-2">
                  {categoryTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      className="block font-sans text-gray-700 hover:text-primary-600 hover:bg-gray-50 px-2 py-1 rounded transition-colors text-sm"
                      onClick={onClose}
                    >
                      {tool.name}
                    </Link>
                  ))}
                  {tools.filter(t => t.category === category.id).length > 5 && (
                    <Link
                      to={`/category/${category.id}`}
                      className="block font-heading text-primary-600 hover:text-primary-700 px-2 py-1 transition-colors text-sm font-medium"
                      onClick={onClose}
                    >
                      View all →
                    </Link>
                  )}
                </div>
              </div>
            ))}
            
            {/* View All Tools Link */}
            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/tools"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-heading font-medium"
                onClick={onClose}
              >
                View All Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
