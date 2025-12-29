import { useState } from 'react';
import type { Tool } from '../../types';

interface SearchBarProps {
  tools: Tool[];
  onSearch: (filteredTools: Tool[]) => void;
}

export default function SearchBar({ tools, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      onSearch(tools);
      return;
    }

    const searchLower = term.toLowerCase();
    const filtered = tools.filter(tool => 
      tool.name.toLowerCase().includes(searchLower) ||
      tool.description.toLowerCase().includes(searchLower) ||
      tool.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
    );

    onSearch(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch(tools);
  };

  return (
    <div className="relative mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search tools by name, description, or keywords..."
          className="w-full p-4 pr-12 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
