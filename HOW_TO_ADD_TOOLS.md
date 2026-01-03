# How to Add New Tools

This guide explains how to add new tools to the ToolStack Online website. The process is straightforward and follows a consistent pattern.

## Prerequisites

- Basic knowledge of React and TypeScript
- Understanding of the tool's functionality
- Content for SEO (instructions, examples, FAQs)

## Step-by-Step Guide

### 1. Create the Tool Component

Create a new file in `src/components/tools/` with the tool name in PascalCase.

```tsx
// src/components/tools/YourNewTool.tsx
import { useState } from 'react';

export default function YourNewTool() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const processInput = () => {
    // Your tool logic here
    const result = someProcessing(inputValue);
    setOutputValue(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputValue);
    alert('Copied to clipboard!');
  };

  const clear = () => {
    setInputValue('');
    setOutputValue('');
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your input..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={processInput}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Process
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Output Section */}
      {outputValue && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Output
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Copy
            </button>
          </div>
          <textarea
            value={outputValue}
            readOnly
            className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
      )}
    </div>
  );
}
```

### 2. Add Tool Configuration

Edit `src/config/tools.ts` and add your tool to the `tools` array:

```typescript
{
  id: 'your-new-tool',
  name: 'Your New Tool',
  description: 'Brief description of what your tool does (150-160 characters)',
  category: 'text-tools', // or 'calculator-tools', 'converter-tools', 'developer-tools', 'seo-tools'
  path: '/tools/your-new-tool',
  keywords: ['keyword1', 'keyword2', 'keyword3', 'related terms'],
  featured: false // Set to true if you want it on the homepage
}
```

**Important**: Choose the correct category:
- `text-tools` - Text manipulation and analysis
- `calculator-tools` - Mathematical calculations
- `converter-tools` - Converting between formats/units
- `developer-tools` - Development and coding tools
- `seo-tools` - SEO and web optimization tools

### 3. Register the Component

Edit `src/pages/tools/ToolPage.tsx`:

**a) Add the import** at the top with other imports:

```typescript
import YourNewTool from '../../components/tools/YourNewTool';
```

**b) Register in the toolComponents object:**

```typescript
const toolComponents: Record<string, React.ComponentType> = {
  // ... existing tools
  'your-new-tool': YourNewTool,
};
```

### 4. Add Tool Content

In the same file (`src/pages/tools/ToolPage.tsx`), add content to the `toolContent` object:

```typescript
const toolContent: Record<string, { instructions: string; example: string; faqs: Array<{q: string; a: string}> }> = {
  // ... existing content
  'your-new-tool': {
    instructions: 'Detailed step-by-step instructions on how to use the tool. Explain what each input does and what the output represents. Include tips for best results.',
    example: 'Provide a concrete example of when and how to use this tool. Example: "Use this tool to convert timestamps like 1640000000 to readable dates."',
    faqs: [
      { 
        q: 'What does this tool do?', 
        a: 'Clear explanation of the tool\'s main purpose and functionality.' 
      },
      { 
        q: 'When should I use this tool?', 
        a: 'Describe the use cases and scenarios where this tool is most helpful.' 
      },
      { 
        q: 'Are there any limitations?', 
        a: 'Explain any limitations, constraints, or important considerations.' 
      },
    ]
  },
};
```

**Content Guidelines:**
- Instructions: 50-100 words explaining how to use the tool
- Example: 30-50 words with a concrete use case
- FAQs: 3-5 questions with helpful answers (each answer 30-80 words)

### 5. Update Sitemap

Edit `public/sitemap.xml` and add your new tool:

```xml
<!-- In the appropriate category section -->
<url>
  <loc>https://yourwebsite.com/tools/your-new-tool</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

Use priority `0.9` for featured tools, `0.8` for regular tools.

### 6. Test Your Tool

```bash
# Build the project
npm run build

# Run locally to test
npm run dev
```

Visit `http://localhost:5173/tools/your-new-tool` to test.

## Best Practices

### UI/UX
- ✅ Use consistent styling (follow existing tools)
- ✅ Include clear labels for all inputs
- ✅ Add placeholder text for guidance
- ✅ Show loading states for async operations
- ✅ Display error messages when needed
- ✅ Include a "Copy" button for outputs
- ✅ Add a "Clear" or "Reset" button

### Functionality
- ✅ Process everything client-side (no API calls)
- ✅ Validate inputs before processing
- ✅ Handle edge cases gracefully
- ✅ Provide helpful error messages
- ✅ Make it fast and responsive
- ✅ Support keyboard shortcuts where appropriate

### Accessibility
- ✅ Use semantic HTML elements
- ✅ Add ARIA labels where needed
- ✅ Ensure keyboard navigation works
- ✅ Maintain good color contrast
- ✅ Test with screen readers if possible

### SEO
- ✅ Write unique, descriptive content
- ✅ Use relevant keywords naturally
- ✅ Create helpful FAQs
- ✅ Include realistic examples
- ✅ Aim for 600-800 words total content

## Common Patterns

### Input/Output Tool
Most tools follow this pattern:
1. User enters input
2. User clicks process/calculate button
3. Tool displays output
4. User can copy or clear

### Converter Tool
Converters often need:
- Mode selection (A→B or B→A)
- Two inputs/outputs
- Bidirectional conversion

### Calculator Tool
Calculators typically:
- Have multiple numeric inputs
- Show formatted results
- Include preset buttons for common values

### Validator Tool
Validators should:
- Show success/error states clearly
- Explain why validation failed
- Provide helpful suggestions

## Example Tools to Reference

### Simple Tool
Look at `PalindromeChecker.tsx` for a simple validation tool.

### Complex Tool
Look at `CompoundInterestCalculator.tsx` for a multi-input calculator.

### Converter Tool
Look at `RGBToHEX.tsx` for a converter with previews.

### Text Processing
Look at `WordFrequencyCounter.tsx` for text analysis with tables.

## Troubleshooting

### TypeScript Errors
- Ensure your component is exported as default
- Check that imports use correct paths
- Verify type annotations are correct

### Build Errors
- Run `npm run build` to catch errors
- Fix TypeScript errors before committing
- Use `npm run lint` to check code style

### Tool Not Showing
- Verify the tool ID matches in all three places (config, component registration, content)
- Check that the path format is correct (`/tools/tool-id`)
- Ensure the component is imported correctly

### Styling Issues
- Use Tailwind CSS classes (already configured)
- Follow the existing component patterns
- Test on mobile devices (responsive design)

## Need Help?

- Reference existing tools in `src/components/tools/`
- Check the type definitions in `src/types/index.ts`
- Review the tool configuration in `src/config/tools.ts`
- Look at how other tools handle similar functionality

## Publishing Changes

After adding your tool:

```bash
# Build and test
npm run build
npm run dev

# Commit your changes
git add .
git commit -m "Add [Your Tool Name]"
git push

# Deploy to production
# Follow your deployment process (Vercel/Netlify)
```

---

Happy tool building! 🛠️
