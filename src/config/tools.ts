import type { Tool, CategoryInfo, ToolCategory } from '../types';

export const categoryInfo: Record<ToolCategory, CategoryInfo> = {
  'text-tools': {
    id: 'text-tools',
    name: 'Text Tools',
    description: 'Powerful text manipulation tools for everyday use',
    icon: 'Type',
    longDescription: 'Our comprehensive collection of text tools helps you manipulate, analyze, and transform text with ease. Whether you\'re a writer tracking word count, a developer formatting code, or a student working on assignments, our text tools provide instant results without any downloads or installations.',
    benefits: [
      'Instant text analysis and transformation',
      'No software installation required',
      'Works completely offline in your browser',
      'Support for large text files',
      'Privacy-focused - your data never leaves your device'
    ]
  },
  'calculator-tools': {
    id: 'calculator-tools',
    name: 'Calculator Tools',
    description: 'Simple and accurate calculators for various needs',
    icon: 'Calculator',
    longDescription: 'Access a wide range of calculators for everyday calculations. From basic percentage calculations to complex compound interest computations, our calculator tools provide accurate results instantly. Perfect for students, professionals, and anyone needing quick calculations.',
    benefits: [
      'Accurate calculations every time',
      'Easy-to-use interfaces',
      'Support for multiple calculation types',
      'Real-time results as you type',
      'Mobile-friendly design'
    ]
  },
  'converter-tools': {
    id: 'converter-tools',
    name: 'Converter Tools',
    description: 'Convert between different units and formats',
    icon: 'RefreshCw',
    longDescription: 'Convert between different units and formats effortlessly. Our converter tools support metric and imperial units, color codes, number systems, and more. Essential for developers, designers, students, and professionals working with international standards.',
    benefits: [
      'Support for metric and imperial units',
      'Instant conversion results',
      'High precision calculations',
      'Multiple unit categories',
      'Bidirectional conversion'
    ]
  },
  'developer-tools': {
    id: 'developer-tools',
    name: 'Developer Tools',
    description: 'Essential tools for developers',
    icon: 'Code',
    longDescription: 'Streamline your development workflow with our collection of developer tools. Format and validate code, encode and decode strings, generate UUIDs, and more. All tools are designed to save you time and improve code quality.',
    benefits: [
      'Speed up development tasks',
      'No API keys or registration required',
      'Syntax highlighting and error detection',
      'Support for multiple formats',
      'Browser-based - works anywhere'
    ]
  },
  'seo-tools': {
    id: 'seo-tools',
    name: 'SEO Tools',
    description: 'Optimize your website for search engines',
    icon: 'Search',
    longDescription: 'Improve your website\'s search engine rankings with our SEO tools. Check meta tag lengths, generate SEO-friendly URLs, analyze keyword density, and create Open Graph tags. Essential for content creators, marketers, and website owners.',
    benefits: [
      'Optimize for search engines',
      'Improve click-through rates',
      'Generate social media tags',
      'Real-time character counting',
      'Best practice recommendations'
    ]
  }
};

