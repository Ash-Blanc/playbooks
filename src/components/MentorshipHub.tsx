import React, { useState } from 'react';
import { Video, Calendar, Star, Clock, MessageCircle, Users, Award, Filter } from 'lucide-react';
import { Mentor } from '../types';

const MentorshipHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mentors');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Former VP of Product',
      company: 'Google',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      expertise: ['Product Strategy', 'Team Leadership', 'Growth Hacking'],
      rating: 4.9,
      sessions: 247,
      hourlyRate: 150,
      bio: 'Led product teams at Google for 8 years, scaling products from 0 to 100M+ users. Specialized in product-market fit and team building.',
      availability: ['Mon 2-6 PM', 'Wed 10 AM-2 PM', 'Fri 3-7 PM']
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      title: 'Serial Entrepreneur',
      company: '3 Exits',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      expertise: ['Startup Strategy', 'Fundraising', 'Sales'],
      rating: 4.8,
      sessions: 189,
      hourlyRate: 200,
      bio: 'Built and sold 3 companies, raised $50M+ in funding. Expert in early-stage strategy and scaling operations.',
      availability: ['Tue 9 AM-1 PM', 'Thu 2-6 PM', 'Sat 10 AM-2 PM']
    },
    {
      id: '3',
      name: 'Dr. Emily Watson',
      title: 'Executive Coach',
      company: 'Fortune 500 Advisor',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      expertise: ['Executive Coaching', 'Decision Making', 'Leadership'],
      rating: 4.9,
      sessions: 312,
      hourlyRate: 175,
      bio: 'PhD in Organizational Psychology. Coached 100+ C-level executives at Fortune 500 companies.',
      availability: ['Mon 9 AM-5 PM', 'Wed 1-5 PM', 'Fri 9 AM-1 PM']
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      mentorName: 'Sarah Chen',
      topic: 'Product Strategy Review',
      date: '2024-03-15',
      time: '2:00 PM',
      duration: 60,
      type: 'video'
    },
    {
      id: '2',
      mentorName: 'Dr. Emily Watson',
      topic: 'Leadership Development',
      date: '2024-03-17',
      time: '10:00 AM',
      duration: 45,
      type: 'video'
    }
  ];

  const pastSessions = [
    {
      id: '1',
      mentorName: 'Marcus Rodriguez',
      topic: 'Fundraising Strategy',
      date: '2024-03-10',
      rating: 5,
      notes: 'Excellent insights on pitch deck structure and investor targeting'
    },
    {
      id: '2',
      mentorName: 'Sarah Chen',
      topic: 'Team Building',
      date: '2024-03-08',
      rating: 5,
      notes: 'Practical frameworks for scaling engineering teams'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Mentorship Hub
        </h1>
        <p className="text-gray-300">Connect with industry experts and accelerate your success journey</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-lg border border-white/10">
        {[
          { id: 'mentors', label: 'Find Mentors', icon: Users },
          { id: 'sessions', label: 'My Sessions', icon: Calendar },
          { id: 'history', label: 'Session History', icon: Clock }
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

      {/* Find Mentors Tab */}
      {activeTab === 'mentors' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 p-4">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50">
                <option>All Expertise</option>
                <option>Product Strategy</option>
                <option>Leadership</option>
                <option>Fundraising</option>
              </select>
              <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50">
                <option>Any Price</option>
                <option>Under $100/hr</option>
                <option>$100-200/hr</option>
                <option>$200+/hr</option>
              </select>
              <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50">
                <option>Any Rating</option>
                <option>4.5+ Stars</option>
                <option>4.8+ Stars</option>
              </select>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{mentor.name}</h3>
                    <p className="text-purple-400 text-sm font-medium mb-1">{mentor.title}</p>
                    <p className="text-gray-400 text-sm">{mentor.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-white text-sm">{mentor.rating}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{mentor.sessions} sessions</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{mentor.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">${mentor.hourlyRate}/hour</p>
                    <p className="text-gray-400 text-xs">Next available: {mentor.availability[0]}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedMentor(mentor)}
                      className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      View Profile
                    </button>
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Upcoming Sessions</h3>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500/20 p-2 rounded-full border border-green-500/30">
                        <Video className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{session.topic}</h4>
                        <p className="text-gray-400 text-sm">with {session.mentorName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{session.date}</p>
                      <p className="text-gray-400 text-sm">{session.time} ({session.duration} min)</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Join Session
                    </button>
                    <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                      Reschedule
                    </button>
                    <button className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 text-center">
              <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Schedule Session</h4>
              <p className="text-blue-300 text-sm mb-4">Book time with your favorite mentors</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Browse Mentors
              </button>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center">
              <MessageCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Quick Question</h4>
              <p className="text-green-300 text-sm mb-4">Get fast answers from experts</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Ask Question
              </button>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 text-center">
              <Award className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Group Session</h4>
              <p className="text-purple-300 text-sm mb-4">Join peer learning groups</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Find Groups
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Past Sessions</h3>
            <div className="space-y-4">
              {pastSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-semibold mb-1">{session.topic}</h4>
                      <p className="text-gray-400 text-sm">with {session.mentorName}</p>
                      <p className="text-gray-400 text-sm">{session.date}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < session.rating ? 'text-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{session.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Session Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-white mb-1">12</p>
              <p className="text-blue-300 text-sm">Total Sessions</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-white mb-1">18</p>
              <p className="text-green-300 text-sm">Hours Mentored</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-white mb-1">4.9</p>
              <p className="text-purple-300 text-sm">Avg Rating Given</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-white mb-1">5</p>
              <p className="text-orange-300 text-sm">Mentors Worked With</p>
            </div>
          </div>
        </div>
      )}

      {/* Mentor Profile Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start space-x-4 mb-6">
              <img
                src={selectedMentor.avatar}
                alt={selectedMentor.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/30"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">{selectedMentor.name}</h3>
                <p className="text-purple-400 font-medium mb-1">{selectedMentor.title}</p>
                <p className="text-gray-400">{selectedMentor.company}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-white">{selectedMentor.rating}</span>
                  </div>
                  <span className="text-gray-400">{selectedMentor.sessions} sessions</span>
                  <span className="text-green-400 font-semibold">${selectedMentor.hourlyRate}/hr</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-2">About</h4>
                <p className="text-gray-300">{selectedMentor.bio}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Availability</h4>
                <div className="space-y-2">
                  {selectedMentor.availability.map((slot, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">{slot}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Book Session
                </button>
                <button className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorshipHub;