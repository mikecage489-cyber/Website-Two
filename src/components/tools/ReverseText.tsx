import { useState } from 'react';

export default function ReverseText() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [reverseType, setReverseType] = useState<'chars' | 'words' | 'lines'>('chars');
  const [message, setMessage] = useState('');

  const reverseText = () => {
    if (!inputText.trim()) {
      setMessage('Please enter some text');
      setOutputText('');
      return;
    }

    let result = '';
    if (reverseType === 'chars') {
      result = inputText.split('').reverse().join('');
      setMessage('Text reversed by characters');
    } else if (reverseType === 'words') {
      result = inputText.split(' ').reverse().join(' ');
      setMessage('Text reversed by words');
    } else if (reverseType === 'lines') {
      result = inputText.split('\n').reverse().join('\n');
      setMessage('Text reversed by lines');
    }

    setOutputText(result);
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
          placeholder="Enter or paste text to reverse..."
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-gray-700">Reverse Type:</label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="chars"
            checked={reverseType === 'chars'}
            onChange={(e) => setReverseType(e.target.value as any)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Characters</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="words"
            checked={reverseType === 'words'}
            onChange={(e) => setReverseType(e.target.value as any)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Words</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="lines"
            checked={reverseType === 'lines'}
            onChange={(e) => setReverseType(e.target.value as any)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Lines</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={reverseText}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reverse Text
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
