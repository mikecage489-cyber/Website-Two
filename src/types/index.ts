// Core type definitions for the application

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  path: string;
  keywords: string[];
  featured: boolean;
}

export type ToolCategory = 
  | 'text-tools'
  | 'calculator-tools'
  | 'converter-tools'
  | 'seo-tools'
  | 'developer-tools';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
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
  question: string;
  answer: string;
}

export interface ToolPageProps {
  tool: Tool;
  relatedTools?: Tool[];
}
