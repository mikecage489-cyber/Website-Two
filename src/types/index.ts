// Core type definitions for the application

export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: ToolCategory;
  path: string;
  keywords: string[];
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  faqs?: FAQ[];
  relatedToolIds?: string[];
  instructions?: string;
  example?: string;
  useCases?: string[];
  benefits?: string[];
}

export type ToolCategory = 
  | 'text-tools'
  | 'calculator-tools'
  | 'converter-tools'
  | 'developer-tools'
  | 'seo-tools';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string; // Now stores the icon name for lucide-react
  longDescription?: string;
  benefits?: string[];
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ToolPageProps {
  tool: Tool;
  relatedTools?: Tool[];
}