export const tools: Tool[] = [
  // Text Tools (13 tools)
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text instantly',
    category: 'text-tools',
    path: '/tools/word-counter',
    keywords: ['word count', 'character count', 'text analysis', 'document counter', 'word counter tool', 'count words online', 'free word counter'],
    featured: true,
    metaTitle: 'Word Counter - Free Online Character & Word Count Tool',
    metaDescription: 'Count words, characters, sentences, and paragraphs instantly with our free online word counter. No download required. Get accurate results in real-time for essays, articles, and documents.'
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    description: 'Count characters with and without spaces in your text',
    category: 'text-tools',
    path: '/tools/character-counter',
    keywords: ['character count', 'letter count', 'text length', 'count characters online', 'character counter tool', 'twitter character count'],
    featured: true,
    metaTitle: 'Character Counter - Free Online Letter & Character Count Tool',
    metaDescription: 'Count characters with and without spaces instantly. Perfect for Twitter, meta descriptions, and text with character limits. Free online character counter tool with real-time results.'
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to uppercase, lowercase, title case, or sentence case',
    category: 'text-tools',
    path: '/tools/case-converter',
    keywords: ['uppercase', 'lowercase', 'title case', 'text transform', 'case converter', 'text case converter', 'camelCase', 'snake_case'],
    featured: true,
    metaTitle: 'Case Converter - Convert Text to Upper, Lower, Title & Sentence Case',
    metaDescription: 'Convert text between uppercase, lowercase, title case, sentence case, camelCase, and snake_case instantly. Free online case converter tool for formatting text.'
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
  {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    description: 'Remove duplicate lines from your text while preserving unique content',
    category: 'text-tools',
    path: '/tools/remove-duplicate-lines',
    keywords: ['remove duplicates', 'unique lines', 'text deduplication'],
    featured: false
  },
  {
    id: 'sort-lines',
    name: 'Sort Lines Alphabetically',
    description: 'Sort text lines in ascending or descending alphabetical order',
    category: 'text-tools',
    path: '/tools/sort-lines',
    keywords: ['sort lines', 'alphabetical order', 'organize text'],
    featured: false
  },
  {
    id: 'reverse-text',
    name: 'Reverse Text',
    description: 'Reverse text by characters, words, or lines for various purposes',
    category: 'text-tools',
    path: '/tools/reverse-text',
    keywords: ['reverse text', 'flip text', 'mirror text'],
    featured: false
  },
  {
    id: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder Lorem Ipsum text for your design projects',
    category: 'text-tools',
    path: '/tools/lorem-ipsum-generator',
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text', 'filler text', 'lorem ipsum generator', 'lipsum generator'],
    featured: true,
    metaTitle: 'Lorem Ipsum Generator - Free Placeholder Text Generator Online',
    metaDescription: 'Generate Lorem Ipsum placeholder text instantly for your design mockups and projects. Free online Lorem Ipsum generator with customizable paragraph counts.'
  },
  {
    id: 'palindrome-checker',
    name: 'Palindrome Checker',
    description: 'Check if text is a palindrome - reads the same forwards and backwards',
    category: 'text-tools',
    path: '/tools/palindrome-checker',
    keywords: ['palindrome', 'word games', 'text checker'],
    featured: false
  },
  {
    id: 'word-frequency-counter',
    name: 'Word Frequency Counter',
    description: 'Analyze word frequency and find the most common words in your text',
    category: 'text-tools',
    path: '/tools/word-frequency-counter',
    keywords: ['word frequency', 'text analysis', 'word count statistics'],
    featured: false
  },
  
  // Calculator Tools (10 tools)
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase, decrease, and more',
    category: 'calculator-tools',
    path: '/tools/percentage-calculator',
    keywords: ['percentage', 'percent calculator', 'percentage increase', 'percentage calculator online', 'calculate percentage', 'percent of'],
    featured: true,
    metaTitle: 'Percentage Calculator - Calculate Percentages, Increase & Decrease',
    metaDescription: 'Free online percentage calculator. Calculate what percentage one number is of another, percentage increase/decrease, and more. Fast, accurate, and easy to use.'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, weeks, and days',
    category: 'calculator-tools',
    path: '/tools/age-calculator',
    keywords: ['age calculator', 'calculate age', 'birth date calculator', 'age in days', 'how old am i', 'date of birth calculator'],
    featured: true,
    metaTitle: 'Age Calculator - Calculate Your Exact Age in Years, Months & Days',
    metaDescription: 'Calculate your exact age from birth date. Get your age in years, months, weeks, days, hours, and minutes. Free online age calculator with precise results.'
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and understand your health status',
    category: 'calculator-tools',
    path: '/tools/bmi-calculator',
    keywords: ['bmi calculator', 'body mass index', 'health calculator', 'bmi chart', 'calculate bmi', 'weight calculator'],
    featured: true,
    metaTitle: 'BMI Calculator - Free Body Mass Index Calculator Online',
    metaDescription: 'Calculate your BMI (Body Mass Index) instantly. Free BMI calculator with metric and imperial units. Understand your weight category and health status.'
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tip amount and split bills easily with customizable tip percentages',
    category: 'calculator-tools',
    path: '/tools/tip-calculator',
    keywords: ['tip calculator', 'gratuity calculator', 'bill splitter', 'calculate tip', 'tip percentage', 'restaurant tip calculator'],
    featured: true,
    metaTitle: 'Tip Calculator - Calculate Tips & Split Bills Easily',
    metaDescription: 'Calculate restaurant tips and split bills effortlessly. Free tip calculator with customizable tip percentages and bill splitting for multiple people.'
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate discounts and final prices after percentage reductions',
    category: 'calculator-tools',
    path: '/tools/discount-calculator',
    keywords: ['discount calculator', 'sale price', 'savings calculator', 'calculate discount', 'percentage off calculator', 'price after discount'],
    featured: true,
    metaTitle: 'Discount Calculator - Calculate Sale Prices & Savings',
    metaDescription: 'Calculate discount prices and savings instantly. Free discount calculator shows final price, discount amount, and percentage saved. Perfect for shopping and sales.'
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest on investments with different frequencies',
    category: 'calculator-tools',
    path: '/tools/compound-interest-calculator',
    keywords: ['compound interest', 'investment calculator', 'savings calculator'],
    featured: false
  },
  {
    id: 'grade-calculator',
    name: 'Grade Calculator',
    description: 'Calculate weighted grades and letter grades from multiple assignments',
    category: 'calculator-tools',
    path: '/tools/grade-calculator',
    keywords: ['grade calculator', 'weighted grade', 'student calculator'],
    featured: false
  },
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    description: 'Calculate your Grade Point Average from multiple courses and grades',
    category: 'calculator-tools',
    path: '/tools/gpa-calculator',
    keywords: ['gpa calculator', 'grade point average', 'college calculator'],
    featured: false
  },
  {
    id: 'date-calculator',
    name: 'Date Calculator',
    description: 'Calculate the difference between two dates in days, weeks, months, and years',
    category: 'calculator-tools',
    path: '/tools/date-calculator',
    keywords: ['date calculator', 'days between dates', 'date difference'],
    featured: false
  },
  
  // Converter Tools (7 tools)
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of length, weight, and temperature',
    category: 'converter-tools',
    path: '/tools/unit-converter',
    keywords: ['unit conversion', 'length converter', 'weight converter', 'temperature converter', 'metric converter', 'imperial converter', 'convert units'],
    featured: true,
    metaTitle: 'Unit Converter - Convert Length, Weight, Temperature Units',
    metaDescription: 'Convert between metric and imperial units instantly. Free unit converter for length, weight, and temperature. Supports meters, kilometers, pounds, kilograms, Celsius, Fahrenheit, and more.'
  },
  {
    id: 'rgb-to-hex',
    name: 'RGB to HEX Converter',
    description: 'Convert RGB color values to HEX color codes for web design',
    category: 'converter-tools',
    path: '/tools/rgb-to-hex',
    keywords: ['rgb to hex', 'color converter', 'hex color'],
    featured: false
  },
  {
    id: 'hex-to-rgb',
    name: 'HEX to RGB Converter',
    description: 'Convert HEX color codes to RGB values for design and development',
    category: 'converter-tools',
    path: '/tools/hex-to-rgb',
    keywords: ['hex to rgb', 'color converter', 'rgb color'],
    featured: false
  },
  {
    id: 'binary-decimal-converter',
    name: 'Binary Decimal Converter',
    description: 'Convert between binary and decimal number systems easily',
    category: 'converter-tools',
    path: '/tools/binary-decimal-converter',
    keywords: ['binary converter', 'decimal converter', 'number conversion'],
    featured: false
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert Unix timestamps to readable dates and vice versa',
    category: 'converter-tools',
    path: '/tools/timestamp-converter',
    keywords: ['timestamp converter', 'unix time', 'epoch converter'],
    featured: false
  },
  {
    id: 'roman-numeral-converter',
    name: 'Roman Numeral Converter',
    description: 'Convert between Roman numerals and Arabic numbers',
    category: 'converter-tools',
    path: '/tools/roman-numeral-converter',
    keywords: ['roman numerals', 'number converter', 'roman to arabic'],
    featured: false
  },
  
  // Developer Tools (11 tools)
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    category: 'developer-tools',
    path: '/tools/json-formatter',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'format json', 'validate json', 'json parser', 'json minifier'],
    featured: true,
    metaTitle: 'JSON Formatter & Validator - Format, Validate & Beautify JSON',
    metaDescription: 'Format, validate, and beautify JSON data online. Free JSON formatter with syntax highlighting, error detection, and minification. Perfect for developers and API testing.'
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings quickly and easily',
    category: 'developer-tools',
    path: '/tools/base64-encoder',
    keywords: ['base64 encode', 'base64 decode', 'base64 converter', 'encode base64', 'decode base64', 'base64 encoder online'],
    featured: true,
    metaTitle: 'Base64 Encoder/Decoder - Encode & Decode Base64 Strings Online',
    metaDescription: 'Encode and decode Base64 strings instantly. Free online Base64 encoder/decoder for text, images, and data. Fast, secure, and easy to use.'
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for safe transmission over the internet',
    category: 'developer-tools',
    path: '/tools/url-encoder',
    keywords: ['url encoder', 'url decoder', 'percent encoding'],
    featured: false
  },
  {
    id: 'html-encoder',
    name: 'HTML Encoder/Decoder',
    description: 'Encode and decode HTML entities for safe display in browsers',
    category: 'developer-tools',
    path: '/tools/html-encoder',
    keywords: ['html encoder', 'html entities', 'escape html'],
    featured: false
  },
  {
    id: 'md5-hash-generator',
    name: 'Hash Generator (SHA-256)',
    description: 'Generate secure SHA-256 hashes for text and data verification',
    category: 'developer-tools',
    path: '/tools/md5-hash-generator',
    keywords: ['hash generator', 'sha256', 'checksum', 'data integrity'],
    featured: false
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (UUIDs) for databases and applications',
    category: 'developer-tools',
    path: '/tools/uuid-generator',
    keywords: ['uuid generator', 'guid generator', 'unique id', 'uuid v4', 'generate uuid', 'random uuid'],
    featured: true,
    metaTitle: 'UUID Generator - Generate Random UUIDs (Version 4) Online',
    metaDescription: 'Generate random UUIDs (Universally Unique Identifiers) instantly. Free UUID generator for databases, APIs, and applications. Supports bulk generation.'
  },
  {
    id: 'color-picker',
    name: 'Color Picker Tool',
    description: 'Pick colors and get HEX, RGB, and HSL values for web design',
    category: 'developer-tools',
    path: '/tools/color-picker',
    keywords: ['color picker', 'color selector', 'hex color picker', 'rgb color picker', 'color tool', 'web colors'],
    featured: true,
    metaTitle: 'Color Picker - Get HEX, RGB & HSL Color Codes for Web Design',
    metaDescription: 'Pick colors and get HEX, RGB, and HSL values instantly. Free online color picker tool for web designers and developers. Perfect for CSS and design projects.'
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    description: 'Minify CSS code to reduce file size and improve page load speed',
    category: 'developer-tools',
    path: '/tools/css-minifier',
    keywords: ['css minifier', 'minify css', 'compress css'],
    featured: false
  },
  {
    id: 'javascript-minifier',
    name: 'JavaScript Minifier',
    description: 'Minify JavaScript code to reduce file size and optimize performance',
    category: 'developer-tools',
    path: '/tools/javascript-minifier',
    keywords: ['javascript minifier', 'minify js', 'compress javascript'],
    featured: false
  },
  
  // SEO Tools (5 tools)
  {
    id: 'meta-tag-checker',
    name: 'Meta Tag Length Checker',
    description: 'Check and optimize your meta title and description lengths for SEO',
    category: 'seo-tools',
    path: '/tools/meta-tag-checker',
    keywords: ['meta tags', 'seo checker', 'title length', 'description length', 'meta tag checker', 'seo meta tags', 'meta tag analyzer'],
    featured: true,
    metaTitle: 'Meta Tag Checker - Check SEO Title & Description Length',
    metaDescription: 'Check and optimize your meta title and description lengths for SEO. Free meta tag checker shows character count and optimal length recommendations for search engines.'
  },
  {
    id: 'slug-generator',
    name: 'URL Slug Generator',
    description: 'Generate SEO-friendly URL slugs from titles and text',
    category: 'seo-tools',
    path: '/tools/slug-generator',
    keywords: ['slug generator', 'url slug', 'seo url', 'permalink', 'url generator', 'seo friendly url', 'generate slug'],
    featured: true,
    metaTitle: 'URL Slug Generator - Create SEO-Friendly URL Slugs',
    metaDescription: 'Generate SEO-friendly URL slugs from titles and text instantly. Free slug generator converts text to clean, optimized URLs for better search rankings.'
  },
  {
    id: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    description: 'Analyze keyword density in your content for better SEO optimization',
    category: 'seo-tools',
    path: '/tools/keyword-density-checker',
    keywords: ['keyword density', 'seo analysis', 'content optimization'],
    featured: false
  },
  {
    id: 'open-graph-generator',
    name: 'Open Graph Tag Generator',
    description: 'Generate Open Graph meta tags for better social media sharing',
    category: 'seo-tools',
    path: '/tools/open-graph-generator',
    keywords: ['open graph', 'og tags', 'social media tags', 'facebook tags'],
    featured: false
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
