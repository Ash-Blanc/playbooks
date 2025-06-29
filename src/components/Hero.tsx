import React from 'react';
import { ArrowRight, Crown, Users, Target } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-12">
          {/* Main Headline */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full">
              <Crown className="h-4 w-4" />
              <span className="text-sm font-bold tracking-wide">ELITE PLAYBOOKS</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight text-black">
              The Real
              <br />
              <span className="italic">Playbooks</span>
            </h1>
            
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Step inside the minds of the world's most successful, controversial, and contrarian thinkers. 
              <span className="text-black font-bold"> Get their actual systems.</span>
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto py-8 border-t border-b border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">47</div>
              <div className="text-gray-600 text-sm font-medium">Elite Minds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">156</div>
              <div className="text-gray-600 text-sm font-medium">Real Playbooks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-1">100%</div>
              <div className="text-gray-600 text-sm font-medium">Verified</div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <button className="group bg-black hover:bg-gray-800 text-white px-12 py-6 rounded-lg font-bold text-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-4 mx-auto">
              <span>Enter The Library</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-gray-500 text-sm">
              No courses. No motivation. Just the actual systems.
            </p>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Elon\'s Decision Engine',
              author: 'Elon Musk',
              type: 'Decision Framework',
              users: '3.2K'
            },
            {
              title: 'Naval\'s Wealth Machine',
              author: 'Naval Ravikant',
              type: 'Wealth System',
              users: '8.2K'
            },
            {
              title: 'Thiel\'s Contrarian Method',
              author: 'Peter Thiel',
              type: 'Innovation Process',
              users: '12.6K'
            }
          ].map((playbook, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-black transition-all duration-200 hover:shadow-lg group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center">
                    <Crown className="h-6 w-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">{playbook.users}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-black group-hover:text-gray-600 transition-colors">
                    {playbook.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{playbook.author}</p>
                  <p className="text-gray-500 text-xs mt-1">{playbook.type}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-black font-bold text-sm">View Playbook</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;