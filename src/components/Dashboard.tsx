import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Trophy, Brain } from 'lucide-react';
import { LearningPathSelector } from './LearningPathSelector';
import { ApiTest } from './ApiTest';
import { useAuthStore } from '../store/authStore';
import { useLearningPathStore } from '../store/learningPathStore';
import type { LearningPath, SkillProgress } from '../types';

// Temporary mock data until API integration
const mockSkills: SkillProgress[] = [
  { name: 'React', level: 75, coursesContributing: ['React Fundamentals'] },
  { name: 'JavaScript', level: 65, coursesContributing: ['React Fundamentals', 'Node.js Basics'] },
  { name: 'Node.js', level: 50, coursesContributing: ['Node.js Basics'] },
];

export function Dashboard() {
  const { credentials } = useAuthStore();
  const { learningPaths, setLearningPaths, selectedPathId } = useLearningPathStore();

  useEffect(() => {
    // Simulate API call - Replace with actual Udemy Business API call
    const fetchLearningPaths = async () => {
      try {
        // Mock data - Replace with actual API response
        const mockPaths: LearningPath[] = [
          {
            id: '1',
            title: 'Web Development Path',
            courses: [
              { id: '1', title: 'React Fundamentals', progress: 75, skills: ['React', 'JavaScript'] },
              { id: '2', title: 'Node.js Basics', progress: 50, skills: ['Node.js', 'JavaScript'] },
            ],
            completionPercentage: 62.5,
          },
          {
            id: '2',
            title: 'Data Science Fundamentals',
            courses: [
              { id: '3', title: 'Python for Data Science', progress: 30, skills: ['Python', 'Data Analysis'] },
              { id: '4', title: 'Statistics Basics', progress: 20, skills: ['Statistics', 'Math'] },
            ],
            completionPercentage: 25,
          },
        ];
        setLearningPaths(mockPaths);
      } catch (error) {
        console.error('Failed to fetch learning paths:', error);
      }
    };

    if (credentials) {
      fetchLearningPaths();
    }
  }, [credentials, setLearningPaths]);

  const selectedPath = learningPaths.find(path => path.id === selectedPathId);
  const activeCourses = selectedPath ? selectedPath.courses.length : 
    learningPaths.reduce((total, path) => total + path.courses.length, 0);
  const overallProgress = selectedPath ? selectedPath.completionPercentage :
    learningPaths.reduce((sum, path) => sum + path.completionPercentage, 0) / (learningPaths.length || 1);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your progress and skill development</p>
        </header>

        <div className="mb-8">
          <ApiTest />
        </div>

        <LearningPathSelector />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Courses</h3>
                <p className="text-2xl font-bold text-indigo-600">{activeCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-emerald-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
                <p className="text-2xl font-bold text-emerald-600">{overallProgress.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Skills Developing</h3>
                <p className="text-2xl font-bold text-purple-600">{mockSkills.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Course Progress</h2>
            <div className="space-y-4">
              {(selectedPath ? [selectedPath] : learningPaths).map((path) => (
                <div key={path.id} className="space-y-4">
                  <h3 className="font-semibold text-gray-900">{path.title}</h3>
                  {path.courses.map((course) => (
                    <div key={course.id} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-700">{course.title}</span>
                        <span className="text-sm font-medium text-indigo-600">
                          {course.progress}% Complete
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills Development</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSkills}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="level" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}