import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { tools, categoryInfo } from '../../config/tools';
import CategoryIcon from '../common/CategoryIcon';
import type { Tool } from '../../types';

export default function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase().trim();
    
    return tools
      .filter(tool => {
        // Search in tool name, description, keywords, and category name
        const matchesName = tool.name.toLowerCase().includes(searchTerm);
        const matchesDescription = tool.description.toLowerCase().includes(searchTerm);
        const matchesKeywords = tool.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        );
        const matchesCategory = categoryInfo[tool.category].name.toLowerCase().includes(searchTerm);
        
        return matchesName || matchesDescription || matchesKeywords || matchesCategory;
      })
      .slice(0, 8); // Limit to 8 results
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTool = useCallback((tool: Tool) => {
    navigate(tool.path);
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0); // Reset selection when query changes
    setIsOpen(true);
  };

  const handleClearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || filteredTools.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredTools.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredTools[selectedIndex]) {
            handleSelectTool(filteredTools[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setQuery('');
          inputRef.current?.blur();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, filteredTools, selectedIndex, handleSelectTool]);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search tools..."
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-sans text-sm"
        />
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && query && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {filteredTools.length > 0 ? (
            <ul className="py-2">
              {filteredTools.map((tool, index) => {
                const category = categoryInfo[tool.category];
                const isSelected = index === selectedIndex;
                
                return (
                  <li key={tool.id}>
                    <button
                      onClick={() => handleSelectTool(tool)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                        isSelected ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className={`mt-0.5 ${isSelected ? 'text-primary-600' : 'text-gray-600'}`}>
                        <CategoryIcon iconName={category.icon} className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-heading font-semibold text-gray-900 truncate">
                            {tool.name}
                          </h4>
                          {tool.featured && (
                            <span className="text-xs bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-sans text-gray-600 truncate mt-0.5">
                          {tool.description}
                        </p>
                        <span className="text-xs font-sans text-gray-500 mt-1 inline-block">
                          {category.name}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-sans">No tools found matching "{query}"</p>
              <p className="text-xs font-sans mt-1">Try different keywords</p>
            </div>
          )}
        </div>
      )}

      {/* Keyboard hint (desktop only) */}
      {!isOpen && (
        <div className="hidden md:block absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded">
            /
          </kbd>
        </div>
      )}
    </div>
  );
}
