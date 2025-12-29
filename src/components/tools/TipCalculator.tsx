import { useState } from 'react';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [result, setResult] = useState<{
    tipAmount: number;
    totalAmount: number;
    perPerson: number;
  } | null>(null);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople);

    if (isNaN(bill) || bill <= 0) {
      alert('Please enter a valid bill amount');
      return;
    }

    if (isNaN(tip) || tip < 0) {
      alert('Please enter a valid tip percentage');
      return;
    }

    if (isNaN(people) || people < 1) {
      alert('Please enter a valid number of people');
      return;
    }

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;

    setResult({ tipAmount, totalAmount, perPerson });
  };

  const clear = () => {
    setBillAmount('');
    setTipPercentage('15');
    setNumberOfPeople('1');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bill Amount ($)
        </label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="0.00"
          step="0.01"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tip Percentage (%)
        </label>
        <div className="flex gap-2 mb-2">
          {['10', '15', '18', '20', '25'].map((percent) => (
            <button
              key={percent}
              onClick={() => setTipPercentage(percent)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                tipPercentage === percent
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>
        <input
          type="number"
          value={tipPercentage}
          onChange={(e) => setTipPercentage(e.target.value)}
          placeholder="15"
          step="1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of People
        </label>
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          placeholder="1"
          min="1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculateTip}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="bg-blue-50 p-6 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Tip Amount:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${result.tipAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total Amount:</span>
            <span className="text-2xl font-bold text-green-600">
              ${result.totalAmount.toFixed(2)}
            </span>
          </div>
          {parseInt(numberOfPeople) > 1 && (
            <div className="flex justify-between items-center pt-3 border-t border-blue-200">
              <span className="text-gray-700 font-medium">Per Person:</span>
              <span className="text-2xl font-bold text-gray-900">
                ${result.perPerson.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
