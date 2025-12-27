import { useState } from 'react';

type ConversionType = 'length' | 'weight' | 'temperature';

interface ConversionUnit {
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const lengthUnits: Record<string, ConversionUnit> = {
  meter: { name: 'Meter', toBase: (v) => v, fromBase: (v) => v },
  kilometer: { name: 'Kilometer', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  centimeter: { name: 'Centimeter', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  millimeter: { name: 'Millimeter', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  mile: { name: 'Mile', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
  yard: { name: 'Yard', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  foot: { name: 'Foot', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  inch: { name: 'Inch', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
};

const weightUnits: Record<string, ConversionUnit> = {
  kilogram: { name: 'Kilogram', toBase: (v) => v, fromBase: (v) => v },
  gram: { name: 'Gram', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  milligram: { name: 'Milligram', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
  pound: { name: 'Pound', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
  ounce: { name: 'Ounce', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  ton: { name: 'Ton', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
};

const temperatureUnits: Record<string, ConversionUnit> = {
  celsius: {
    name: 'Celsius',
    toBase: (v) => v,
    fromBase: (v) => v
  },
  fahrenheit: {
    name: 'Fahrenheit',
    toBase: (v) => (v - 32) * 5/9,
    fromBase: (v) => v * 9/5 + 32
  },
  kelvin: {
    name: 'Kelvin',
    toBase: (v) => v - 273.15,
    fromBase: (v) => v + 273.15
  },
};

export default function UnitConverter() {
  const [type, setType] = useState<ConversionType>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const getUnits = () => {
    switch (type) {
      case 'length': return lengthUnits;
      case 'weight': return weightUnits;
      case 'temperature': return temperatureUnits;
    }
  };

  const convert = (value: string, from: string, to: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setToValue('');
      return;
    }

    const units = getUnits();
    const baseValue = units[from].toBase(num);
    const result = units[to].fromBase(baseValue);
    setToValue(result.toFixed(6).replace(/\.?0+$/, ''));
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    convert(value, fromUnit, toUnit);
  };

  const handleTypeChange = (newType: ConversionType) => {
    setType(newType);
    const units = Object.keys(newType === 'length' ? lengthUnits : newType === 'weight' ? weightUnits : temperatureUnits);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setFromValue('');
    setToValue('');
  };

  const units = getUnits();

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => handleTypeChange('length')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            type === 'length' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Length
        </button>
        <button
          onClick={() => handleTypeChange('weight')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            type === 'weight' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Weight
        </button>
        <button
          onClick={() => handleTypeChange('temperature')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            type === 'temperature' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Temperature
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={fromValue}
              onChange={(e) => handleFromValueChange(e.target.value)}
              placeholder="Enter value"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={fromUnit}
              onChange={(e) => {
                setFromUnit(e.target.value);
                convert(fromValue, e.target.value, toUnit);
              }}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(units).map(([key, unit]) => (
                <option key={key} value={key}>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center">
          <span className="text-2xl text-gray-400">⇅</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={toValue}
              readOnly
              placeholder="Result"
              className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-50"
            />
            <select
              value={toUnit}
              onChange={(e) => {
                setToUnit(e.target.value);
                convert(fromValue, fromUnit, e.target.value);
              }}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(units).map(([key, unit]) => (
                <option key={key} value={key}>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
