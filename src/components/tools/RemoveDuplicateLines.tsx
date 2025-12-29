import { useState } from 'react';

export default function RemoveDuplicateLines() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [message, setMessage] = useState('');

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      setMessage('Please enter some text');
      setOutputText('');
      return;
    }

    const lines = inputText.split('\n');
    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    lines.forEach(line => {
      const checkLine = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(checkLine)) {
        seen.add(checkLine);
        uniqueLines.push(line);
      }
    });

    setOutputText(uniqueLines.join('\n'));
    const removed = lines.length - uniqueLines.length;
    setMessage(`Removed ${removed} duplicate line${removed !== 1 ? 's' : ''}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setMessage('Copied to clipboard!');
    setTimeout(() => setMessage(''), 2000);
  };

  const clear = () => {
    setInputText('');
    setOutputText('');
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter or paste text with duplicate lines..."
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Case Sensitive</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={removeDuplicates}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Remove Duplicates
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {message && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {outputText && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Output Text
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Copy
            </button>
          </div>
          <textarea
            value={outputText}
            readOnly
            className="w-full h-40 p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
      )}
    </div>
  );
}
