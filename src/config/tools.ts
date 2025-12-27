import type { Tool, CategoryInfo, ToolCategory } from '../types';

export const categoryInfo: Record<ToolCategory, CategoryInfo> = {
  'text-tools': {
    id: 'text-tools',
    name: 'Text Tools',
    description: 'Powerful text manipulation tools for everyday use',
    icon: '📝'
  },
  'calculator-tools': {
    id: 'calculator-tools',
    name: 'Calculator Tools',
    description: 'Simple and accurate calculators for various needs',
    icon: '🧮'
  },
  'converter-tools': {
    id: 'converter-tools',
    name: 'Converter Tools',
    description: 'Convert between different units and formats',
    icon: '🔄'
  },
  'developer-tools': {
    id: 'developer-tools',
    name: 'Developer Tools',
    description: 'Essential tools for developers',
    icon: '💻'
  }
};

export const tools: Tool[] = [
  // Text Tools
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text instantly',
    category: 'text-tools',
    path: '/tools/word-counter',
    keywords: ['word count', 'character count', 'text analysis', 'document counter'],
    featured: true
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    description: 'Count characters with and without spaces in your text',
    category: 'text-tools',
    path: '/tools/character-counter',
    keywords: ['character count', 'letter count', 'text length'],
    featured: true
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to uppercase, lowercase, title case, or sentence case',
    category: 'text-tools',
    path: '/tools/case-converter',
    keywords: ['uppercase', 'lowercase', 'title case', 'text transform'],
    featured: true
  },
  {
    id: 'text-cleaner',
    name: 'Text Cleaner',
    description: 'Remove extra spaces, line breaks, and clean up messy text',
    category: 'text-tools',
    path: '/tools/text-cleaner',
    keywords: ['text cleanup', 'remove spaces', 'clean text'],
    featured: false
  },
  
  // Calculator Tools
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase, decrease, and more',
    category: 'calculator-tools',
    path: '/tools/percentage-calculator',
    keywords: ['percentage', 'percent calculator', 'percentage increase'],
    featured: true
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, weeks, and days',
    category: 'calculator-tools',
    path: '/tools/age-calculator',
    keywords: ['age calculator', 'calculate age', 'birth date calculator'],
    featured: true
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and understand your health status',
    category: 'calculator-tools',
    path: '/tools/bmi-calculator',
    keywords: ['bmi calculator', 'body mass index', 'health calculator'],
    featured: true
  },
  
  // Converter Tools
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of length, weight, and temperature',
    category: 'converter-tools',
    path: '/tools/unit-converter',
    keywords: ['unit conversion', 'length converter', 'weight converter', 'temperature converter'],
    featured: true
  },
  
  // Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    category: 'developer-tools',
    path: '/tools/json-formatter',
    keywords: ['json formatter', 'json validator', 'json beautifier'],
    featured: true
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings quickly and easily',
    category: 'developer-tools',
    path: '/tools/base64-encoder',
    keywords: ['base64 encode', 'base64 decode', 'base64 converter'],
    featured: true
  }
];

export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: ToolCategory): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const getFeaturedTools = (): Tool[] => {
  return tools.filter(tool => tool.featured);
};

export const getRelatedTools = (toolId: string, limit: number = 3): Tool[] => {
  const currentTool = getToolById(toolId);
  if (!currentTool) return [];
  
  return tools
    .filter(tool => tool.id !== toolId && tool.category === currentTool.category)
    .slice(0, limit);
};
