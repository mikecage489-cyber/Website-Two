import { useState } from 'react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
      setIsValid(true);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
      setIsValid(false);
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setIsValid(true);
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
      setIsValid(false);
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(input);
      setError('');
      setIsValid(true);
      setOutput('✅ Valid JSON!');
    } catch (e) {
      setError((e as Error).message);
      setIsValid(false);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setIsValid(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 mb-2">
          JSON Input
        </label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "John", "age": 30}'
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={formatJSON}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Format
        </button>
        <button
          onClick={minifyJSON}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Minify
        </button>
        <button
          onClick={validateJSON}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Validate
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <span>❌</span>
            <span className="font-medium">Invalid JSON</span>
          </div>
          <p className="text-red-700 text-sm mt-2">{error}</p>
        </div>
      )}

      {isValid && output && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Output
            </label>
            {output !== '✅ Valid JSON!' && (
              <button
                onClick={copyToClipboard}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Copy
              </button>
            )}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            {output === '✅ Valid JSON!' ? (
              <div className="text-center text-green-700 font-medium text-lg">
                {output}
              </div>
            ) : (
              <pre className="font-mono text-sm overflow-x-auto">{output}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
