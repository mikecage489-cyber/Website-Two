import { Link } from 'react-router-dom';
import { Type, Calculator, RefreshCw, Code, Search, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { tools as allTools } from '../../config/tools';
import type { ToolCategory, Tool } from '../../types';

interface ToolsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const categoryConfig: Record<ToolCategory, { icon: LucideIcon; color: string }> = {
  'text-tools': { icon: Type, color: 'text-blue-500' },
  'calculator-tools': { icon: Calculator, color: 'text-green-500' },
  'converter-tools': { icon: RefreshCw, color: 'text-purple-500' },
  'developer-tools': { icon: Code, color: 'text-orange-500' },
  'seo-tools': { icon: Search, color: 'text-pink-500' }
};

const categoryNames: Record<ToolCategory, string> = {
  'text-tools': 'Text Tools',
  'calculator-tools': 'Calculator Tools',
  'converter-tools': 'Converter Tools',
  'developer-tools': 'Developer Tools',
  'seo-tools': 'SEO Tools'
};

export default function ToolsDropdown({ isOpen, onClose, isMobile }: ToolsDropdownProps) {
  if (!isOpen) return null;

  // Get featured tools from each category (max 3 per category)
  const featuredToolsByCategory: Record<ToolCategory, Tool[]> = {
    'text-tools': [],
    'calculator-tools': [],
    'converter-tools': [],
    'developer-tools': [],
    'seo-tools': []
  };
  
  allTools.forEach(tool => {
    if (tool.featured && featuredToolsByCategory[tool.category].length < 3) {
      featuredToolsByCategory[tool.category].push(tool);
    }
  });

  // Select categories to display (showing 3 main categories)
  const displayCategories: ToolCategory[] = ['text-tools', 'converter-tools', 'seo-tools'];

  // Mobile layout - simpler vertical list
  if (isMobile) {
    return (
      <div className="mt-2 space-y-2 pl-4">
        {displayCategories.map(categoryId => {
          const categoryTools = featuredToolsByCategory[categoryId] || [];
          const { icon: Icon, color } = categoryConfig[categoryId];
          
          return (
            <div key={categoryId} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <Icon className={`w-4 h-4 ${color}`} />
                <span>{categoryNames[categoryId]}</span>
              </div>
              <div className="space-y-1 pl-6">
                {categoryTools.slice(0, 3).map(tool => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    onClick={onClose}
                    className="block text-sm text-gray-600 hover:text-primary-600 py-1"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        <Link
          to="/tools"
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 pt-2"
        >
          View All Tools
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Desktop layout - multi-column with right alignment
  return (
    <div
      className="absolute right-0 mt-2 bg-white shadow-2xl border border-gray-100 rounded-lg z-50 animate-fadeIn"
      style={{
        maxWidth: '900px',
        width: '90vw',
      }}
    >
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {displayCategories.map(categoryId => {
            const categoryTools = featuredToolsByCategory[categoryId] || [];
            const { icon: Icon, color } = categoryConfig[categoryId];
            
            return (
              <div key={categoryId} className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <h3 className="font-semibold text-gray-900">{categoryNames[categoryId]}</h3>
                </div>
                <div className="space-y-2">
                  {categoryTools.slice(0, 5).map(tool => (
                    <Link
                      key={tool.id}
                      to={tool.path}
                      onClick={onClose}
                      className="block group"
                    >
                      <div className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {tool.name}
                      </div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-700">
                        {tool.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            to="/tools"
            onClick={onClose}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            View All Tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}