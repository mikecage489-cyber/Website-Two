import { useState } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState('');

  const totalChars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const letters = text.replace(/[^a-zA-Z]/g, '').length;
  const numbers = text.replace(/[^0-9]/g, '').length;
  const specialChars = text.replace(/[a-zA-Z0-9\s]/g, '').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{totalChars}</div>
          <div className="text-sm text-gray-600 mt-1">Total</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{charsNoSpaces}</div>
          <div className="text-sm text-gray-600 mt-1">No Spaces</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">{letters}</div>
          <div className="text-sm text-gray-600 mt-1">Letters</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-orange-600">{numbers}</div>
          <div className="text-sm text-gray-600 mt-1">Numbers</div>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-pink-600">{specialChars}</div>
          <div className="text-sm text-gray-600 mt-1">Special</div>
        </div>
      </div>

      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your text
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}
