import React, { useState } from 'react';
import { Brain, Target, CheckCircle, ArrowRight, Lightbulb, Clock, Award } from 'lucide-react';
import { DecisionNode, DecisionOption } from '../types';

const InteractiveExercises: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState('decision-tree');
  const [currentNodeId, setCurrentNodeId] = useState('1');
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const decisionTree: DecisionNode[] = [
    {
      id: '1',
      question: 'You\'re considering launching a new product feature. What\'s your first step?',
      options: [
        {
          id: '1a',
          text: 'Conduct market research',
          nextNodeId: '2',
          reasoning: 'Understanding market demand is crucial before development'
        },
        {
          id: '1b',
          text: 'Start building immediately',
          nextNodeId: '3',
          reasoning: 'Speed to market can be important, but risky without validation'
        },
        {
          id: '1c',
          text: 'Analyze competitor offerings',
          nextNodeId: '4',
          reasoning: 'Competitive analysis provides valuable positioning insights'
        }
      ],
      explanation: 'This decision tests your approach to product development prioritization.'
    },
    {
      id: '2',
      question: 'Your market research shows mixed signals. 60% interest but concerns about pricing. Next move?',
      options: [
        {
          id: '2a',
          text: 'Adjust pricing strategy',
          nextNodeId: '5',
          reasoning: 'Price sensitivity is a key barrier to adoption'
        },
        {
          id: '2b',
          text: 'Focus on value proposition',
          nextNodeId: '6',
          reasoning: 'Better communication of value can justify pricing'
        },
        {
          id: '2c',
          text: 'Test with a smaller segment',
          nextNodeId: '7',
          reasoning: 'Targeted testing reduces risk and provides clearer data'
        }
      ],
      explanation: 'Mixed market signals require strategic decision-making about risk and validation.'
    },
    {
      id: '3',
      question: 'You\'ve built the feature but user adoption is low. What\'s the likely cause?',
      options: [
        {
          id: '3a',
          text: 'Poor product-market fit',
          outcome: 'Correct! Building without validation often leads to misaligned features.',
          reasoning: 'This demonstrates the importance of market research first'
        },
        {
          id: '3b',
          text: 'Insufficient marketing',
          outcome: 'Partially correct, but the root issue is likely deeper.',
          reasoning: 'Marketing can\'t fix fundamental product-market fit issues'
        }
      ],
      explanation: 'This scenario illustrates the consequences of skipping validation.'
    }
  ];

  const exercises = [
    {
      id: 'decision-tree',
      title: 'Strategic Decision Making',
      description: 'Navigate complex business scenarios using first principles thinking',
      type: 'Decision Tree',
      difficulty: 'Advanced',
      timeEstimate: 15,
      completed: false
    },
    {
      id: 'goal-setting',
      title: 'SMART Goal Framework',
      description: 'Practice setting specific, measurable, achievable goals',
      type: 'Interactive Form',
      difficulty: 'Intermediate',
      timeEstimate: 10,
      completed: true
    },
    {
      id: 'priority-matrix',
      title: 'Eisenhower Priority Matrix',
      description: 'Categorize tasks by urgency and importance',
      type: 'Drag & Drop',
      difficulty: 'Beginner',
      timeEstimate: 8,
      completed: false
    },
    {
      id: 'scenario-planning',
      title: 'Scenario Planning Exercise',
      description: 'Develop contingency plans for different future outcomes',
      type: 'Simulation',
      difficulty: 'Advanced',
      timeEstimate: 20,
      completed: false
    }
  ];

  const getCurrentNode = () => {
    return decisionTree.find(node => node.id === currentNodeId);
  };

  const handleOptionSelect = (option: DecisionOption) => {
    setSelectedPath([...selectedPath, option.id]);
    
    if (option.nextNodeId) {
      setCurrentNodeId(option.nextNodeId);
    } else {
      // Exercise completed
      setCompletedExercises([...completedExercises, currentExercise]);
    }
  };

  const resetExercise = () => {
    setCurrentNodeId('1');
    setSelectedPath([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Advanced': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const currentNode = getCurrentNode();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Interactive Exercises
        </h1>
        <p className="text-gray-300">Practice and master success frameworks through hands-on scenarios</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Exercise List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Available Exercises</h3>
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                currentExercise === exercise.id
                  ? 'border-purple-500/50 bg-purple-500/10'
                  : 'border-white/20 hover:border-purple-500/30'
              }`}
              onClick={() => setCurrentExercise(exercise.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  completedExercises.includes(exercise.id)
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-purple-500/20 border border-purple-500/30'
                }`}>
                  {completedExercises.includes(exercise.id) ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <Brain className="h-5 w-5 text-purple-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{exercise.title}</h4>
                  <p className="text-gray-300 text-sm mb-2">{exercise.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{exercise.timeEstimate} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exercise Content */}
        <div className="lg:col-span-2">
          {currentExercise === 'decision-tree' && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Strategic Decision Making</h3>
                <button
                  onClick={resetExercise}
                  className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors"
                >
                  Reset
                </button>
              </div>

              {currentNode && (
                <div className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-gray-400 text-sm">Step {selectedPath.length + 1}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${((selectedPath.length + 1) / 4) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-2">Scenario</h4>
                    <p className="text-gray-300">{currentNode.question}</p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">Choose your approach:</h4>
                    {currentNode.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-lg p-4 text-left transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{option.text}</span>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        </div>
                        <p className="text-gray-400 text-sm mt-2">{option.reasoning}</p>
                      </button>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <h5 className="text-blue-400 font-medium mb-1">Learning Point</h5>
                        <p className="text-gray-300 text-sm">{currentNode.explanation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Show outcome if it's a terminal node */}
                  {currentNode.options.some(opt => opt.outcome) && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Award className="h-5 w-5 text-green-400 mt-0.5" />
                        <div>
                          <h5 className="text-green-400 font-medium mb-1">Exercise Complete!</h5>
                          <p className="text-gray-300 text-sm">
                            You've navigated through the decision tree. Review your choices and their reasoning to reinforce learning.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Other Exercise Types */}
          {currentExercise === 'goal-setting' && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">SMART Goal Framework</h3>
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-medium">Exercise Completed!</p>
                  <p className="text-gray-300 text-sm">You've mastered the SMART goal framework</p>
                </div>
              </div>
            </div>
          )}

          {currentExercise === 'priority-matrix' && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Eisenhower Priority Matrix</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                  <h4 className="text-red-400 font-semibold mb-2">Urgent & Important</h4>
                  <p className="text-gray-400 text-sm">Do First</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                  <h4 className="text-yellow-400 font-semibold mb-2">Important, Not Urgent</h4>
                  <p className="text-gray-400 text-sm">Schedule</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                  <h4 className="text-blue-400 font-semibold mb-2">Urgent, Not Important</h4>
                  <p className="text-gray-400 text-sm">Delegate</p>
                </div>
                <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-4 text-center">
                  <h4 className="text-gray-400 font-semibold mb-2">Neither Urgent nor Important</h4>
                  <p className="text-gray-400 text-sm">Eliminate</p>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Start Exercise
                </button>
              </div>
            </div>
          )}

          {currentExercise === 'scenario-planning' && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Scenario Planning Exercise</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Business Context</h4>
                  <p className="text-gray-300 text-sm">
                    You're launching a new product in a competitive market. Plan for different scenarios
                    including best case, worst case, and most likely outcomes.
                  </p>
                </div>
                <div className="text-center">
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Begin Simulation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/30 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Progress</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">{completedExercises.length}</p>
            <p className="text-gray-400 text-sm">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">{exercises.length - completedExercises.length}</p>
            <p className="text-gray-400 text-sm">Remaining</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">
              {Math.round((completedExercises.length / exercises.length) * 100)}%
            </p>
            <p className="text-gray-400 text-sm">Progress</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">
              {exercises.reduce((total, ex) => total + ex.timeEstimate, 0)}
            </p>
            <p className="text-gray-400 text-sm">Total Minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveExercises;