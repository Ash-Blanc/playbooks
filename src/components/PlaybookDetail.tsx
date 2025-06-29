import React, { useState } from 'react';
import { ArrowLeft, Play, Clock, Users, Star, CheckCircle, Lock, Target, Calendar, Crown, BookOpen, Bookmark, Share } from 'lucide-react';
import { PlayBook } from '../types';

interface PlaybookDetailProps {
  playbook: PlayBook;
  onBack: () => void;
}

const PlaybookDetail: React.FC<PlaybookDetailProps> = ({ playbook, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const chapters = [
    {
      id: 1,
      title: 'Foundation Assessment',
      description: 'Quick readiness check and goal setting',
      duration: '10 min',
      type: 'assessment',
      unlocked: true,
      completed: false,
      pages: 12
    },
    {
      id: 2,
      title: 'The First Principles Mindset',
      description: 'Understanding the core philosophy',
      duration: '25 min',
      type: 'reading',
      unlocked: true,
      completed: true,
      pages: 28
    },
    {
      id: 3,
      title: 'Problem Deconstruction Method',
      description: 'Step-by-step breakdown techniques',
      duration: '45 min',
      type: 'reading',
      unlocked: true,
      completed: true,
      pages: 42
    },
    {
      id: 4,
      title: 'Assumption Identification',
      description: 'Finding hidden assumptions in any problem',
      duration: '35 min',
      type: 'practice',
      unlocked: true,
      completed: false,
      pages: 35,
      currentPage: 15
    },
    {
      id: 5,
      title: 'Solution Building Framework',
      description: 'Constructing innovative solutions',
      duration: '60 min',
      type: 'reading',
      unlocked: false,
      completed: false,
      pages: 58
    },
    {
      id: 6,
      title: 'Real-World Application',
      description: 'Apply the method to your actual challenges',
      duration: '2 hours',
      type: 'project',
      unlocked: false,
      completed: false,
      pages: 24
    }
  ];

  const getChapterIcon = (type: string, unlocked: boolean, completed: boolean) => {
    if (completed) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (!unlocked) return <Lock className="h-5 w-5 text-gray-400" />;
    
    switch (type) {
      case 'assessment': return <Target className="h-5 w-5 text-blue-600" />;
      case 'reading': return <BookOpen className="h-5 w-5 text-black" />;
      case 'practice': return <Play className="h-5 w-5 text-purple-600" />;
      case 'project': return <Calendar className="h-5 w-5 text-orange-600" />;
      default: return <BookOpen className="h-5 w-5 text-black" />;
    }
  };

  const getChapterStatus = (chapter: any) => {
    if (chapter.completed) return 'Completed';
    if (!chapter.unlocked) return 'Locked';
    if (chapter.currentPage) return `Page ${chapter.currentPage} of ${chapter.pages}`;
    return 'Not Started';
  };

  const totalPages = chapters.reduce((sum, chapter) => sum + chapter.pages, 0);
  const completedPages = chapters.reduce((sum, chapter) => {
    if (chapter.completed) return sum + chapter.pages;
    if (chapter.currentPage) return sum + chapter.currentPage;
    return sum;
  }, 0);
  const readingProgress = Math.round((completedPages / totalPages) * 100);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-black" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-black">{playbook.title}</h1>
              <p className="text-gray-600 text-sm">{playbook.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:text-black'
                }`}
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 hover:text-black rounded-lg transition-colors">
                <Share className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-black" />
                <span className="text-black text-sm font-bold">{playbook.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Book Cover & Info */}
            <div className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="relative">
                  <div className="bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden aspect-[3/4]">
                    <img
                      src={playbook.image}
                      alt={playbook.title}
                      className="w-full h-full object-cover filter grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-700 font-medium">Reading Progress</span>
                          <span className="text-black font-bold">{readingProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-black h-2 rounded-full transition-all duration-500"
                            style={{ width: `${readingProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Crown className="h-5 w-5 text-black" />
                      <span className="text-black font-bold text-sm">VERIFIED FRAMEWORK</span>
                    </div>
                    <h2 className="text-3xl font-bold text-black mb-2">{playbook.title}</h2>
                    <p className="text-lg text-gray-600 mb-4">{playbook.subtitle}</p>
                    <p className="text-gray-700 leading-relaxed">{playbook.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-black">{totalPages}</div>
                      <div className="text-gray-600 text-sm">Pages</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-black">{playbook.timeToComplete}</div>
                      <div className="text-gray-600 text-sm">Reading Time</div>
                    </div>
                  </div>

                  <button className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl">
                    <Play className="h-6 w-6" />
                    <span>{readingProgress > 0 ? 'Continue Reading' : 'Start Reading'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'chapters', label: 'Table of Contents' },
                { id: 'reviews', label: 'Reader Reviews' },
                { id: 'notes', label: 'My Notes' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 rounded-lg font-bold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-black text-white shadow-lg'
                      : 'text-gray-600 hover:text-black hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-black mb-4">What You'll Master</h3>
                  <div className="space-y-3">
                    {[
                      'Break down any complex problem into fundamental components',
                      'Question assumptions that others take for granted',
                      'Build solutions from first principles rather than analogies',
                      'Make decisions with incomplete information',
                      'Scale innovative thinking across teams and organizations'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-black mb-4">About the Author</h3>
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-black text-white rounded-xl flex items-center justify-center">
                      <span className="font-bold text-2xl">EM</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-black mb-2">{playbook.author}</h4>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Elon Musk is the CEO of Tesla and SpaceX, known for revolutionizing multiple industries through first principles thinking and relentless innovation. His approach to problem-solving has led to breakthroughs in electric vehicles, space exploration, and sustainable energy.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {playbook.authorCredentials.map((credential, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium"
                          >
                            {credential}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chapters' && (
              <div className="space-y-4">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-black mb-6">Table of Contents</h3>
                  <div className="space-y-4">
                    {chapters.map((chapter, index) => (
                      <div
                        key={chapter.id}
                        className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                          chapter.unlocked
                            ? 'border-gray-200 hover:border-black cursor-pointer bg-white'
                            : 'border-gray-100 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {getChapterIcon(chapter.type, chapter.unlocked, chapter.completed)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-black font-bold">
                                Chapter {chapter.id}: {chapter.title}
                              </h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{chapter.pages} pages</span>
                                <span>{chapter.duration}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{chapter.description}</p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-medium px-2 py-1 rounded ${
                                chapter.completed ? 'bg-green-100 text-green-700' :
                                !chapter.unlocked ? 'bg-gray-100 text-gray-500' :
                                chapter.currentPage ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {getChapterStatus(chapter)}
                              </span>
                              {chapter.unlocked && !chapter.completed && (
                                <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                                  {chapter.currentPage ? 'Continue' : 'Start'}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-black mb-6">Reader Reviews</h3>
                  <div className="space-y-6">
                    {[
                      {
                        name: 'Sarah Chen',
                        title: 'Product Manager at Google',
                        rating: 5,
                        comment: 'This completely transformed how I approach product development. The first principles method helped me identify breakthrough solutions that our team had been missing for months.',
                        date: '2 weeks ago',
                        helpful: 24
                      },
                      {
                        name: 'Marcus Rodriguez',
                        title: 'Startup Founder',
                        rating: 5,
                        comment: 'Applied this framework to our business model and found three major assumptions we were making. Pivoting based on these insights led to 300% growth.',
                        date: '1 month ago',
                        helpful: 18
                      },
                      {
                        name: 'Emily Watson',
                        title: 'Engineering Director',
                        rating: 4,
                        comment: 'Solid framework with practical examples. Takes time to master but the results are worth it. The real-world applications are incredibly valuable.',
                        date: '2 months ago',
                        helpful: 12
                      }
                    ].map((review, index) => (
                      <div
                        key={index}
                        className="border-2 border-gray-200 rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-black font-bold">{review.name}</h4>
                            <p className="text-gray-600 text-sm">{review.title}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-black fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{review.comment}</p>
                        <div className="flex items-center justify-between">
                          <button className="text-gray-600 hover:text-black text-sm font-medium">
                            👍 Helpful ({review.helpful})
                          </button>
                          <button className="text-gray-600 hover:text-black text-sm font-medium">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-black mb-6">My Reading Notes</h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-black">Chapter 3, Page 15</h4>
                      <span className="text-gray-500 text-sm">2 days ago</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      "The key insight here is that most people accept industry conventions without questioning the underlying physics or economics."
                    </p>
                    <p className="text-gray-600 text-xs italic">
                      My note: This applies directly to our pricing strategy - we've been following competitors instead of calculating true value.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-black">Chapter 2, Page 8</h4>
                      <span className="text-gray-500 text-sm">1 week ago</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">
                      "Break down the problem to its fundamental truths and reason up from there."
                    </p>
                    <p className="text-gray-600 text-xs italic">
                      My note: Need to apply this to our user retention problem - what are the fundamental reasons people stop using our product?
                    </p>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-black py-3 rounded-lg font-bold transition-colors">
                  Add New Note
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reading Stats */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-black mb-4">Reading Progress</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-black mb-1">{readingProgress}%</div>
                  <div className="text-gray-600 text-sm">Complete</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Pages Read</span>
                    <span className="text-black font-bold">{completedPages} / {totalPages}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Time Spent</span>
                    <span className="text-black font-bold">4.5 hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="text-black font-bold">{playbook.successRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-bold transition-colors">
                  Continue Reading
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-black py-3 rounded-lg font-bold transition-colors">
                  Download for Offline
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-black py-3 rounded-lg font-bold transition-colors">
                  Add to Reading List
                </button>
              </div>
            </div>

            {/* Related Books */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-black mb-4">Readers Also Enjoyed</h3>
              <div className="space-y-3">
                {[
                  { title: 'Naval\'s Wealth Secrets', author: 'Naval Ravikant', rating: 4.9, match: '94%' },
                  { title: 'Tim Cook\'s Leadership', author: 'Tim Cook', rating: 4.7, match: '87%' },
                  { title: 'Serena\'s Mental Game', author: 'Serena Williams', rating: 4.9, match: '82%' }
                ].map((book, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-black font-bold text-sm">{book.title}</h4>
                      <span className="text-green-600 text-xs font-bold">{book.match}</span>
                    </div>
                    <p className="text-gray-600 text-xs mb-2">{book.author}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-black" />
                      <span className="text-black text-xs font-bold">{book.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybookDetail;