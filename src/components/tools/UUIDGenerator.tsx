import { useState } from 'react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState('1');
  const [version, setVersion] = useState<'v4'>('v4');

  const generateUUID = (): string => {
    // Generate UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generate = () => {
    const num = Math.max(1, Math.min(100, parseInt(count) || 1));
    const newUuids = Array.from({ length: num }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    alert('Copied all UUIDs to clipboard!');
  };

  const copySingle = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    alert('Copied UUID to clipboard!');
  };

  const clear = () => {
    setUuids([]);
    setCount('1');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of UUIDs (1-100)
        </label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          min="1"
          max="100"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          UUID Version
        </label>
        <select
          value={version}
          onChange={(e) => setVersion(e.target.value as 'v4')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="v4">Version 4 (Random)</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={generate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate UUIDs
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Generated {uuids.length} UUID{uuids.length > 1 ? 's' : ''}
            </span>
            <button
              onClick={copyAll}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Copy All
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded border border-gray-200"
              >
                <code className="text-sm text-gray-800 font-mono">{uuid}</code>
                <button
                  onClick={() => copySingle(uuid)}
                  className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
