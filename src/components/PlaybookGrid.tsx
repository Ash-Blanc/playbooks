import React from 'react';
import { Crown, Users, ArrowRight, Target } from 'lucide-react';
import { PlayBook } from '../types';

interface PlaybookGridProps {
  playbooks: PlayBook[];
  onPlaybookSelect?: (playbook: PlayBook) => void;
}

const PlaybookGrid: React.FC<PlaybookGridProps> = ({ playbooks, onPlaybookSelect }) => {
  const handlePlaybookClick = (playbook: PlayBook) => {
    if (onPlaybookSelect) {
      onPlaybookSelect(playbook);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6 text-black">
          The Collection
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Real playbooks from the world's most successful minds. 
          No theory—just the actual systems they use.
        </p>
      </div>

      {/* Playbook Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {playbooks.map((playbook, index) => (
          <div
            key={playbook.id}
            className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-black transition-all duration-300 hover:shadow-xl cursor-pointer"
            onClick={() => handlePlaybookClick(playbook)}
          >
            {/* Header */}
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img
                src={playbook.image}
                alt={playbook.title}
                className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Top Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-black text-white px-3 py-1 rounded-full">
                  <span className="text-sm font-bold">{playbook.category.toUpperCase()}</span>
                </div>
              </div>

              {/* Success Rate */}
              <div className="absolute top-6 right-6">
                <div className="bg-white text-black px-3 py-1 rounded-full border border-gray-200">
                  <span className="text-sm font-bold">{playbook.successRate}% Success</span>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-black">{playbook.title}</h3>
                    <Crown className="h-5 w-5 text-black" />
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{playbook.subtitle}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">{playbook.author}</span>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{(playbook.enrolled / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <p className="text-gray-700 leading-relaxed">{playbook.description}</p>

              {/* Credentials */}
              <div>
                <p className="text-gray-500 text-sm mb-2">Credentials:</p>
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

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-black">{playbook.modules}</div>
                  <div className="text-gray-600 text-sm">Systems</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-black">{playbook.timeToComplete}</div>
                  <div className="text-gray-600 text-sm">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-black">{playbook.rating}</div>
                  <div className="text-gray-600 text-sm">Rating</div>
                </div>
              </div>

              {/* Action */}
              <button className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-lg font-bold transition-all duration-200 flex items-center justify-center space-x-3 group">
                <span>Access Playbook</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="mt-20 bg-gray-50 border-2 border-gray-200 rounded-2xl p-12 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full">
            <Target className="h-4 w-4" />
            <span className="text-sm font-bold">COMING SOON</span>
          </div>
          <h3 className="text-3xl font-bold text-black">More Elite Minds</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Warren Buffett's Investment System • Jobs' Product Philosophy • 
            Dalio's Principles Engine • Gates' Learning Framework
          </p>
          <button className="bg-gray-200 hover:bg-gray-300 text-black px-8 py-3 rounded-lg font-bold transition-colors">
            Join Waitlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlaybookGrid;