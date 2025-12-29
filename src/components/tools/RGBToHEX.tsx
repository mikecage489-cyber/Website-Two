import { useState } from 'react';

export default function RGBToHEX() {
  const [r, setR] = useState('255');
  const [g, setG] = useState('0');
  const [b, setB] = useState('0');
  const [hex, setHex] = useState('#FF0000');

  const rgbToHex = () => {
    const red = parseInt(r);
    const green = parseInt(g);
    const blue = parseInt(b);

    if (isNaN(red) || red < 0 || red > 255) {
      alert('Red value must be between 0 and 255');
      return;
    }
    if (isNaN(green) || green < 0 || green > 255) {
      alert('Green value must be between 0 and 255');
      return;
    }
    if (isNaN(blue) || blue < 0 || blue > 255) {
      alert('Blue value must be between 0 and 255');
      return;
    }

    const hexColor = '#' + 
      red.toString(16).padStart(2, '0').toUpperCase() +
      green.toString(16).padStart(2, '0').toUpperCase() +
      blue.toString(16).padStart(2, '0').toUpperCase();

    setHex(hexColor);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Red (0-255)
          </label>
          <input
            type="number"
            value={r}
            onChange={(e) => setR(e.target.value)}
            min="0"
            max="255"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Green (0-255)
          </label>
          <input
            type="number"
            value={g}
            onChange={(e) => setG(e.target.value)}
            min="0"
            max="255"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blue (0-255)
          </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            min="0"
            max="255"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={rgbToHex}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Convert to HEX
      </button>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-medium">HEX Value:</span>
          <button
            onClick={copyToClipboard}
            className="text-sm px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Copy
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="w-24 h-24 rounded-lg border-2 border-gray-300"
            style={{ backgroundColor: hex }}
          />
          <div>
            <div className="text-3xl font-bold text-gray-900">{hex}</div>
            <div className="text-sm text-gray-600 mt-1">
              RGB({r}, {g}, {b})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
