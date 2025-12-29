import { useState } from 'react';

export default function GPACalculator() {
  const [courses, setCourses] = useState<Array<{grade: string; credits: string}>>([
    {grade: '', credits: ''},
    {grade: '', credits: ''},
  ]);
  const [scale, setScale] = useState<'4.0' | '5.0'>('4.0');
  const [result, setResult] = useState<number | null>(null);

  const gradePoints4: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  const gradePoints5: Record<string, number> = {
    'A+': 5.0, 'A': 5.0, 'A-': 4.7,
    'B+': 4.3, 'B': 4.0, 'B-': 3.7,
    'C+': 3.3, 'C': 3.0, 'C-': 2.7,
    'D+': 2.3, 'D': 2.0, 'D-': 1.7,
    'F': 0.0
  };

  const addCourse = () => {
    setCourses([...courses, {grade: '', credits: ''}]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: 'grade' | 'credits', value: string) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const calculate = () => {
    const validCourses = courses.filter(c => c.grade && c.credits);
    
    if (validCourses.length === 0) {
      alert('Please enter at least one course with grade and credits');
      return;
    }

    const points = scale === '4.0' ? gradePoints4 : gradePoints5;
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of validCourses) {
      const gradePoint = points[course.grade.toUpperCase()];
      const credits = parseFloat(course.credits);

      if (gradePoint === undefined) {
        alert(`Invalid grade: ${course.grade}`);
        return;
      }
      if (isNaN(credits) || credits <= 0) {
        alert('Please enter valid credits (> 0)');
        return;
      }

      totalPoints += gradePoint * credits;
      totalCredits += credits;
    }

    const gpa = totalPoints / totalCredits;
    setResult(gpa);
  };

  const clear = () => {
    setCourses([{grade: '', credits: ''}, {grade: '', credits: ''}]);
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          GPA Scale
        </label>
        <select
          value={scale}
          onChange={(e) => setScale(e.target.value as '4.0' | '5.0')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="4.0">4.0 Scale</option>
          <option value="5.0">5.0 Scale (Weighted)</option>
        </select>
      </div>

      <div className="space-y-3">
        {courses.map((course, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={course.grade}
              onChange={(e) => updateCourse(index, 'grade', e.target.value)}
              placeholder="Grade (A, B+, C...)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              value={course.credits}
              onChange={(e) => updateCourse(index, 'credits', e.target.value)}
              placeholder="Credits"
              className="w-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {courses.length > 1 && (
              <button
                onClick={() => removeCourse(index)}
                className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addCourse}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        + Add Course
      </button>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Calculate GPA
        </button>
        <button
          onClick={clear}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {result !== null && (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <div className="text-gray-700 mb-2">Your GPA ({scale} scale):</div>
          <div className="text-5xl font-bold text-blue-600">
            {result.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
