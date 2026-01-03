import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
    tools: tools.filter(tool => tool.category === categoryId).slice(0, 6)
  }));

  if (isMobile) {
    // Mobile accordion layout (keep existing)
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
        </div>
      </div>
    );
  }

  // Desktop dropdown - CENTERED BELOW NAVBAR
  const dropdownContent = (
    <div
      ref={dropdownRef}
      className="fixed left-1/2 transform -translate-x-1/2 bg-white shadow-2xl border border-gray-100 rounded-lg z-50 animate-fadeIn"
      style={{
        top: '64px', // Height of navbar
        maxWidth: '1200px',
        width: 'min(90vw, 1200px)',
      }}
    >
      <div className="p-8">
        {/* Row 1: Text Tools | Converter Tools | SEO Tools */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Text Tools */}
          <div className="space-y-3">
            <Link
              to="/category/text-tools"
              className="flex items-center gap-2 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors text-base mb-4"
              onClick={onClose}
            >
              <CategoryIcon iconName={categoryInfo['text-tools'].icon} className="w-5 h-5 text-primary-600" />
              <span>Text Tools</span>
            </Link>
            <div className="space-y-2">
              {tools.filter(t => t.category === 'text-tools').slice(0, 5).map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="block font-sans text-gray-600 hover:text-primary-600 transition-colors text-sm py-1"
                  onClick={onClose}
                >
                  {tool.name}
                </Link>
              ))}
              <Link
                to="/category/text-tools"
                className="flex items-center gap-1 font-sans text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium pt-2"
                onClick={onClose}
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Converter Tools */}
          <div className="space-y-3">
            <Link
              to="/category/converter-tools"
              className="flex items-center gap-2 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors text-base mb-4"
              onClick={onClose}
            >
              <CategoryIcon iconName={categoryInfo['converter-tools'].icon} className="w-5 h-5 text-primary-600" />
              <span>Converter Tools</span>
            </Link>
            <div className="space-y-2">
              {tools.filter(t => t.category === 'converter-tools').slice(0, 5).map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="block font-sans text-gray-600 hover:text-primary-600 transition-colors text-sm py-1"
                  onClick={onClose}
                >
                  {tool.name}
                </Link>
              ))}
              <Link
                to="/category/converter-tools"
                className="flex items-center gap-1 font-sans text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium pt-2"
                onClick={onClose}
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* SEO Tools + View All Button */}
          <div className="space-y-3">
            <Link
              to="/category/seo-tools"
              className="flex items-center gap-2 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors text-base mb-4"
              onClick={onClose}
            >
              <CategoryIcon iconName={categoryInfo['seo-tools'].icon} className="w-5 h-5 text-primary-600" />
              <span>SEO Tools</span>
            </Link>
            <div className="space-y-2 mb-6">
              {tools.filter(t => t.category === 'seo-tools').slice(0, 4).map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="block font-sans text-gray-600 hover:text-primary-600 transition-colors text-sm py-1"
                  onClick={onClose}
                >
                  {tool.name}
                </Link>
              ))}
              <Link
                to="/category/seo-tools"
                className="flex items-center gap-1 font-sans text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium pt-2"
                onClick={onClose}
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            
            {/* View All Tools Button */}
            <Link
              to="/tools"
              className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-heading font-semibold px-6 py-3 rounded-lg text-center transition-all hover:shadow-lg"
              onClick={onClose}
            >
              View All Tools
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-6"></div>

        {/* Row 2: Calculator Tools | Developer Tools */}
        <div className="grid grid-cols-3 gap-8">
          {/* Calculator Tools */}
          <div className="space-y-3">
            <Link
              to="/category/calculator-tools"
              className="flex items-center gap-2 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors text-base mb-4"
              onClick={onClose}
            >
              <CategoryIcon iconName={categoryInfo['calculator-tools'].icon} className="w-5 h-5 text-primary-600" />
              <span>Calculator Tools</span>
            </Link>
            <div className="space-y-2">
              {tools.filter(t => t.category === 'calculator-tools').slice(0, 5).map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="block font-sans text-gray-600 hover:text-primary-600 transition-colors text-sm py-1"
                  onClick={onClose}
                >
                  {tool.name}
                </Link>
              ))}
              <Link
                to="/category/calculator-tools"
                className="flex items-center gap-1 font-sans text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium pt-2"
                onClick={onClose}
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Developer Tools */}
          <div className="space-y-3">
            <Link
              to="/category/developer-tools"
              className="flex items-center gap-2 font-heading font-semibold text-gray-900 hover:text-primary-600 transition-colors text-base mb-4"
              onClick={onClose}
            >
              <CategoryIcon iconName={categoryInfo['developer-tools'].icon} className="w-5 h-5 text-primary-600" />
              <span>Developer Tools</span>
            </Link>
            <div className="space-y-2">
              {tools.filter(t => t.category === 'developer-tools').slice(0, 5).map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="block font-sans text-gray-600 hover:text-primary-600 transition-colors text-sm py-1"
                  onClick={onClose}
                >
                  {tool.name}
                </Link>
              ))}
              <Link
                to="/category/developer-tools"
                className="flex items-center gap-1 font-sans text-primary-600 hover:text-primary-700 transition-colors text-sm font-medium pt-2"
                onClick={onClose}
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Empty third column */}
          <div></div>
        </div>
      </div>
    </div>
  );

  // Render dropdown using portal at root level for proper positioning
  return createPortal(dropdownContent, document.body);
}