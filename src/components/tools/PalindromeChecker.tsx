import { useState } from 'react';

export default function PalindromeChecker() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [ignoreSpaces, setIgnoreSpaces] = useState(true);
  const [ignorePunctuation, setIgnorePunctuation] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(true);

  const checkPalindrome = () => {
    if (!inputText.trim()) {
      setResult('Please enter some text');
      return;
    }

    let processedText = inputText;
    
    if (ignoreCase) {
      processedText = processedText.toLowerCase();
    }
    
    if (ignoreSpaces) {
      processedText = processedText.replace(/\s/g, '');
    }
    
    if (ignorePunctuation) {
      processedText = processedText.replace(/[^\w]/g, '');
    }

    const reversed = processedText.split('').reverse().join('');
    const isPalindrome = processedText === reversed;

    setResult(isPalindrome 
      ? '✅ This is a palindrome!' 
      : '❌ This is not a palindrome'
    );
  };

  const clear = () => {
    setInputText('');
    setResult('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Input Text
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to check (e.g., 'A man a plan a canal Panama')"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Ignore Case</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ignoreSpaces}
            onChange={(e) => setIgnoreSpaces(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Ignore Spaces</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={ignorePunctuation}
            onChange={(e) => setIgnorePunctuation(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Ignore Punctuation</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={checkPalindrome}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Check Palindrome
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className={`p-4 rounded-lg text-center text-lg font-semibold ${
          result.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {result}
        </div>
      )}
    </div>
  );
}
