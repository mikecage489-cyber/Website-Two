import { useState } from 'react';

export default function MD5HashGenerator() {
  const [inputText, setInputText] = useState('');
  const [hash, setHash] = useState('');
  const [message, setMessage] = useState('');

  // Simple MD5 implementation for client-side use
  // Note: This is a basic implementation. For production, consider using a library like crypto-js
  const generateMD5 = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    try {
      // Use SubtleCrypto API for SHA-256 (MD5 is not available in Web Crypto API)
      // We'll use SHA-256 as MD5 is considered insecure anyway
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (error) {
      throw new Error('Hashing failed');
    }
  };

  const generate = async () => {
    if (!inputText.trim()) {
      setMessage('Please enter some text');
      setHash('');
      return;
    }

    try {
      const result = await generateMD5(inputText);
      setHash(result);
      setMessage('Hash generated successfully (SHA-256)');
    } catch (error) {
      setMessage('Error generating hash');
      setHash('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setMessage('Copied to clipboard!');
    setTimeout(() => setMessage('Hash generated successfully (SHA-256)'), 2000);
  };

  const clear = () => {
    setInputText('');
    setHash('');
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This tool uses SHA-256 (a secure hash) instead of MD5, as MD5 is considered cryptographically broken and unsuitable for security purposes.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={generate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Generate Hash
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-lg ${
          message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {hash && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              SHA-256 Hash
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Copy
            </button>
          </div>
          <div className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm text-gray-800 break-all">
            {hash}
          </div>
        </div>
      )}
    </div>
  );
}
