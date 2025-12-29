import { useState } from 'react';

export default function HEXToRGB() {
  const [hex, setHex] = useState('#FF0000');
  const [rgb, setRgb] = useState({ r: 255, g: 0, b: 0 });

  const hexToRgb = () => {
    let hexValue = hex.trim();
    
    // Remove # if present
    if (hexValue.startsWith('#')) {
      hexValue = hexValue.substring(1);
    }

    // Validate hex format
    if (!/^[0-9A-Fa-f]{6}$/.test(hexValue) && !/^[0-9A-Fa-f]{3}$/.test(hexValue)) {
      alert('Please enter a valid hex color (e.g., #FF0000 or #F00)');
      return;
    }

    // Convert 3-digit hex to 6-digit
    if (hexValue.length === 3) {
      hexValue = hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2];
    }

    const r = parseInt(hexValue.substring(0, 2), 16);
    const g = parseInt(hexValue.substring(2, 4), 16);
    const b = parseInt(hexValue.substring(4, 6), 16);

    setRgb({ r, g, b });
    setHex('#' + hexValue.toUpperCase());
  };

  const copyToClipboard = () => {
    const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    navigator.clipboard.writeText(rgbString);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HEX Color
        </label>
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          placeholder="#FF0000 or #F00"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={hexToRgb}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Convert to RGB
      </button>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-medium">RGB Value:</span>
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
            style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
          />
          <div>
            <div className="text-3xl font-bold text-gray-900">
              RGB({rgb.r}, {rgb.g}, {rgb.b})
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {hex}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
