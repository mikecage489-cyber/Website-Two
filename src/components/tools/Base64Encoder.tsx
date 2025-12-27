import { useState } from 'react';

export default function Base64Encoder() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      setError('');
    } catch {
      setError('Failed to encode. Make sure your input is valid.');
      setOutput('');
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      setError('');
    } catch {
      setError('Failed to decode. Make sure your input is valid Base64.');
      setOutput('');
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError('Please enter some text');
      setOutput('');
      return;
    }

    if (mode === 'encode') {
      encode();
    } else {
      decode();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => {
            setMode('encode');
            setOutput('');
            setError('');
          }}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            mode === 'encode'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => {
            setMode('decode');
            setOutput('');
            setError('');
          }}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            mode === 'decode'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Decode
        </button>
      </div>

      <div>
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleConvert}
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <button
          onClick={clearAll}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <span>❌</span>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {output && !error && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Output
            </label>
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
            className="w-full h-32 p-4 border border-gray-300 rounded-lg bg-gray-50 resize-none font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
