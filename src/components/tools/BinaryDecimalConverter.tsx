import { useState } from 'react';

export default function BinaryDecimalConverter() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [mode, setMode] = useState<'binToDec' | 'decToBin'>('binToDec');
  const [message, setMessage] = useState('');

  const convert = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      setOutputValue('');
      return;
    }

    try {
      if (mode === 'binToDec') {
        // Binary to Decimal
        if (!/^[01]+$/.test(inputValue)) {
          setMessage('Please enter a valid binary number (only 0s and 1s)');
          setOutputValue('');
          return;
        }
        const decimal = parseInt(inputValue, 2);
        setOutputValue(decimal.toString());
        setMessage('Converted successfully');
      } else {
        // Decimal to Binary
        const num = parseInt(inputValue);
        if (isNaN(num) || num < 0) {
          setMessage('Please enter a valid non-negative decimal number');
          setOutputValue('');
          return;
        }
        const binary = num.toString(2);
        setOutputValue(binary);
        setMessage('Converted successfully');
      }
    } catch (error) {
      setMessage('Error during conversion');
      setOutputValue('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputValue);
    setMessage('Copied to clipboard!');
    setTimeout(() => setMessage('Converted successfully'), 2000);
  };

  const clear = () => {
    setInputValue('');
    setOutputValue('');
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-gray-700">Mode:</label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === 'binToDec'}
            onChange={() => { setMode('binToDec'); setOutputValue(''); setMessage(''); }}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Binary → Decimal</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === 'decToBin'}
            onChange={() => { setMode('decToBin'); setOutputValue(''); setMessage(''); }}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Decimal → Binary</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'binToDec' ? 'Binary Number' : 'Decimal Number'}
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={mode === 'binToDec' ? 'Enter binary (e.g., 1010)' : 'Enter decimal (e.g., 42)'}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={convert}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Convert
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
          message.includes('Error') || message.includes('Please') 
            ? 'bg-red-50 text-red-700' 
            : 'bg-green-50 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {outputValue && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'binToDec' ? 'Decimal Number' : 'Binary Number'}
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Copy
            </button>
          </div>
          <div className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-2xl text-center text-blue-600 font-bold">
            {outputValue}
          </div>
        </div>
      )}
    </div>
  );
}
