import { useState } from 'react';

export default function CSSMinifier() {
  const [inputCSS, setInputCSS] = useState('');
  const [outputCSS, setOutputCSS] = useState('');
  const [message, setMessage] = useState('');

  const minify = () => {
    if (!inputCSS.trim()) {
      setMessage('Please enter some CSS');
      setOutputCSS('');
      return;
    }

    try {
      let minified = inputCSS
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove whitespace
        .replace(/\s+/g, ' ')
        // Remove space after colons
        .replace(/:\s+/g, ':')
        // Remove space before and after braces
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        // Remove space before and after semicolons
        .replace(/\s*;\s*/g, ';')
        // Remove space before and after commas
        .replace(/\s*,\s*/g, ',')
        // Remove last semicolon in a block
        .replace(/;}/g, '}')
        .trim();

      setOutputCSS(minified);
      const originalSize = new Blob([inputCSS]).size;
      const minifiedSize = new Blob([minified]).size;
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      setMessage(`Minified successfully! Reduced by ${savings}%`);
    } catch (error) {
      setMessage('Error minifying CSS');
      setOutputCSS('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCSS);
    setMessage('Copied to clipboard!');
    setTimeout(() => {
      const originalSize = new Blob([inputCSS]).size;
      const minifiedSize = new Blob([outputCSS]).size;
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      setMessage(`Minified successfully! Reduced by ${savings}%`);
    }, 2000);
  };

  const clear = () => {
    setInputCSS('');
    setOutputCSS('');
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input CSS
        </label>
        <textarea
          value={inputCSS}
          onChange={(e) => setInputCSS(e.target.value)}
          placeholder="Paste your CSS code here..."
          className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={minify}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Minify CSS
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {message && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {outputCSS && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Minified CSS
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Copy
            </button>
          </div>
          <textarea
            value={outputCSS}
            readOnly
            className="w-full h-48 p-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
