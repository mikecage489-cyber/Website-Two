import { useState } from 'react';

export default function SlugGenerator() {
  const [inputText, setInputText] = useState('');
  const [slug, setSlug] = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);

  const generateSlug = () => {
    if (!inputText.trim()) {
      setSlug('');
      return;
    }

    let result = inputText.trim();

    // Convert to lowercase if option is selected
    if (lowercase) {
      result = result.toLowerCase();
    }

    // Replace special characters and spaces with separator
    result = result
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/[\s_]+/g, separator) // Replace spaces and underscores with separator
      .replace(new RegExp(`\\${separator}+`, 'g'), separator) // Replace multiple separators with single
      .replace(new RegExp(`^\\${separator}|\\${separator}$`, 'g'), ''); // Remove leading/trailing separators

    setSlug(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
    alert('Copied to clipboard!');
  };

  const clear = () => {
    setInputText('');
    setSlug('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to convert to URL slug..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-gray-700">Separator:</label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={separator === '-'}
            onChange={() => setSeparator('-')}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Hyphen (-)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={separator === '_'}
            onChange={() => setSeparator('_')}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Underscore (_)</span>
        </label>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Convert to lowercase</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={generateSlug}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate Slug
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {slug && (
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Generated Slug
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Copy
            </button>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-lg text-green-700">
            {slug}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Example URL: https://yoursite.com/{slug}
          </div>
        </div>
      )}
    </div>
  );
}
