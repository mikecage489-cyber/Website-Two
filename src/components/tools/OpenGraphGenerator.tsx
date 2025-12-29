import { useState } from 'react';

export default function OpenGraphGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('website');
  const [siteName, setSiteName] = useState('');

  const generateTags = () => {
    const tags: string[] = [];

    if (title) tags.push(`<meta property="og:title" content="${title}" />`);
    if (description) tags.push(`<meta property="og:description" content="${description}" />`);
    if (image) tags.push(`<meta property="og:image" content="${image}" />`);
    if (url) tags.push(`<meta property="og:url" content="${url}" />`);
    if (type) tags.push(`<meta property="og:type" content="${type}" />`);
    if (siteName) tags.push(`<meta property="og:site_name" content="${siteName}" />`);

    return tags.join('\n');
  };

  const generatedCode = generateTags();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Copied to clipboard!');
  };

  const clear = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setUrl('');
    setType('website');
    setSiteName('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your page title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of your page"
          className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/page"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="website">Website</option>
          <option value="article">Article</option>
          <option value="product">Product</option>
          <option value="video">Video</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Name
        </label>
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Your site name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={clear}
        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Clear
      </button>

      {generatedCode && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Generated Open Graph Tags
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Copy
            </button>
          </div>
          <textarea
            value={generatedCode}
            readOnly
            className="w-full h-48 p-3 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
