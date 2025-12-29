import { useState } from 'react';

export default function JavaScriptMinifier() {
  const [inputJS, setInputJS] = useState('');
  const [outputJS, setOutputJS] = useState('');
  const [message, setMessage] = useState('');

  const minify = () => {
    if (!inputJS.trim()) {
      setMessage('Please enter some JavaScript');
      setOutputJS('');
      return;
    }

    try {
      let minified = inputJS
        // Remove single-line comments
        .replace(/\/\/.*$/gm, '')
        // Remove multi-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove excess whitespace
        .replace(/\s+/g, ' ')
        .trim();

      setOutputJS(minified);
      const originalSize = new Blob([inputJS]).size;
      const minifiedSize = new Blob([minified]).size;
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      setMessage(`Minified successfully! Reduced by ${savings}%`);
    } catch (error) {
      setMessage('Error minifying JavaScript');
      setOutputJS('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputJS);
    setMessage('Copied to clipboard!');
    setTimeout(() => {
      const originalSize = new Blob([inputJS]).size;
      const minifiedSize = new Blob([outputJS]).size;
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      setMessage(`Minified successfully! Reduced by ${savings}%`);
    }, 2000);
  };

  const clear = () => {
    setInputJS('');
    setOutputJS('');
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input JavaScript
        </label>
        <textarea
          value={inputJS}
          onChange={(e) => setInputJS(e.target.value)}
          placeholder="Paste your JavaScript code here..."
          className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={minify}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Minify JavaScript
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

      {outputJS && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Minified JavaScript
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Copy
            </button>
          </div>
          <textarea
            value={outputJS}
            readOnly
            className="w-full h-48 p-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
