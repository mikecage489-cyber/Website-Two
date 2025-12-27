import { useState } from 'react';

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake';

export default function CaseConverter() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  const convertCase = (type: CaseType) => {
    let result = '';
    
    switch (type) {
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'title':
        result = text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (char) => char.toUpperCase());
        break;
      case 'camel':
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
          .replace(/^[A-Z]/, (char) => char.toLowerCase());
        break;
      case 'snake':
        result = text
          .replace(/\s+/g, '_')
          .replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`)
          .replace(/^_/, '')
          .toLowerCase();
        break;
    }
    
    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
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
          placeholder="Enter text to convert..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button
          onClick={() => convertCase('upper')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          UPPERCASE
        </button>
        <button
          onClick={() => convertCase('lower')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          lowercase
        </button>
        <button
          onClick={() => convertCase('title')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Title Case
        </button>
        <button
          onClick={() => convertCase('sentence')}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Sentence case
        </button>
        <button
          onClick={() => convertCase('camel')}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          camelCase
        </button>
        <button
          onClick={() => convertCase('snake')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          snake_case
        </button>
      </div>

      {output && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Output</label>
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Copy
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none"
          />
        </div>
      )}
    </div>
  );
}
