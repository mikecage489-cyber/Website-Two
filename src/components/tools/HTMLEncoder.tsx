import { useState } from 'react';

export default function HTMLEncoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [message, setMessage] = useState('');

  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  const decodeEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x27;': "'",
  };

  const encode = (text: string): string => {
    return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
  };

  const decode = (text: string): string => {
    return text.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x27;/g, (entity) => decodeEntities[entity] || entity);
  };

  const process = () => {
    if (!inputText.trim()) {
      setMessage('Please enter some text');
      setOutputText('');
      return;
    }

    if (mode === 'encode') {
      setOutputText(encode(inputText));
      setMessage('Text encoded successfully');
    } else {
      setOutputText(decode(inputText));
      setMessage('Text decoded successfully');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setMessage('Copied to clipboard!');
    setTimeout(() => {
      setMessage(mode === 'encode' ? 'Text encoded successfully' : 'Text decoded successfully');
    }, 2000);
  };

  const clear = () => {
    setInputText('');
    setOutputText('');
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-gray-700">Mode:</label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === 'encode'}
            onChange={() => setMode('encode')}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Encode</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === 'decode'}
            onChange={() => setMode('decode')}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Decode</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter HTML to encode...' : 'Enter encoded HTML to decode...'}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={process}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
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

      {outputText && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Output Text
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Copy
            </button>
          </div>
          <textarea
            value={outputText}
            readOnly
            className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
