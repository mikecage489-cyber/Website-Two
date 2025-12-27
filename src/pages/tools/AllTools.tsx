import { useState } from 'react';
import SEO from '../../components/seo/SEO';
import ToolCard from '../../components/common/ToolCard';
import Ad from '../../components/ads/Ad';
import { tools, categoryInfo } from '../../config/tools';
import type { ToolCategory } from '../../types';

export default function AllTools() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <>
      <SEO
        title="All Tools - Helpful Tools"
        description="Browse our complete collection of free online tools including text tools, calculators, converters, and developer tools."
        keywords={['online tools', 'free tools', 'all tools', 'tool collection']}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Tools</h1>
          <p className="text-xl text-gray-600 mb-8">
            Browse our complete collection of {tools.length} free online tools
          </p>

          <Ad className="mb-8" />

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Tools
            </button>
            {Object.values(categoryInfo).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No tools found in this category.</p>
            </div>
          )}

          <Ad className="mt-8" />
        </div>
      </div>
    </>
  );
}
