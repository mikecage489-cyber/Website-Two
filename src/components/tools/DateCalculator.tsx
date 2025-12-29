import { useState } from 'react';

export default function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
  } | null>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      alert('Please select both dates');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert('Start date must be before end date');
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44); // Average month length
    const years = Math.floor(days / 365.25); // Account for leap years

    setResult({ days, weeks, months, years });
  };

  const clear = () => {
    setStartDate('');
    setEndDate('');
    setResult(null);
  };

  const setToday = (field: 'start' | 'end') => {
    const today = new Date().toISOString().split('T')[0];
    if (field === 'start') {
      setStartDate(today);
    } else {
      setEndDate(today);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start Date
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => setToday('start')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Today
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          End Date
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => setToday('end')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Today
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculateDifference}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Time Difference</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">{result.days}</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">{result.weeks}</div>
              <div className="text-sm text-gray-600">Weeks</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">{result.months}</div>
              <div className="text-sm text-gray-600">Months</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600">{result.years}</div>
              <div className="text-sm text-gray-600">Years</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
