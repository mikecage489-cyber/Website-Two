import { useState } from 'react';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [result, setResult] = useState<{
    discountAmount: number;
    finalPrice: number;
    savings: number;
  } | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid original price');
      return;
    }

    if (isNaN(discount) || discount < 0 || discount > 100) {
      alert('Please enter a valid discount percentage (0-100)');
      return;
    }

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
    const savings = discountAmount;

    setResult({ discountAmount, finalPrice, savings });
  };

  const clear = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Original Price ($)
        </label>
        <input
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="0.00"
          step="0.01"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Discount Percentage (%)
        </label>
        <div className="flex gap-2 mb-2">
          {['10', '20', '25', '30', '50'].map((percent) => (
            <button
              key={percent}
              onClick={() => setDiscountPercent(percent)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                discountPercent === percent
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
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          placeholder="0"
          step="1"
          min="0"
          max="100"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculateDiscount}
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
        <div className="bg-green-50 p-6 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Original Price:</span>
            <span className="text-xl font-semibold text-gray-900">
              ${parseFloat(originalPrice).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Discount ({discountPercent}%):</span>
            <span className="text-xl font-semibold text-red-600">
              -${result.discountAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-green-200">
            <span className="text-gray-700 font-medium">Final Price:</span>
            <span className="text-3xl font-bold text-green-600">
              ${result.finalPrice.toFixed(2)}
            </span>
          </div>
          <div className="text-center pt-2 text-sm text-gray-600">
            You save ${result.savings.toFixed(2)}!
          </div>
        </div>
      )}
    </div>
  );
}
