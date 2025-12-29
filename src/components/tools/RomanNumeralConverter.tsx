import { useState } from 'react';

export default function RomanNumeralConverter() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [mode, setMode] = useState<'toRoman' | 'fromRoman'>('toRoman');
  const [message, setMessage] = useState('');

  const romanNumerals: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];

  const toRoman = (num: number): string => {
    if (num < 1 || num > 3999) return '';
    let result = '';
    for (const [value, numeral] of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const fromRoman = (roman: string): number => {
    const values: Record<string, number> = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50,
      'C': 100, 'D': 500, 'M': 1000
    };
    
    let result = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = values[roman[i]];
      const next = values[roman[i + 1]];
      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result;
  };

  const convert = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      setOutputValue('');
      return;
    }

    if (mode === 'toRoman') {
      const num = parseInt(inputValue);
      if (isNaN(num) || num < 1 || num > 3999) {
        setMessage('Please enter a number between 1 and 3999');
        setOutputValue('');
        return;
      }
      setOutputValue(toRoman(num));
      setMessage('Converted successfully');
    } else {
      const upper = inputValue.toUpperCase();
      if (!/^[IVXLCDM]+$/.test(upper)) {
        setMessage('Please enter a valid Roman numeral');
        setOutputValue('');
        return;
      }
      const result = fromRoman(upper);
      setOutputValue(result.toString());
      setMessage('Converted successfully');
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
            checked={mode === 'toRoman'}
            onChange={() => { setMode('toRoman'); setOutputValue(''); setMessage(''); }}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Number → Roman</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === 'fromRoman'}
            onChange={() => { setMode('fromRoman'); setOutputValue(''); setMessage(''); }}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Roman → Number</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'toRoman' ? 'Number (1-3999)' : 'Roman Numeral'}
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={mode === 'toRoman' ? 'Enter number (e.g., 1994)' : 'Enter Roman numeral (e.g., MCMXCIV)'}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg"
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
          message.includes('Please') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {outputValue && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'toRoman' ? 'Roman Numeral' : 'Number'}
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Copy
            </button>
          </div>
          <div className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-3xl text-center text-blue-600 font-bold">
            {outputValue}
          </div>
        </div>
      )}
    </div>
  );
}
