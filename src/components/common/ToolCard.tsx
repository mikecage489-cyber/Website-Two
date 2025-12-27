import { Link } from 'react-router-dom';
import type { Tool } from '../../types';
import { categoryInfo } from '../../config/tools';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const category = categoryInfo[tool.category];

  return (
    <Link
      to={tool.path}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 hover:border-blue-400"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{category.icon}</span>
        {tool.featured && (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            Featured
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
      
      <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {category.name}
        </span>
        <span className="text-blue-600 text-sm font-medium hover:text-blue-700">
          Use Tool →
        </span>
      </div>
    </Link>
  );
}
