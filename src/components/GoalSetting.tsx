import React, { useState } from 'react';
import { Target, Plus, Calendar, TrendingUp, CheckCircle, Circle } from 'lucide-react';
import { Goal } from '../types';

const GoalSetting: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Launch My SaaS Product',
      description: 'Complete development and launch my B2B productivity tool',
      category: 'Business',
      targetDate: '2024-06-15',
      progress: 65,
      milestones: [
        { id: '1', title: 'Complete MVP Development', completed: true, dueDate: '2024-03-01' },
        { id: '2', title: 'Beta Testing with 50 Users', completed: true, dueDate: '2024-04-15' },
        { id: '3', title: 'Marketing Website Launch', completed: false, dueDate: '2024-05-01' },
        { id: '4', title: 'Public Launch', completed: false, dueDate: '2024-06-15' }
      ]
    },
    {
      id: '2',
      title: 'Master Decision Making',
      description: 'Implement systematic decision-making frameworks in daily life',
      category: 'Personal Development',
      targetDate: '2024-05-30',
      progress: 40,
      milestones: [
        { id: '1', title: 'Complete Elon Musk Framework', completed: true, dueDate: '2024-03-15' },
        { id: '2', title: 'Practice First Principles Daily', completed: false, dueDate: '2024-04-15' },
        { id: '3', title: 'Create Personal Decision Matrix', completed: false, dueDate: '2024-05-30' }
      ]
    }
  ]);

  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Business',
    targetDate: ''
  });

  const handleCreateGoal = () => {
    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
      progress: 0,
      milestones: []
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', category: 'Business', targetDate: '' });
    setShowNewGoalForm(false);
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          milestones: goal.milestones.map(milestone =>
            milestone.id === milestoneId
              ? { ...milestone, completed: !milestone.completed }
              : milestone
          )
        };
      }
      return goal;
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Business': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'Personal Development': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Financial': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Health': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            Smart Goal Setting
          </h1>
          <p className="text-gray-300">Create SMART goals and track your progress with precision</p>
        </div>
        <button
          onClick={() => setShowNewGoalForm(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Goal</span>
        </button>
      </div>

      {/* New Goal Form */}
      {showNewGoalForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Create New Goal</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Goal title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
              <textarea
                placeholder="Goal description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 h-24 resize-none"
              />
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
              >
                <option value="Business">Business</option>
                <option value="Personal Development">Personal Development</option>
                <option value="Financial">Financial</option>
                <option value="Health">Health</option>
              </select>
              <input
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
              />
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCreateGoal}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  Create Goal
                </button>
                <button
                  onClick={() => setShowNewGoalForm(false)}
                  className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{goal.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(goal.category)}`}>
                    {goal.category}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{goal.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>{goal.progress}% Complete</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            {/* Milestones */}
            {goal.milestones.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Milestones</h4>
                <div className="space-y-2">
                  {goal.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => toggleMilestone(goal.id, milestone.id)}
                    >
                      {milestone.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className={`font-medium ${milestone.completed ? 'text-green-300 line-through' : 'text-white'}`}>
                          {milestone.title}
                        </p>
                        <p className="text-gray-400 text-sm">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Goal Templates */}
      <div className="mt-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl border border-purple-500/30 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Goal Templates</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Startup Launch', description: 'Complete framework for launching a tech startup', category: 'Business' },
            { title: 'Investment Portfolio', description: 'Build a diversified investment portfolio', category: 'Financial' },
            { title: 'Leadership Skills', description: 'Develop advanced leadership capabilities', category: 'Personal Development' }
          ].map((template, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20 hover:border-purple-500/50 transition-colors cursor-pointer">
              <h4 className="text-white font-semibold mb-2">{template.title}</h4>
              <p className="text-gray-300 text-sm mb-3">{template.description}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(template.category)}`}>
                {template.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalSetting;