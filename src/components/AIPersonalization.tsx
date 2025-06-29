import React, { useState } from 'react';
import { Brain, Target, TrendingUp, Lightbulb, Settings, User, Clock, BarChart3 } from 'lucide-react';
import { PersonalizationProfile, AIInsight } from '../types';

const AIPersonalization: React.FC = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const [profile, setProfile] = useState<PersonalizationProfile>({
    userId: 'user-1',
    goals: ['Increase Revenue', 'Improve Decision Making', 'Build Team'],
    industry: 'Technology',
    experience: 'Senior',
    learningStyle: 'visual',
    timeAvailability: 30,
    focusAreas: ['Leadership', 'Strategy', 'Innovation'],
    currentChallenges: ['Scaling Team', 'Market Competition', 'Product Development']
  });

  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'recommendation',
      title: 'Optimal Learning Path Identified',
      description: 'Based on your goals and learning style, start with Tim Cook\'s Leadership Matrix, then progress to Elon\'s Framework for strategic thinking.',
      confidence: 94,
      actionable: true,
      relatedPlaybooks: ['tim-cook-leadership', 'elon-musk-framework']
    },
    {
      id: '2',
      type: 'pattern',
      title: 'Success Pattern Match',
      description: 'Your profile matches 87% with users who achieved 3x revenue growth within 6 months of completing leadership playbooks.',
      confidence: 87,
      actionable: true,
      relatedPlaybooks: ['leadership-fundamentals']
    },
    {
      id: '3',
      type: 'optimization',
      title: 'Learning Schedule Optimization',
      description: 'Your peak learning times are 9-11 AM and 2-4 PM. Scheduling sessions during these windows increases retention by 34%.',
      confidence: 91,
      actionable: true,
      relatedPlaybooks: []
    },
    {
      id: '4',
      type: 'warning',
      title: 'Potential Bottleneck Detected',
      description: 'Your current challenge with scaling teams suggests prioritizing delegation frameworks before strategic planning modules.',
      confidence: 78,
      actionable: true,
      relatedPlaybooks: ['delegation-mastery']
    }
  ];

  const learningMetrics = {
    completionRate: 89,
    retentionScore: 92,
    applicationRate: 76,
    peerComparison: 15 // percentile
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return Lightbulb;
      case 'pattern': return TrendingUp;
      case 'optimization': return Settings;
      case 'warning': return Target;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'recommendation': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'pattern': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'optimization': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'warning': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          AI Personalization Hub
        </h1>
        <p className="text-gray-300">Your intelligent learning companion that adapts to your unique success journey</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-lg border border-white/10">
        {[
          { id: 'insights', label: 'AI Insights', icon: Brain },
          { id: 'profile', label: 'Learning Profile', icon: User },
          { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
          { id: 'recommendations', label: 'Smart Recommendations', icon: Target }
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

      {/* AI Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {aiInsights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <div
                  key={insight.id}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`p-3 rounded-full border ${getInsightColor(insight.type)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{insight.title}</h3>
                        <span className="text-green-400 text-sm font-medium">{insight.confidence}%</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getInsightColor(insight.type)}`}>
                        {insight.type}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{insight.description}</p>
                  
                  {insight.relatedPlaybooks.length > 0 && (
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm mb-2">Related Playbooks:</p>
                      <div className="flex flex-wrap gap-2">
                        {insight.relatedPlaybooks.map((playbook) => (
                          <span
                            key={playbook}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30"
                          >
                            {playbook}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {insight.actionable && (
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                      Apply Insight
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Real-time Learning Optimization */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Settings className="h-5 w-5 text-purple-400" />
              <span>Real-time Learning Optimization</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-green-500/30">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">Adaptive Pacing</h4>
                <p className="text-gray-400 text-sm">AI adjusts content difficulty based on your progress</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-blue-500/30">
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">Optimal Timing</h4>
                <p className="text-gray-400 text-sm">Learns your peak performance hours</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-purple-500/30">
                  <Brain className="h-8 w-8 text-purple-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">Content Curation</h4>
                <p className="text-gray-400 text-sm">Personalizes examples to your industry</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learning Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Personal Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Industry</label>
                  <select
                    value={profile.industry}
                    onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Experience Level</label>
                  <select
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="Junior">Junior (0-2 years)</option>
                    <option value="Mid">Mid-level (3-5 years)</option>
                    <option value="Senior">Senior (6-10 years)</option>
                    <option value="Executive">Executive (10+ years)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Learning Style</label>
                  <select
                    value={profile.learningStyle}
                    onChange={(e) => setProfile({ ...profile, learningStyle: e.target.value as any })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                  >
                    <option value="visual">Visual</option>
                    <option value="auditory">Auditory</option>
                    <option value="kinesthetic">Kinesthetic</option>
                    <option value="reading">Reading/Writing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Daily Learning Time (minutes)</label>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    value={profile.timeAvailability}
                    onChange={(e) => setProfile({ ...profile, timeAvailability: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-1">
                    <span>15 min</span>
                    <span className="text-white font-medium">{profile.timeAvailability} min</span>
                    <span>120 min</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Goals & Focus Areas</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Primary Goals</label>
                  <div className="flex flex-wrap gap-2">
                    {profile.goals.map((goal, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Focus Areas</label>
                  <div className="flex flex-wrap gap-2">
                    {profile.focusAreas.map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Current Challenges</label>
                  <div className="flex flex-wrap gap-2">
                    {profile.currentChallenges.map((challenge, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30"
                      >
                        {challenge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center">
              <div className="bg-green-500/20 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{learningMetrics.completionRate}%</p>
              <p className="text-green-300 text-sm">Completion Rate</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 text-center">
              <div className="bg-blue-500/20 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Brain className="h-6 w-6 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{learningMetrics.retentionScore}%</p>
              <p className="text-blue-300 text-sm">Retention Score</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 text-center">
              <div className="bg-purple-500/20 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{learningMetrics.applicationRate}%</p>
              <p className="text-purple-300 text-sm">Application Rate</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6 text-center">
              <div className="bg-orange-500/20 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-orange-400" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">Top {learningMetrics.peerComparison}%</p>
              <p className="text-orange-300 text-sm">Peer Ranking</p>
            </div>
          </div>

          {/* Learning Patterns */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Learning Patterns Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Peak Performance Hours</h4>
                <div className="space-y-2">
                  {[
                    { time: '9:00 AM - 11:00 AM', score: 94, color: 'green' },
                    { time: '2:00 PM - 4:00 PM', score: 87, color: 'blue' },
                    { time: '7:00 PM - 9:00 PM', score: 72, color: 'yellow' },
                    { time: '11:00 PM - 1:00 AM', score: 45, color: 'red' }
                  ].map((slot) => (
                    <div key={slot.time} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{slot.time}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div
                            className={`bg-${slot.color}-500 h-2 rounded-full`}
                            style={{ width: `${slot.score}%` }}
                          />
                        </div>
                        <span className="text-white text-sm w-8">{slot.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Content Preferences</h4>
                <div className="space-y-2">
                  {[
                    { type: 'Interactive Exercises', preference: 92 },
                    { type: 'Video Content', preference: 78 },
                    { type: 'Case Studies', preference: 85 },
                    { type: 'Reading Materials', preference: 63 }
                  ].map((content) => (
                    <div key={content.type} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{content.type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${content.preference}%` }}
                          />
                        </div>
                        <span className="text-white text-sm w-8">{content.preference}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Personalized Learning Path</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Tim Cook\'s Leadership Matrix',
                  reason: 'Matches your leadership goals and management challenges',
                  confidence: 94,
                  timeToComplete: '5 weeks',
                  priority: 'high'
                },
                {
                  title: 'Naval\'s Wealth Building Framework',
                  reason: 'Aligns with your financial growth objectives',
                  confidence: 87,
                  timeToComplete: '4 weeks',
                  priority: 'medium'
                },
                {
                  title: 'Elon\'s Innovation Process',
                  reason: 'Supports your product development challenges',
                  confidence: 82,
                  timeToComplete: '6 weeks',
                  priority: 'medium'
                }
              ].map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    rec.priority === 'high'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-semibold">{rec.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 text-sm">{rec.confidence}% match</span>
                      {rec.priority === 'high' && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-500/30">
                          Priority
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{rec.reason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{rec.timeToComplete}</span>
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPersonalization;