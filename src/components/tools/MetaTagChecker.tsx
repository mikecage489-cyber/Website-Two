import { useState } from 'react';

export default function MetaTagChecker() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const titleLength = title.length;
  const descriptionLength = description.length;

  const getTitleStatus = () => {
    if (titleLength === 0) return { color: 'text-gray-600', message: 'No title entered' };
    if (titleLength < 30) return { color: 'text-yellow-600', message: 'Too short (aim for 50-60 characters)' };
    if (titleLength >= 30 && titleLength <= 60) return { color: 'text-green-600', message: 'Optimal length!' };
    if (titleLength > 60 && titleLength <= 70) return { color: 'text-yellow-600', message: 'Slightly too long' };
    return { color: 'text-red-600', message: 'Too long (will be truncated)' };
  };

  const getDescriptionStatus = () => {
    if (descriptionLength === 0) return { color: 'text-gray-600', message: 'No description entered' };
    if (descriptionLength < 70) return { color: 'text-yellow-600', message: 'Too short (aim for 150-160 characters)' };
    if (descriptionLength >= 150 && descriptionLength <= 160) return { color: 'text-green-600', message: 'Optimal length!' };
    if (descriptionLength > 160 && descriptionLength <= 170) return { color: 'text-yellow-600', message: 'Slightly too long' };
    return { color: 'text-red-600', message: 'Too long (will be truncated)' };
  };

  const titleStatus = getTitleStatus();
  const descriptionStatus = getDescriptionStatus();

  const clear = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your page title..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="mt-2 flex justify-between items-center">
          <span className={`text-sm font-medium ${titleStatus.color}`}>
            {titleStatus.message}
          </span>
          <span className={`text-sm font-semibold ${titleLength > 60 ? 'text-red-600' : 'text-gray-700'}`}>
            {titleLength} / 60 characters
          </span>
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                titleLength >= 30 && titleLength <= 60
                  ? 'bg-green-500'
                  : titleLength > 60
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
              }`}
              style={{ width: `${Math.min((titleLength / 60) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your page description..."
          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="mt-2 flex justify-between items-center">
          <span className={`text-sm font-medium ${descriptionStatus.color}`}>
            {descriptionStatus.message}
          </span>
          <span className={`text-sm font-semibold ${descriptionLength > 160 ? 'text-red-600' : 'text-gray-700'}`}>
            {descriptionLength} / 160 characters
          </span>
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                descriptionLength >= 150 && descriptionLength <= 160
                  ? 'bg-green-500'
                  : descriptionLength > 160
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
              }`}
              style={{ width: `${Math.min((descriptionLength / 160) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={clear}
        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        Clear
      </button>

      {(title || description) && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Preview (Google Search Result)</h3>
          <div className="bg-white p-4 rounded border border-gray-200">
            <div className="text-blue-600 text-lg mb-1 truncate">
              {title || 'Your page title will appear here'}
            </div>
            <div className="text-green-700 text-xs mb-2">
              https://yourwebsite.com/page-url
            </div>
            <div className="text-gray-600 text-sm line-clamp-2">
              {description || 'Your meta description will appear here. It helps users understand what your page is about.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
