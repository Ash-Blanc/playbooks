import React, { useState } from 'react';
import { Crown, Lock, Star, Clock, Users, BookOpen, Play, Bookmark, Share, Filter, Search, TrendingUp } from 'lucide-react';
import { PlayBook } from '../types';

interface SuccessPlaybooksProps {
  playbooks: PlayBook[];
  onPlaybookSelect?: (playbook: PlayBook) => void;
}

const SuccessPlaybooks: React.FC<SuccessPlaybooksProps> = ({ playbooks, onPlaybookSelect }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', label: 'All Playbooks', count: playbooks.length },
    { id: 'decision-making', label: 'Decision Making', count: 4 },
    { id: 'wealth', label: 'Wealth Building', count: 3 },
    { id: 'leadership', label: 'Leadership', count: 5 },
    { id: 'innovation', label: 'Innovation', count: 2 }
  ];

  const exclusivePlaybooks = [
    {
      id: 'bezos-customer',
      title: 'Bezos\' Customer Obsession Engine',
      subtitle: 'The Amazon Playbook for Customer-Centric Growth',
      author: 'Jeff Bezos',
      category: 'Business Strategy',
      exclusiveLevel: 'Founder Circle',
      memberPrice: 'Included',
      publicPrice: '$2,497',
      description: 'The complete operational framework behind Amazon\'s customer obsession. Includes decision trees, metrics systems, and the "working backwards" methodology.',
      insights: 47,
      implementations: 1200,
      successRate: 84,
      avgROI: '340%',
      timeToResults: '3-6 months',
      difficulty: 'Advanced',
      lastUpdated: '2 days ago',
      trending: true
    },
    {
      id: 'jobs-product',
      title: 'Jobs\' Product Intuition System',
      subtitle: 'Building Products People Didn\'t Know They Wanted',
      author: 'Steve Jobs',
      category: 'Product Strategy',
      exclusiveLevel: 'Elite Access',
      memberPrice: 'Included',
      publicPrice: '$3,997',
      description: 'The psychological and design principles behind the iPhone, iPad, and Mac. Includes user research methodologies and decision frameworks.',
      insights: 62,
      implementations: 890,
      successRate: 76,
      avgROI: '520%',
      timeToResults: '6-12 months',
      difficulty: 'Expert',
      lastUpdated: '1 week ago',
      trending: false
    }
  ];

  const handlePlaybookClick = (playbook: PlayBook) => {
    if (onPlaybookSelect) {
      onPlaybookSelect(playbook);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'Intermediate': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Advanced': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Expert': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getExclusivityColor = (level: string) => {
    switch (level) {
      case 'Founder Circle': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Elite Access': return 'text-black bg-gray-100 border-gray-300';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full mb-6">
          <Crown className="h-4 w-4" />
          <span className="text-sm font-bold tracking-wide">EXCLUSIVE PLAYBOOKS</span>
        </div>
        <h2 className="text-5xl lg:text-7xl font-bold mb-6 text-black">
          Battle-Tested
          <br />
          <span className="italic">Blueprints</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Get inside the minds of world-class founders and innovators. These aren't theories—
          they're the actual systems, frameworks, and decision-making processes that built empires.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-12 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search playbooks, founders, strategies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-10 py-3 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                List
              </button>
            </div>
            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filter</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Exclusive Playbooks Showcase */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-black mb-2">Founder Circle Exclusives</h3>
            <p className="text-gray-600">Premium playbooks from industry titans. Member-only access.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Member Savings</p>
            <p className="text-2xl font-bold text-green-600">$6,494</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {exclusivePlaybooks.map((playbook, index) => (
            <div
              key={playbook.id}
              className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-black hover:shadow-2xl transition-all duration-300"
            >
              {/* Exclusive Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getExclusivityColor(playbook.exclusiveLevel)}`}>
                  <Crown className="h-3 w-3 inline mr-1" />
                  {playbook.exclusiveLevel}
                </div>
              </div>

              {/* Trending Badge */}
              {playbook.trending && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    TRENDING
                  </div>
                </div>
              )}

              <div className="p-8 space-y-6">
                {/* Header */}
                <div>
                  <h4 className="text-2xl font-bold text-black mb-2 group-hover:text-gray-600 transition-colors">
                    {playbook.title}
                  </h4>
                  <p className="text-gray-600 mb-3">{playbook.subtitle}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-black font-bold">{playbook.author}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{playbook.category}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">Updated {playbook.lastUpdated}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">{playbook.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-black">{playbook.successRate}%</div>
                    <div className="text-gray-600 text-sm">Success Rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-black">{playbook.avgROI}</div>
                    <div className="text-gray-600 text-sm">Avg ROI</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-black">{playbook.insights}</div>
                    <div className="text-gray-600 text-sm">Insights</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-2xl font-bold text-black">{playbook.implementations}</div>
                    <div className="text-gray-600 text-sm">Implementations</div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-800 font-bold">Member Price</span>
                    <span className="text-green-600 font-bold text-lg">{playbook.memberPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Public Price</span>
                    <span className="text-gray-500 line-through">{playbook.publicPrice}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>Access Playbook</span>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-black p-3 rounded-lg transition-colors">
                    <Bookmark className="h-4 w-4" />
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-black p-3 rounded-lg transition-colors">
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regular Playbooks Grid */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-black">Core Collection</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{playbooks.length} playbooks</span>
            <span>•</span>
            <span>Updated weekly</span>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
          {playbooks.map((playbook, index) => (
            <div
              key={playbook.id}
              className={`group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer ${
                viewMode === 'list' ? 'flex items-center space-x-6 p-6' : ''
              }`}
              onClick={() => handlePlaybookClick(playbook)}
            >
              {viewMode === 'grid' ? (
                <>
                  {/* Grid View */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={playbook.image}
                      alt={playbook.title}
                      className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getDifficultyColor(playbook.difficulty)}`}>
                        {playbook.difficulty}
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
                        {playbook.successRate}% Success
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-700 font-medium">{playbook.author}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-black" />
                            <span className="text-black font-bold">{playbook.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{playbook.timeToComplete}</span>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{(playbook.enrolled / 1000).toFixed(1)}K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-black mb-1 group-hover:text-gray-600 transition-colors">
                        {playbook.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">{playbook.subtitle}</p>
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{playbook.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-black">{playbook.modules}</div>
                        <div className="text-gray-600 text-xs">Modules</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-black">{playbook.rating}</div>
                        <div className="text-gray-600 text-xs">Rating</div>
                      </div>
                    </div>

                    <button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-bold transition-colors">
                      Access Playbook
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* List View */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={playbook.image}
                      alt={playbook.title}
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-black group-hover:text-gray-600 transition-colors">
                          {playbook.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{playbook.subtitle}</p>
                        <p className="text-gray-500 text-sm">{playbook.author}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-4 w-4 text-black" />
                          <span className="text-black font-bold">{playbook.rating}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(playbook.difficulty)}`}>
                          {playbook.difficulty}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{playbook.modules} modules</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{playbook.timeToComplete}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{(playbook.enrolled / 1000).toFixed(1)}K enrolled</span>
                      </div>
                      <span className="text-green-600 font-bold">{playbook.successRate}% success</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="bg-gray-100 hover:bg-gray-200 text-black p-2 rounded-lg transition-colors">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                      Access
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Membership CTA */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-12 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
            <Crown className="h-4 w-4" />
            <span className="text-sm font-bold">EXCLUSIVE ACCESS</span>
          </div>
          <h3 className="text-4xl font-bold">Join the Founder Circle</h3>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Get unlimited access to all playbooks, exclusive founder interviews, 
            and direct implementation support. No courses, no fluff—just proven systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
              Start 7-Day Trial
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              View Pricing
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Cancel anytime • 30-day money-back guarantee • Used by 10,000+ founders
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessPlaybooks;