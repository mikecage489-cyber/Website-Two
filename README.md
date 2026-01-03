# ToolStack Online - Free Online Tools Website

A modern, high-performance website offering free online tools built with React 19.2.3, Vite, TypeScript, and Tailwind CSS v4.0. All tools run entirely in the browser with no backend required.

## 🚀 Features

- **38+ Free Online Tools** across 5 categories
- **100% Client-Side** - All processing happens in your browser
- **SEO Optimized** - Dynamic meta tags, structured data, and sitemap
- **Client-Side Search** - Instant search across all tools
- **Category Filtering** - Filter tools by category
- **Mobile-First Design** - Responsive and works on all devices
- **Fast Performance** - Built with Vite for lightning-fast loading
- **Google AdSense Ready** - Strategic ad placements without affecting UX
- **Privacy-Focused** - Your data never leaves your device

## 🛠️ Tech Stack

- **Frontend**: React 19.2.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS v4.0
- **Language**: TypeScript
- **Routing**: React Router v7
- **Deployment**: Vercel/Netlify ready

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/mikecage489-cyber/Website-Two.git
cd Website-Two
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. (Optional) Add your Google AdSense client ID in `.env`:
```
VITE_ADSENSE_CLIENT_ID=ca-pub-your-client-id
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 🏗️ Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🧪 Linting

Run ESLint:
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ads/              # Google AdSense components
│   ├── common/           # Reusable UI components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── seo/              # SEO components
│   └── tools/            # Individual tool components
├── config/
│   └── tools.ts          # Tool configuration and metadata
├── pages/
│   ├── about/            # About and Contact pages
│   ├── home/             # Home page
│   ├── legal/            # Privacy Policy & Terms
│   └── tools/            # Tools listing and detail pages
├── types/
│   └── index.ts          # TypeScript type definitions
└── utils/
    └── sitemap.ts        # Sitemap generation utility
```

## 🔧 Available Tools

### Text Tools (10 tools)
- Word Counter - Count words, characters, sentences, and reading time
- Character Counter - Count characters with detailed breakdown
- Case Converter - Convert text to various cases
- Text Cleaner - Remove extra spaces and line breaks
- Remove Duplicate Lines - Remove duplicate lines from text
- Sort Lines Alphabetically - Sort text lines A-Z or Z-A
- Reverse Text - Reverse text by characters, words, or lines
- Lorem Ipsum Generator - Generate placeholder text
- Palindrome Checker - Check if text is a palindrome
- Word Frequency Counter - Analyze word frequency in text

### Calculator Tools (9 tools)
- Percentage Calculator - Calculate percentages and changes
- Age Calculator - Calculate exact age from birth date
- BMI Calculator - Calculate Body Mass Index
- Tip Calculator - Calculate tips and split bills
- Discount Calculator - Calculate discounts and savings
- Compound Interest Calculator - Calculate investment returns
- Grade Calculator - Calculate weighted grades
- GPA Calculator - Calculate Grade Point Average
- Date Calculator - Calculate days between dates

### Converter Tools (6 tools)
- Unit Converter - Convert length, weight, and temperature
- RGB to HEX Converter - Convert RGB colors to HEX
- HEX to RGB Converter - Convert HEX colors to RGB
- Binary Decimal Converter - Convert between binary and decimal
- Timestamp Converter - Convert Unix timestamps to dates
- Roman Numeral Converter - Convert Roman numerals to numbers

### Developer Tools (9 tools)
- JSON Formatter & Validator - Format and validate JSON
- Base64 Encoder/Decoder - Encode and decode Base64
- URL Encoder/Decoder - Encode and decode URLs
- HTML Encoder/Decoder - Encode and decode HTML entities
- Hash Generator (SHA-256) - Generate secure hashes
- UUID Generator - Generate unique identifiers
- Color Picker Tool - Pick colors and get color codes
- CSS Minifier - Minify CSS code
- JavaScript Minifier - Minify JavaScript code

### SEO Tools (4 tools)
- Meta Tag Length Checker - Check meta tag lengths
- URL Slug Generator - Generate SEO-friendly slugs
- Keyword Density Checker - Analyze keyword density
- Open Graph Tag Generator - Generate Open Graph tags

**Total: 38 Tools**

## ➕ Adding New Tools

1. **Create the tool component** in `src/components/tools/`:
```tsx
// src/components/tools/YourTool.tsx
export default function YourTool() {
  // Your tool logic here
  return <div>Your Tool UI</div>;
}
```

2. **Add tool configuration** in `src/config/tools.ts`:
```typescript
{
  id: 'your-tool',
  name: 'Your Tool Name',
  description: 'Tool description',
  category: 'text-tools', // or appropriate category
  path: '/tools/your-tool',
  keywords: ['keyword1', 'keyword2'],
  featured: false
}
```

3. **Register component** in `src/pages/tools/ToolPage.tsx`:
```typescript
import YourTool from '../../components/tools/YourTool';

const toolComponents: Record<string, React.ComponentType> = {
  // ... existing tools
  'your-tool': YourTool,
};
```

4. **Add content** in `src/pages/tools/ToolPage.tsx`:
```typescript
const toolContent: Record<string, {...}> = {
  'your-tool': {
    instructions: 'How to use instructions',
    example: 'Example usage',
    faqs: [
      { q: 'Question?', a: 'Answer' }
    ]
  }
};
```

## 🌐 Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable `VITE_ADSENSE_CLIENT_ID`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Create new site from Git in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable `VITE_ADSENSE_CLIENT_ID`
6. Deploy

## 🔍 SEO Features

- Dynamic meta tags per page
- Open Graph tags for social sharing
- Schema.org structured data (WebApplication + FAQ)
- SEO-friendly URLs
- Robots.txt
- Sitemap generation utility
- Semantic HTML structure

## 💰 Google AdSense

To enable Google AdSense:

1. Sign up for Google AdSense
2. Get your client ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
3. Add it to your `.env` file as `VITE_ADSENSE_CLIENT_ID`
4. Update `index.html` with your actual client ID
5. Ads will appear automatically after AdSense approval

Ad placements are optimized to not affect Core Web Vitals (CLS).

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, use the contact form on the website.

---

Built with ❤️ using React, Vite, and Tailwind CSS
