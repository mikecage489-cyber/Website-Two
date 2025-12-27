import { useState } from 'react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
  } | null>(null);
  const [error, setError] = useState('');

  const calculateAge = () => {
    if (!birthDate) {
      setError('Please select a birth date');
      setResult(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) {
      setError('Birth date cannot be in the future');
      setResult(null);
      return;
    }

    setError('');

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    setResult({ years, months, days, totalDays, totalWeeks });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="birth-date" className="block text-sm font-medium text-gray-700 mb-2">
          Birth Date
        </label>
        <input
          id="birth-date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={calculateAge}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Calculate Age
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {result.years}
            </div>
            <div className="text-gray-600">Years Old</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{result.months}</div>
              <div className="text-sm text-gray-600 mt-1">Months</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{result.days}</div>
              <div className="text-sm text-gray-600 mt-1">Days</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{result.totalWeeks.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Total Weeks</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{result.totalDays.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Total Days</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
