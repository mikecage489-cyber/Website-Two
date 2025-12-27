import { useState, useCallback } from 'react';

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });

  const calculateStats = useCallback((input: string) => {
    const trimmedText = input.trim();
    
    // Words
    const words = trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
    
    // Characters
    const characters = input.length;
    const charactersNoSpaces = input.replace(/\s/g, '').length;
    
    // Sentences (split by . ! ?)
    const sentences = trimmedText === '' ? 0 : 
      (trimmedText.match(/[.!?]+/g) || []).length || (trimmedText ? 1 : 0);
    
    // Paragraphs
    const paragraphs = trimmedText === '' ? 0 : 
      trimmedText.split(/\n\s*\n/).filter(p => p.trim()).length;
    
    // Reading time (assuming 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    
    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime
    });
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    calculateStats(newText);
  };

  const handleClear = () => {
    setText('');
    setStats({
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Display */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.words}</div>
          <div className="text-sm text-gray-600 mt-1">Words</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{stats.characters}</div>
          <div className="text-sm text-gray-600 mt-1">Characters</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">{stats.charactersNoSpaces}</div>
          <div className="text-sm text-gray-600 mt-1">No Spaces</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-orange-600">{stats.sentences}</div>
          <div className="text-sm text-gray-600 mt-1">Sentences</div>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-pink-600">{stats.paragraphs}</div>
          <div className="text-sm text-gray-600 mt-1">Paragraphs</div>
        </div>
        <div className="bg-indigo-50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-indigo-600">{stats.readingTime}</div>
          <div className="text-sm text-gray-600 mt-1">Min Read</div>
        </div>
      </div>

      {/* Text Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">
            Enter your text
          </label>
          {text && (
            <button
              onClick={handleClear}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear
            </button>
          )}
        </div>
        <textarea
          id="text-input"
          value={text}
          onChange={handleTextChange}
          placeholder="Start typing or paste your text here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          aria-label="Text input for word counting"
        />
      </div>
    </div>
  );
}
