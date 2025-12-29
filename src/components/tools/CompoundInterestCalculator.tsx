import { useState } from 'react';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('12'); // Monthly by default
  const [result, setResult] = useState<{
    finalAmount: number;
    interest: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseInt(frequency);

    if (isNaN(p) || p <= 0) {
      alert('Please enter a valid principal amount');
      return;
    }
    if (isNaN(r) || r < 0) {
      alert('Please enter a valid interest rate');
      return;
    }
    if (isNaN(t) || t <= 0) {
      alert('Please enter a valid time period');
      return;
    }

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const finalAmount = p * Math.pow(1 + r / n, n * t);
    const interest = finalAmount - p;

    setResult({ finalAmount, interest });
  };

  const clear = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setFrequency('12');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Principal Amount ($)
        </label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="10000"
          step="100"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Annual Interest Rate (%)
        </label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="5"
          step="0.1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Time Period (years)
        </label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="10"
          step="1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Compound Frequency
        </label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="1">Annually</option>
          <option value="2">Semi-Annually</option>
          <option value="4">Quarterly</option>
          <option value="12">Monthly</option>
          <option value="365">Daily</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="bg-blue-50 p-6 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Principal:</span>
            <span className="text-xl font-semibold text-gray-900">
              ${parseFloat(principal).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Interest Earned:</span>
            <span className="text-xl font-semibold text-green-600">
              ${result.interest.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-blue-200">
            <span className="text-gray-700 font-medium">Final Amount:</span>
            <span className="text-3xl font-bold text-blue-600">
              ${result.finalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
