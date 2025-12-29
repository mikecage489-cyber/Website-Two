import { useState } from 'react';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toDate');
  const [result, setResult] = useState('');

  const convertToDate = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) {
      alert('Please enter a valid timestamp');
      return;
    }

    // Handle both seconds and milliseconds
    const date = new Date(ts > 9999999999 ? ts : ts * 1000);
    setResult(date.toLocaleString());
  };

  const convertToTimestamp = () => {
    if (!dateTime) {
      alert('Please select a date and time');
      return;
    }

    const date = new Date(dateTime);
    const ts = Math.floor(date.getTime() / 1000);
    setResult(ts.toString());
  };

  const useNow = () => {
    const now = new Date();
    if (mode === 'toDate') {
      setTimestamp(Math.floor(now.getTime() / 1000).toString());
    } else {
      setDateTime(now.toISOString().slice(0, 16));
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    alert('Copied to clipboard!');
  };

  const clear = () => {
    setTimestamp('');
    setDateTime('');
    setResult('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-gray-700">Mode:</label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === 'toDate'}
            onChange={() => { setMode('toDate'); setResult(''); }}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Timestamp → Date</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === 'toTimestamp'}
            onChange={() => { setMode('toTimestamp'); setResult(''); }}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Date → Timestamp</span>
        </label>
      </div>

      {mode === 'toDate' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unix Timestamp (seconds)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="1640000000"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
            <button
              onClick={useNow}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Now
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date and Time
          </label>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={useNow}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Now
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={mode === 'toDate' ? convertToDate : convertToTimestamp}
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

      {result && (
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Result
            </label>
            <button
              onClick={copyResult}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Copy
            </button>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200 font-mono text-lg text-gray-900">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
