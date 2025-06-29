import React, { useState } from 'react';
import { Users, Trophy, Clock, TrendingUp, MessageCircle, Star, Zap } from 'lucide-react';
import { Challenge } from '../types';

const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('challenges');

  const challenges: Challenge[] = [
    {
      id: '1',
      title: '30-Day Decision Framework Challenge',
      description: 'Apply first principles thinking to one major decision daily',
      participants: 1247,
      timeRemaining: '5 days left',
      reward: '500 XP + Decision Master Badge',
      difficulty: 'Intermediate'
    },
    {
      id: '2',
      title: 'Weekly Goal Sprint',
      description: 'Set and achieve 3 micro-goals each week for a month',
      participants: 892,
      timeRemaining: '12 days left',
      reward: '300 XP + Sprint Champion Badge',
      difficulty: 'Beginner'
    },
    {
      id: '3',
      title: 'Leadership Impact Project',
      description: 'Lead a team initiative and document your leadership journey',
      participants: 435,
      timeRemaining: '20 days left',
      reward: '1000 XP + Leadership Elite Badge',
      difficulty: 'Advanced'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 15680, streak: 45, level: 12 },
    { rank: 2, name: 'Marcus Rodriguez', points: 14230, streak: 38, level: 11 },
    { rank: 3, name: 'Emma Thompson', points: 13950, streak: 42, level: 11 },
    { rank: 4, name: 'David Kim', points: 12840, streak: 29, level: 10 },
    { rank: 5, name: 'You', points: 11200, streak: 23, level: 8 }
  ];

  const discussions = [
    {
      id: '1',
      title: 'How to apply Elon\'s first principles to product development?',
      author: 'Alex Johnson',
      replies: 24,
      lastActive: '2 hours ago',
      category: 'Framework Discussion'
    },
    {
      id: '2',
      title: 'Success story: Doubled my productivity using Naval\'s framework',
      author: 'Lisa Wang',
      replies: 18,
      lastActive: '4 hours ago',
      category: 'Success Stories'
    },
    {
      id: '3',
      title: 'Decision tree template for career transitions',
      author: 'Mike Foster',
      replies: 31,
      lastActive: '6 hours ago',
      category: 'Templates & Resources'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'Advanced': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Community Hub
        </h1>
        <p className="text-gray-300">Connect, compete, and grow with fellow success seekers</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-lg border border-white/10">
        {[
          { id: 'challenges', label: 'Challenges', icon: Trophy },
          { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp },
          { id: 'discussions', label: 'Discussions', icon: MessageCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{challenge.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <span className="text-purple-400 font-medium">{challenge.reward}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-orange-400">
                    <Clock className="h-4 w-4" />
                    <span>{challenge.timeRemaining}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg">
                  Join Challenge
                </button>
              </div>
            ))}
          </div>

          {/* Your Active Challenges */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <span>Your Active Challenges</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Decision Framework Challenge</h4>
                  <span className="text-green-400 text-sm">Day 8/30</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '27%' }} />
                </div>
                <p className="text-gray-400 text-sm">Today's decision: Prioritize feature development</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">Weekly Goal Sprint</h4>
                  <span className="text-blue-400 text-sm">Week 2/4</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '50%' }} />
                </div>
                <p className="text-gray-400 text-sm">2/3 goals completed this week</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <span>Global Leaderboard</span>
            </h3>
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    user.name === 'You'
                      ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      user.rank === 1 ? 'bg-yellow-500 text-black' :
                      user.rank === 2 ? 'bg-gray-400 text-black' :
                      user.rank === 3 ? 'bg-orange-500 text-black' :
                      'bg-gray-600 text-white'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <p className={`font-semibold ${user.name === 'You' ? 'text-purple-300' : 'text-white'}`}>
                        {user.name}
                      </p>
                      <p className="text-gray-400 text-sm">Level {user.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{user.points.toLocaleString()} XP</p>
                    <div className="flex items-center space-x-1 text-orange-400 text-sm">
                      <span>{user.streak}</span>
                      <span>🔥</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Most Consistent', metric: '52-day streak', leader: 'Sarah Chen' },
              { title: 'Framework Master', metric: '12 completed', leader: 'Marcus Rodriguez' },
              { title: 'Community Helper', metric: '148 replies', leader: 'Emma Thompson' }
            ].map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 p-6 text-center">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">{category.title}</h4>
                <p className="text-purple-400 font-medium mb-1">{category.leader}</p>
                <p className="text-gray-400 text-sm">{category.metric}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-blue-400" />
                <span>Community Discussions</span>
              </h3>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                New Discussion
              </button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium hover:text-purple-300 transition-colors">
                      {discussion.title}
                    </h4>
                    <span className="text-purple-400 text-xs px-2 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                      {discussion.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>by {discussion.author}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{discussion.replies}</span>
                      </div>
                      <span>{discussion.lastActive}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Categories */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: 'Framework Discussion', count: 156, color: 'purple' },
              { name: 'Success Stories', count: 89, color: 'green' },
              { name: 'Q&A', count: 234, color: 'blue' },
              { name: 'Templates & Resources', count: 67, color: 'orange' }
            ].map((category) => (
              <div
                key={category.name}
                className={`bg-gradient-to-br from-${category.color}-500/20 to-${category.color}-600/20 border border-${category.color}-500/30 rounded-lg p-4 text-center hover:border-${category.color}-500/50 transition-colors cursor-pointer`}
              >
                <p className={`text-${category.color}-400 font-medium`}>{category.name}</p>
                <p className="text-gray-400 text-sm">{category.count} discussions</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;