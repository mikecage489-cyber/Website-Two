import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { tools, categoryInfo } from '../../config/tools';
import CategoryIcon from '../common/CategoryIcon';
import { ArrowRight } from 'lucide-react';
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
    categoryId,
    tools: tools.filter(tool => tool.category === categoryId).slice(0, 6) // Show 6 tools per category
  }));

  if (isMobile) {
    // Mobile accordion layout (keep existing mobile implementation)
    return (
      <div className="py-4 border-t border-gray-200">
        <div className="space-y-4">
          {toolsByCategory.map(({ category, categoryId, tools: categoryTools }) => (
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
                <Link
                  to={`/category/${categoryId}`}
                  className="flex items-center gap-1 font-sans text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium"
                  onClick={onClose}
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
          <Link
            to="/tools"
            className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-heading font-semibold px-6 py-3 rounded-lg text-center transition-colors mt-6"
            onClick={onClose}
          >
            View All Tools
          </Link>
        </div>
      </div>
    );
  }

  // Desktop dropdown layout - HORIZONTAL DESIGN
  return (
    <div
      ref={dropdownRef}
      className="absolute left-0 right-0 mt-2 bg-white shadow-2xl border border-gray-100 rounded-lg z-50 animate-fadeIn"
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1200px',
        width: '95vw',
      }}
    >
      <div className="p-6">
        {/* Grid Layout - 5 columns (all categories horizontally) */}
        <div className="grid grid-cols-5 gap-6">
          {toolsByCategory.map(({ category, categoryId, tools: categoryTools }) => (
            <div key={category.id} className="space-y-3">
              {/* Category Header */}
              <Link
                to={`/category/${categoryId}`}
                className="flex items-center gap-2 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors text-sm mb-3"
                onClick={onClose}
              >
                <CategoryIcon iconName={category.icon} className="w-4 h-4 text-primary-600" />
                <span>{category.name}</span>
              </Link>

              {/* Tool Links - Show 5 tools per category */}
              <div className="space-y-2">
                {categoryTools.slice(0, 5).map(tool => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="block font-sans text-gray-600 hover:text-primary-600 transition-colors text-xs py-1"
                    onClick={onClose}
                  >
                    {tool.name}
                  </Link>
                ))}
                <Link
                  to={`/category/${categoryId}`}
                  className="flex items-center gap-1 font-sans text-primary-600 hover:text-primary-700 transition-colors text-xs font-medium pt-1"
                  onClick={onClose}
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Tools Button */}
        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <Link
            to="/tools"
            className="inline-block px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-heading font-semibold rounded-lg text-sm transition-all hover:shadow-lg"
            onClick={onClose}
          >
            View All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
