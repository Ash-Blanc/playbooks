import React, { useState } from 'react';
import { User, Settings, BookOpen, Heart, Clock, Download, Bell, Shield, CreditCard, LogOut, Edit, Save, X, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  membershipTier: 'Free' | 'Pro' | 'Founder Circle';
  joinDate: string;
  totalPlaybooks: number;
  completedPlaybooks: number;
  savedPlaybooks: string[];
  readingStreak: number;
  totalReadingTime: number;
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyDigest: boolean;
    playbookRecommendations: boolean;
  };
  customFields: {
    industry: string;
    role: string;
    company: string;
    goals: string[];
    interests: string[];
  };
}

interface ReadingHistory {
  id: string;
  playbookId: string;
  title: string;
  author: string;
  lastRead: string;
  progress: number;
  timeSpent: number;
  bookmarked: boolean;
  notes: number;
  completed: boolean;
}

const UserAccount: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    membershipTier: 'Founder Circle',
    joinDate: '2024-01-15',
    totalPlaybooks: 12,
    completedPlaybooks: 4,
    savedPlaybooks: ['1', '2', '3', '4', '5'],
    readingStreak: 23,
    totalReadingTime: 156,
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: true,
      playbookRecommendations: true
    },
    customFields: {
      industry: 'Technology',
      role: 'Product Manager',
      company: 'TechCorp Inc.',
      goals: ['Scale Product', 'Build Team', 'Increase Revenue'],
      interests: ['AI/ML', 'Product Strategy', 'Leadership']
    }
  });

  const readingHistory: ReadingHistory[] = [
    {
      id: '1',
      playbookId: '1',
      title: 'Elon\'s Decision Engine',
      author: 'Elon Musk',
      lastRead: '2 hours ago',
      progress: 65,
      timeSpent: 4.5,
      bookmarked: true,
      notes: 8,
      completed: false
    },
    {
      id: '2',
      playbookId: '2',
      title: 'Naval\'s Wealth Machine',
      author: 'Naval Ravikant',
      lastRead: '1 day ago',
      progress: 100,
      timeSpent: 6.2,
      bookmarked: true,
      notes: 12,
      completed: true
    },
    {
      id: '3',
      playbookId: '3',
      title: 'Bezos\' Customer Obsession',
      author: 'Jeff Bezos',
      lastRead: '3 days ago',
      progress: 30,
      timeSpent: 2.1,
      bookmarked: false,
      notes: 3,
      completed: false
    }
  ];

  const recommendations = [
    { title: 'Tim Cook\'s Leadership Matrix', reason: 'Based on your leadership interests', match: '94%' },
    { title: 'Thiel\'s Contrarian Thinking', reason: 'Complements your product strategy focus', match: '87%' },
    { title: 'Serena\'s Mental Game', reason: 'Popular with product managers', match: '82%' }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const addCustomGoal = () => {
    const newGoal = prompt('Enter a new goal:');
    if (newGoal) {
      setUserProfile({
        ...userProfile,
        customFields: {
          ...userProfile.customFields,
          goals: [...userProfile.customFields.goals, newGoal]
        }
      });
    }
  };

  const removeGoal = (goalToRemove: string) => {
    setUserProfile({
      ...userProfile,
      customFields: {
        ...userProfile.customFields,
        goals: userProfile.customFields.goals.filter(goal => goal !== goalToRemove)
      }
    });
  };

  const getMembershipColor = (tier: string) => {
    switch (tier) {
      case 'Founder Circle': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Pro': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your profile, preferences, and reading progress</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sticky top-8">
            <div className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'reading', label: 'Reading History', icon: BookOpen },
                { id: 'saved', label: 'Saved Playbooks', icon: Heart },
                { id: 'preferences', label: 'Preferences', icon: Settings },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'billing', label: 'Billing', icon: CreditCard }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={userProfile.avatar}
                        alt={userProfile.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                      />
                      <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-black mb-2">{userProfile.name}</h2>
                      <p className="text-gray-600 mb-3">{userProfile.email}</p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${getMembershipColor(userProfile.membershipTier)}`}>
                        {userProfile.membershipTier} Member
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">{userProfile.totalPlaybooks}</div>
                    <div className="text-gray-600 text-sm">Total Playbooks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">{userProfile.completedPlaybooks}</div>
                    <div className="text-gray-600 text-sm">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">{userProfile.readingStreak}</div>
                    <div className="text-gray-600 text-sm">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">{userProfile.totalReadingTime}h</div>
                    <div className="text-gray-600 text-sm">Reading Time</div>
                  </div>
                </div>

                {/* Editable Fields */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                        />
                      ) : (
                        <p className="text-black bg-gray-50 px-4 py-3 rounded-lg">{userProfile.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                        />
                      ) : (
                        <p className="text-black bg-gray-50 px-4 py-3 rounded-lg">{userProfile.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Industry</label>
                      {isEditing ? (
                        <select
                          value={userProfile.customFields.industry}
                          onChange={(e) => setUserProfile({
                            ...userProfile,
                            customFields: { ...userProfile.customFields, industry: e.target.value }
                          })}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                        >
                          <option>Technology</option>
                          <option>Finance</option>
                          <option>Healthcare</option>
                          <option>Consulting</option>
                          <option>Other</option>
                        </select>
                      ) : (
                        <p className="text-black bg-gray-50 px-4 py-3 rounded-lg">{userProfile.customFields.industry}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Role</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userProfile.customFields.role}
                          onChange={(e) => setUserProfile({
                            ...userProfile,
                            customFields: { ...userProfile.customFields, role: e.target.value }
                          })}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                        />
                      ) : (
                        <p className="text-black bg-gray-50 px-4 py-3 rounded-lg">{userProfile.customFields.role}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Company</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userProfile.customFields.company}
                          onChange={(e) => setUserProfile({
                            ...userProfile,
                            customFields: { ...userProfile.customFields, company: e.target.value }
                          })}
                          className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                        />
                      ) : (
                        <p className="text-black bg-gray-50 px-4 py-3 rounded-lg">{userProfile.customFields.company}</p>
                      )}
                    </div>
                  </div>

                  {/* Goals */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-gray-700 font-medium">Goals</label>
                      {isEditing && (
                        <button
                          onClick={addCustomGoal}
                          className="bg-black text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center space-x-1"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add Goal</span>
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.customFields.goals.map((goal, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-lg border border-blue-200"
                        >
                          <span className="text-sm font-medium">{goal}</span>
                          {isEditing && (
                            <button
                              onClick={() => removeGoal(goal)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-bold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-black mb-4">Recommended for You</h3>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <h4 className="text-black font-bold text-sm">{rec.title}</h4>
                        <p className="text-gray-600 text-xs">{rec.reason}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-600 text-sm font-bold">{rec.match} match</span>
                        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reading History Tab */}
          {activeTab === 'reading' && (
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-black">Reading History</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{readingHistory.length} playbooks</span>
                    <span>•</span>
                    <span>{userProfile.totalReadingTime} hours total</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {readingHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-black transition-colors"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-gray-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-black font-bold">{item.title}</h4>
                            <p className="text-gray-600 text-sm">{item.author}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500 text-sm">{item.lastRead}</p>
                            {item.completed && (
                              <span className="inline-flex items-center text-green-600 text-sm font-medium">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-black h-2 rounded-full"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span>{item.progress}%</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{item.timeSpent}h</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{item.notes} notes</span>
                          </div>
                          {item.bookmarked && (
                            <Heart className="h-4 w-4 text-red-500 fill-current" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="bg-gray-100 hover:bg-gray-200 text-black p-2 rounded-lg transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          {item.completed ? 'Review' : 'Continue'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-black mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates about new playbooks and features' },
                    { key: 'pushNotifications', label: 'Push Notifications', description: 'Get notified about reading reminders and achievements' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of your reading progress and recommendations' },
                    { key: 'playbookRecommendations', label: 'Playbook Recommendations', description: 'Personalized suggestions based on your interests' }
                  ].map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <h4 className="text-black font-bold text-sm">{pref.label}</h4>
                        <p className="text-gray-600 text-xs">{pref.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={userProfile.preferences[pref.key as keyof typeof userProfile.preferences]}
                          onChange={(e) => setUserProfile({
                            ...userProfile,
                            preferences: {
                              ...userProfile.preferences,
                              [pref.key]: e.target.checked
                            }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-black mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter current password"
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 text-black focus:outline-none focus:border-black transition-colors"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-black mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="text-black font-medium">Enable 2FA</p>
                    <p className="text-gray-600 text-sm">Add an extra layer of security to your account</p>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-black mb-6">Billing & Subscription</h3>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-black">Founder Circle</h4>
                      <p className="text-gray-600">Full access to all playbooks and features</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">$97</p>
                      <p className="text-gray-600 text-sm">per month</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next billing date: March 15, 2024</span>
                    <button className="text-purple-600 hover:text-purple-800 font-medium">
                      Manage Subscription
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-black">Payment Method</h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-black rounded text-white flex items-center justify-center text-xs font-bold">
                          ••••
                        </div>
                        <div>
                          <p className="text-black font-medium">•••• •••• •••• 4242</p>
                          <p className="text-gray-600 text-sm">Expires 12/26</p>
                        </div>
                      </div>
                      <button className="text-black hover:text-gray-600 font-medium text-sm">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;