import { useState } from 'react';

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [outputText, setOutputText] = useState('');
  const [message, setMessage] = useState('');

  const loremText = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus.",
    "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
    "Omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  ];

  const generateLorem = () => {
    const count = Math.max(1, Math.min(10, paragraphs));
    const result: string[] = [];
    
    for (let i = 0; i < count; i++) {
      result.push(loremText[i % loremText.length]);
    }
    
    setOutputText(result.join('\n\n'));
    setMessage(`Generated ${count} paragraph${count !== 1 ? 's' : ''}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setMessage('Copied to clipboard!');
    setTimeout(() => setMessage(''), 2000);
  };

  const clear = () => {
    setOutputText('');
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Paragraphs (1-10)
        </label>
        <input
          type="number"
          value={paragraphs}
          onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
          min="1"
          max="10"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={generateLorem}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate Lorem Ipsum
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

      {outputText && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Generated Text
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Copy
            </button>
          </div>
          <textarea
            value={outputText}
            readOnly
            className="w-full h-64 p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
      )}
    </div>
  );
}
