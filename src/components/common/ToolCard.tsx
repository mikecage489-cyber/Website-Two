import { Link } from 'react-router-dom';
import type { Tool } from '../../types';
import { categoryInfo } from '../../config/tools';
import CategoryIcon from './CategoryIcon';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const category = categoryInfo[tool.category];

  return (
    <Link
      to={tool.path}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 hover:border-primary-400"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-primary-600">
          <CategoryIcon iconName={category.icon} />
        </div>
        {tool.featured && (
          <span className="bg-primary-100 text-primary-800 text-xs font-heading font-semibold px-2.5 py-0.5 rounded">
            Featured
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{tool.name}</h3>
      
      <p className="text-gray-600 font-sans text-sm mb-3">{tool.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs font-sans text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {category.name}
        </span>
        <span className="text-primary-600 font-heading text-sm font-medium hover:text-primary-700">
          Use Tool →
        </span>
      </div>
    </Link>
  );
}
