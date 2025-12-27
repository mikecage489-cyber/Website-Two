import { useState } from 'react';

export default function TextCleaner() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  const cleanText = (type: 'spaces' | 'lines' | 'all' | 'trim') => {
    let result = text;
    
    switch (type) {
      case 'spaces':
        result = text.replace(/\s+/g, ' ');
        break;
      case 'lines':
        result = text.replace(/\n+/g, '\n');
        break;
      case 'all':
        result = text.replace(/\s+/g, ' ').replace(/\n+/g, '\n').trim();
        break;
      case 'trim':
        result = text.split('\n').map(line => line.trim()).join('\n');
        break;
    }
    
    setOutput(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <textarea
          id="input-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your messy text here..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => cleanText('spaces')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Remove Extra Spaces
        </button>
        <button
          onClick={() => cleanText('lines')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Remove Extra Lines
        </button>
        <button
          onClick={() => cleanText('trim')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Trim Each Line
        </button>
        <button
          onClick={() => cleanText('all')}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Clean All
        </button>
      </div>

      {output && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cleaned Output
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none"
          />
        </div>
      )}
    </div>
  );
}
