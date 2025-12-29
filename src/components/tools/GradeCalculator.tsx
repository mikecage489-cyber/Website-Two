import { useState } from 'react';

export default function GradeCalculator() {
  const [scores, setScores] = useState<Array<{score: string; weight: string}>>([
    {score: '', weight: ''},
    {score: '', weight: ''},
  ]);
  const [result, setResult] = useState<{
    average: number;
    letterGrade: string;
  } | null>(null);

  const addScore = () => {
    setScores([...scores, {score: '', weight: ''}]);
  };

  const removeScore = (index: number) => {
    if (scores.length > 1) {
      setScores(scores.filter((_, i) => i !== index));
    }
  };

  const updateScore = (index: number, field: 'score' | 'weight', value: string) => {
    const newScores = [...scores];
    newScores[index][field] = value;
    setScores(newScores);
  };

  const calculate = () => {
    const validScores = scores.filter(s => s.score && s.weight);
    
    if (validScores.length === 0) {
      alert('Please enter at least one score with weight');
      return;
    }

    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (const item of validScores) {
      const score = parseFloat(item.score);
      const weight = parseFloat(item.weight);

      if (isNaN(score) || isNaN(weight) || score < 0 || score > 100 || weight <= 0) {
        alert('Please enter valid scores (0-100) and weights (>0)');
        return;
      }

      totalWeightedScore += score * weight;
      totalWeight += weight;
    }

    const average = totalWeightedScore / totalWeight;
    const letterGrade = getLetterGrade(average);

    setResult({ average, letterGrade });
  };

  const getLetterGrade = (score: number): string => {
    if (score >= 97) return 'A+';
    if (score >= 93) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    if (score >= 80) return 'B-';
    if (score >= 77) return 'C+';
    if (score >= 73) return 'C';
    if (score >= 70) return 'C-';
    if (score >= 67) return 'D+';
    if (score >= 63) return 'D';
    if (score >= 60) return 'D-';
    return 'F';
  };

  const clear = () => {
    setScores([{score: '', weight: ''}, {score: '', weight: ''}]);
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {scores.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="number"
              value={item.score}
              onChange={(e) => updateScore(index, 'score', e.target.value)}
              placeholder="Score (0-100)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={item.weight}
              onChange={(e) => updateScore(index, 'weight', e.target.value)}
              placeholder="Weight"
              className="w-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {scores.length > 1 && (
              <button
                onClick={() => removeScore(index)}
                className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addScore}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        + Add Score
      </button>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Calculate Grade
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {result.letterGrade}
          </div>
          <div className="text-2xl text-gray-700">
            {result.average.toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
}
