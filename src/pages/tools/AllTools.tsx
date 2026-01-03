import { useState } from 'react';
import SEO from '../../components/seo/SEO';
import ToolCard from '../../components/common/ToolCard';
import Ad from '../../components/ads/Ad';
import SearchBar from '../../components/common/SearchBar';
import CategoryFilter from '../../components/common/CategoryFilter';
import { tools, categoryInfo } from '../../config/tools';
import type { ToolCategory, Tool } from '../../types';

export default function AllTools() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [searchResults, setSearchResults] = useState<Tool[]>(tools);

  // Filter by category
  const categoryFilteredTools = selectedCategory === 'all' 
    ? searchResults 
    : searchResults.filter(tool => tool.category === selectedCategory);

  const handleSearch = (filtered: Tool[]) => {
    setSearchResults(filtered);
  };

  return (
    <>
      <SEO
        title="All Tools - ToolStack Online"
        description="Browse all free online tools available on ToolStack Online."
        canonicalUrl="https://toolstackonline.com/tools"
        keywords={['online tools', 'free tools', 'all tools', 'tool collection']}
      />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">All Tools</h1>
          <p className="text-xl font-sans text-gray-600 mb-8">
            Browse our complete collection of {tools.length} free online tools
          </p>

          <Ad className="mb-8" />

          {/* Search Bar */}
          <SearchBar tools={tools} onSearch={handleSearch} />

          {/* Category Filter */}
          <CategoryFilter 
            categories={categoryInfo}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryFilteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {categoryFilteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl font-sans text-gray-600 mb-2">No tools found</p>
              <p className="text-gray-500 font-sans">Try adjusting your search or filter selection</p>
            </div>
          )}

          <Ad className="mt-8" />
        </div>
      </div>
    </>
  );
}
