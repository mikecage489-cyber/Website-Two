import type { ToolCategory, CategoryInfo } from '../../types';

interface CategoryFilterProps {
  categories: Record<ToolCategory, CategoryInfo>;
  selectedCategory: ToolCategory | 'all';
  onSelectCategory: (category: ToolCategory | 'all') => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Tools
        </button>
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => onSelectCategory(key as ToolCategory)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
