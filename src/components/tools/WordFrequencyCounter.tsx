import { useState } from 'react';

export default function WordFrequencyCounter() {
  const [inputText, setInputText] = useState('');
  const [frequencies, setFrequencies] = useState<Array<{word: string; count: number}>>([]);
  const [ignoreCase, setIgnoreCase] = useState(true);
  const [message, setMessage] = useState('');

  const countFrequencies = () => {
    if (!inputText.trim()) {
      setMessage('Please enter some text');
      setFrequencies([]);
      return;
    }

    const words = inputText
      .toLowerCase()
      .replace(/[^\w\s'-]/g, '') // Keep apostrophes and hyphens for words like "don't" and "co-worker"
      .split(/\s+/)
      .filter(word => word.length > 2 && word !== '--' && word !== "''"); // Filter out short words and standalone punctuation

    const frequencyMap = new Map<string, number>();

    words.forEach(word => {
      const key = ignoreCase ? word.toLowerCase() : word;
      frequencyMap.set(key, (frequencyMap.get(key) || 0) + 1);
    });

    const sortedFrequencies = Array.from(frequencyMap.entries())
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);

    setFrequencies(sortedFrequencies);
    setMessage(`Found ${sortedFrequencies.length} unique words`);
  };

  const clear = () => {
    setInputText('');
    setFrequencies([]);
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter or paste text to analyze word frequency..."
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Ignore Case</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={countFrequencies}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Count Frequencies
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {message && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {frequencies.length > 0 && (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Word</th>
                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {frequencies.slice(0, 50).map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{item.word}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-right">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {frequencies.length > 50 && (
            <div className="px-4 py-2 bg-gray-50 text-sm text-gray-600 text-center">
              Showing top 50 of {frequencies.length} words
            </div>
          )}
        </div>
      )}
    </div>
  );
}
