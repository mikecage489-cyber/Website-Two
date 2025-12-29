import { useState } from 'react';

export default function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState<Array<{word: string; count: number; density: number}>>([]);
  const [totalWords, setTotalWords] = useState(0);

  const analyze = () => {
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }

    // Extract words and clean them
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2); // Ignore words with 2 or fewer characters

    const total = words.length;
    setTotalWords(total);

    // Count word frequency
    const frequencyMap = new Map<string, number>();
    words.forEach(word => {
      frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });

    // Calculate density and sort
    const keywordData = Array.from(frequencyMap.entries())
      .map(([word, count]) => ({
        word,
        count,
        density: (count / total) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 keywords

    setKeywords(keywordData);
  };

  const clear = () => {
    setText('');
    setKeywords([]);
    setTotalWords(0);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Content
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste your content to analyze keyword density..."
          className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {text && (
          <div className="mt-2 text-sm text-gray-600">
            {text.split(/\s+/).filter(w => w).length} words
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={analyze}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Analyze
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {keywords.length > 0 && (
        <div>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              Total Words: {totalWords} (excluding words with 2 or fewer characters)
            </span>
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Keyword</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Count</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Density</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {keywords.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{item.word}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.count}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      <span className={`font-semibold ${
                        item.density > 3 ? 'text-red-600' : 
                        item.density > 2 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {item.density.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">SEO Guidelines:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Ideal keyword density: 1-2%</li>
              <li>• Over 3% may be considered keyword stuffing</li>
              <li>• Focus on natural, readable content</li>
              <li>• Use variations and related keywords</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
