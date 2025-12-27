import { useState } from 'react';

export default function PercentageCalculator() {
  const [type, setType] = useState<'basic' | 'increase' | 'decrease'>('basic');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers');
      setResult(null);
      return;
    }

    setError('');
    let calculatedResult = 0;
    
    switch (type) {
      case 'basic':
        calculatedResult = (num1 / 100) * num2;
        break;
      case 'increase':
        calculatedResult = num1 + (num1 * num2 / 100);
        break;
      case 'decrease':
        calculatedResult = num1 - (num1 * num2 / 100);
        break;
    }
    
    setResult(calculatedResult);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setType('basic')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            type === 'basic'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          What is X% of Y?
        </button>
        <button
          onClick={() => setType('increase')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            type === 'increase'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Increase by %
        </button>
        <button
          onClick={() => setType('decrease')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            type === 'decrease'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Decrease by %
        </button>
      </div>

      <div className="space-y-4">
        {type === 'basic' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage (%)
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder="Enter percentage"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Of Value
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="Enter value"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {(type === 'increase' || type === 'decrease') && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Value
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder="Enter original value"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage (%)
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="Enter percentage"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        <button
          onClick={calculate}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Calculate
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {result !== null && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-sm text-gray-600 mb-1">Result</div>
            <div className="text-4xl font-bold text-green-600">
              {result.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
