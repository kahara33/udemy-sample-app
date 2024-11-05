import React from 'react';
import { BookOpen } from 'lucide-react';
import { useLearningPathStore } from '../store/learningPathStore';

export function LearningPathSelector() {
  const { learningPaths, selectedPathId, setSelectedPathId } = useLearningPathStore();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <BookOpen className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-900">Learning Paths</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {learningPaths.map((path) => (
          <button
            key={path.id}
            onClick={() => setSelectedPathId(path.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedPathId === path.id
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <h3 className="font-semibold text-gray-900 mb-2">{path.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {path.courses.length} {path.courses.length === 1 ? 'course' : 'courses'}
              </span>
              <span className="text-sm font-medium text-indigo-600">
                {path.completionPercentage}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${path.completionPercentage}%` }}
              ></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}