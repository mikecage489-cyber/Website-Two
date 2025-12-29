import { useState } from 'react';

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleColorChange = (hex: string) => {
    setSelectedColor(hex);
    const rgbValues = hexToRgb(hex);
    setRgb(rgbValues);
    setHsl(rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b));
  };

  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Select a Color
        </label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-32 h-32 rounded-lg cursor-pointer border-4 border-gray-300"
        />
      </div>

      <div className="grid gap-4">
        {/* HEX */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">HEX</span>
            <button
              onClick={() => copyValue(selectedColor)}
              className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
          <div className="font-mono text-lg text-gray-900">{selectedColor}</div>
        </div>

        {/* RGB */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">RGB</span>
            <button
              onClick={() => copyValue(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
              className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
          <div className="font-mono text-lg text-gray-900">
            rgb({rgb.r}, {rgb.g}, {rgb.b})
          </div>
        </div>

        {/* HSL */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">HSL</span>
            <button
              onClick={() => copyValue(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
              className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
          <div className="font-mono text-lg text-gray-900">
            hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
          </div>
        </div>
      </div>

      {/* Color Preview */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <span className="text-sm font-medium text-gray-700 block mb-3">Color Preview</span>
        <div
          className="w-full h-32 rounded-lg border-2 border-gray-300"
          style={{ backgroundColor: selectedColor }}
        />
      </div>
    </div>
  );
}
