import React from 'react';
import { TrendingUp, Target, Clock, Trophy, Flame, Star, Calendar, Play, Crown, BookOpen, ArrowRight } from 'lucide-react';
import { UserProgress } from '../types';

interface DashboardProps {
  userProgress: UserProgress;
}

const Dashboard: React.FC<DashboardProps> = ({ userProgress }) => {
  const progressPercentage = (userProgress.xp / userProgress.nextLevelXp) * 100;

  const currentReading = [
    { 
      title: 'The Elon Musk Method', 
      progress: 65, 
      nextChapter: 'Advanced Problem Solving', 
      timeLeft: '2 days',
      lastRead: '2 hours ago',
      bookmark: 'Chapter 3: Solution Building'
    },
    { 
      title: 'Naval\'s Wealth Secrets', 
      progress: 30, 
      nextChapter: 'Building Leverage', 
      timeLeft: '5 days',
      lastRead: '1 day ago',
      bookmark: 'Chapter 2: Judgment & Leverage'
    }
  ];

  const readingStats = [
    { label: 'Books Completed', value: userProgress.completedPlaybooks, icon: BookOpen },
    { label: 'Reading Streak', value: `${userProgress.currentStreak} days`, icon: Flame },
    { label: 'Total Hours', value: userProgress.totalHours, icon: Clock },
    { label: 'Success Rate', value: '89%', icon: TrendingUp }
  ];

  const recentActivity = [
    { title: 'Completed Chapter: Problem Deconstruction', book: 'Elon Musk Method', time: '2 hours ago', type: 'completion' },
    { title: 'Started Reading: Leverage & Judgment', book: 'Naval\'s Wealth Secrets', time: '1 day ago', type: 'start' },
    { title: 'Achievement Unlocked: Week Warrior', book: 'General', time: '3 days ago', type: 'achievement' },
    { title: 'Bookmarked: Mental Resilience Techniques', book: 'Serena\'s Mental Game', time: '1 week ago', type: 'bookmark' }
  ];

  const recommendations = [
    { title: 'Tim Cook\'s Leadership', reason: 'Based on your progress in Elon\'s framework', match: '94%' },
    { title: 'Serena\'s Mental Game', reason: 'Perfect for building resilience', match: '87%' },
    { title: 'Warren\'s Investment Mastery', reason: 'Complements Naval\'s wealth principles', match: '82%' }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">
          Your Reading Journey
        </h1>
        <p className="text-gray-600">Continue building your mastery, one framework at a time</p>
      </div>

      {/* Level Progress */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white text-black p-4 rounded-xl">
              <Crown className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Level {userProgress.level} Elite</h2>
              <p className="text-gray-300">Master Reader Status</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{userProgress.xp}</p>
            <p className="text-gray-300">/ {userProgress.nextLevelXp} XP</p>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
          <div
            className="bg-white h-4 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-gray-300">
          {userProgress.nextLevelXp - userProgress.xp} XP to reach Level {userProgress.level + 1}
        </p>
      </div>

      {/* Reading Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {readingStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-black transition-all duration-200">
              <div className="bg-gray-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <Icon className="h-6 w-6 text-black" />
              </div>
              <p className="text-2xl font-bold text-black mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Reading */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-black">Continue Reading</h3>
              <button className="text-gray-600 hover:text-black font-medium text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {currentReading.map((book, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-black transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-black mb-1">{book.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">Last read: {book.lastRead}</p>
                      <p className="text-gray-700 text-sm font-medium">📖 {book.bookmark}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-black font-bold text-lg">{book.progress}%</span>
                      <p className="text-gray-600 text-xs">{book.timeLeft} left</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-black h-3 rounded-full transition-all duration-500"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700 font-medium">Next: {book.nextChapter}</p>
                    <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center space-x-2 group-hover:shadow-lg">
                      <Play className="h-4 w-4" />
                      <span>Continue</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-black mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'completion' ? 'bg-black text-white' :
                    activity.type === 'achievement' ? 'bg-gray-800 text-white' :
                    activity.type === 'bookmark' ? 'bg-gray-200 text-black' :
                    'bg-gray-100 text-black'
                  }`}>
                    {activity.type === 'completion' ? <Target className="h-4 w-4" /> :
                     activity.type === 'achievement' ? <Trophy className="h-4 w-4" /> :
                     activity.type === 'bookmark' ? <BookOpen className="h-4 w-4" /> :
                     <Play className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-black font-medium">{activity.title}</p>
                    <p className="text-gray-600 text-sm">{activity.book}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Reading Goal */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-black mb-4">Today's Reading Goal</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-1">45</div>
                <div className="text-gray-600 text-sm">minutes read</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-black h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-gray-700 text-sm font-medium text-center">15 minutes to go!</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-black mb-4">Latest Achievements</h3>
            <div className="space-y-3">
              {userProgress.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-black text-white p-2 rounded-lg">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <span className="text-black font-medium text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Reading */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-black mb-4">Recommended for You</h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-black font-bold text-sm">{rec.title}</h4>
                    <span className="text-green-600 text-xs font-bold">{rec.match} match</span>
                  </div>
                  <p className="text-gray-600 text-xs">{rec.reason}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-black py-2 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2">
              <span>View All Recommendations</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Reading Schedule */}
          <div className="bg-black text-white rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">This Week's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium text-sm">Advanced Problem Solving</p>
                  <p className="text-gray-300 text-xs">Today, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium text-sm">Building Leverage</p>
                  <p className="text-gray-300 text-xs">Tomorrow, 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium text-sm">Mental Resilience</p>
                  <p className="text-gray-300 text-xs">Friday, 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;