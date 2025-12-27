import { useState } from 'react';

type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

interface BMIResult {
  bmi: number;
  category: BMICategory;
  description: string;
  color: string;
}

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setError('Please enter valid positive numbers');
      setResult(null);
      return;
    }

    setError('');
    let bmi: number;
    
    if (unit === 'metric') {
      // kg and cm
      bmi = w / ((h / 100) ** 2);
    } else {
      // lbs and inches
      bmi = (w / (h ** 2)) * 703;
    }

    let category: BMICategory;
    let description: string;
    let color: string;

    if (bmi < 18.5) {
      category = 'underweight';
      description = 'Underweight';
      color = 'blue';
    } else if (bmi < 25) {
      category = 'normal';
      description = 'Normal Weight';
      color = 'green';
    } else if (bmi < 30) {
      category = 'overweight';
      description = 'Overweight';
      color = 'orange';
    } else {
      category = 'obese';
      description = 'Obese';
      color = 'red';
    }

    setResult({ bmi, category, description, color });
  };

  const getResultColorClasses = (color: string) => {
    const classes = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      orange: 'bg-orange-50 border-orange-200',
      red: 'bg-red-50 border-red-200',
    };
    return classes[color as keyof typeof classes] || 'bg-gray-50 border-gray-200';
  };

  const getTextColorClass = (color: string) => {
    const classes = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
    };
    return classes[color as keyof typeof classes] || 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setUnit('metric')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            unit === 'metric'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Metric (kg, cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            unit === 'imperial'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Imperial (lbs, in)
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height {unit === 'metric' ? '(cm)' : '(inches)'}
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Calculate BMI
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className={`${getResultColorClasses(result.color)} border rounded-lg p-6`}>
            <div className="text-center mb-4">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {result.bmi.toFixed(1)}
              </div>
              <div className={`text-xl font-semibold ${getTextColorClass(result.color)}`}>
                {result.description}
              </div>
            </div>

            <div className="bg-white rounded p-4 text-sm text-gray-600">
              <p className="font-medium mb-2">BMI Categories:</p>
              <ul className="space-y-1">
                <li>• Underweight: BMI less than 18.5</li>
                <li>• Normal weight: BMI 18.5 to 24.9</li>
                <li>• Overweight: BMI 25 to 29.9</li>
                <li>• Obese: BMI 30 or greater</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
