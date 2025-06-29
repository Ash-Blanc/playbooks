import React from 'react';
import { AlertTriangle, TrendingDown, DollarSign, Clock, Users, Eye, Target } from 'lucide-react';

interface FailureCase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  failureRate: number;
  hiddenCosts: string;
  timeToReality: string;
  commonFailures: string[];
  image: string;
  category: string;
  verified: boolean;
  realStories: number;
}

interface FailureGridProps {
  failureCases: FailureCase[];
  onCaseSelect?: (failureCase: FailureCase) => void;
}

const FailureGrid: React.FC<FailureGridProps> = ({ failureCases, onCaseSelect }) => {
  const getFailureColor = (rate: number) => {
    if (rate >= 80) return 'text-red-600 bg-red-50 border-red-200';
    if (rate >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (rate >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const handleCaseClick = (failureCase: FailureCase) => {
    if (onCaseSelect) {
      onCaseSelect(failureCase);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-bold tracking-wide">FAILURE ANALYSIS LIBRARY</span>
        </div>
        <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-black">
          Learn From
          <br />
          <span className="italic text-red-600">What Doesn't Work</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Verified failure cases with real data on costs, timelines, and why smart people 
          keep making the same mistakes. No success bias—just uncomfortable reality.
        </p>
      </div>

      {/* Featured Failure Case */}
      <div className="mb-16 bg-gradient-to-r from-red-50 to-white border-2 border-red-200 rounded-2xl p-8 hover:border-red-400 transition-all duration-300">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 text-white px-3 py-1 rounded-full">
                <span className="text-sm font-bold">HIGHEST FAILURE RATE</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="text-red-600 font-bold">87% Fail</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-black mb-2">The "Quit Your Job" Trap</h3>
              <p className="text-lg text-gray-600 mb-4">Why following your passion usually leads to financial ruin</p>
              <p className="text-gray-700 leading-relaxed">
                Detailed analysis of 1,247 people who quit stable jobs to "follow their dreams." 
                Includes real financial data, relationship impacts, and the psychological toll of entrepreneurial failure.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">87%</div>
                <div className="text-gray-600 text-sm">Failure Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">$67K</div>
                <div className="text-gray-600 text-sm">Avg. Loss</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">2.3yr</div>
                <div className="text-gray-600 text-sm">To Failure</div>
              </div>
            </div>

            <button 
              onClick={() => handleCaseClick(failureCases[0])}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center space-x-3 group"
            >
              <Eye className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>See Full Failure Analysis</span>
            </button>
          </div>

          <div className="relative">
            <div className="bg-white border-2 border-red-200 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-red-600 text-white p-4">
                <h4 className="font-bold">Common Failure Timeline</h4>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Month 1-3: Honeymoon phase</span>
                  <span className="text-green-600">✓ Optimistic</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Month 4-8: Reality hits</span>
                  <span className="text-orange-600">⚠ Struggling</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Month 9-18: Desperation</span>
                  <span className="text-red-600">✗ Failing</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Month 19-28: Acceptance</span>
                  <span className="text-red-600">✗ Back to job</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Failure Cases Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {failureCases.slice(1).map((failureCase, index) => (
          <div
            key={failureCase.id}
            className="group bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-red-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleCaseClick(failureCase)}
          >
            {/* Failure Rate Header */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-red-50 to-gray-100">
              <img
                src={failureCase.image}
                alt={failureCase.title}
                className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Failure Rate Badge */}
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getFailureColor(failureCase.failureRate)}`}>
                  {failureCase.failureRate}% FAIL
                </div>
              </div>

              {/* Verified Badge */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 bg-black text-white rounded-full px-2 py-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span className="text-xs font-bold">VERIFIED</span>
                </div>
              </div>

              {/* Cost Warning */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-red-600/90 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Hidden Cost</span>
                    <span className="font-bold">{failureCase.hiddenCosts}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Time to Reality</span>
                    <span className="font-bold">{failureCase.timeToReality}</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-red-600 text-white rounded-full p-3">
                  <Eye className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-black mb-1 group-hover:text-red-600 transition-colors">
                  {failureCase.title}
                </h3>
                <p className="text-red-600 font-medium text-sm mb-3">{failureCase.subtitle}</p>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{failureCase.description}</p>
              </div>

              {/* Failure Points Preview */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="text-red-800 font-bold text-sm mb-2">Top Failure Points:</h4>
                <div className="space-y-1">
                  {failureCase.commonFailures.slice(0, 2).map((failure, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs text-red-700">
                      <TrendingDown className="h-3 w-3" />
                      <span>{failure}</span>
                    </div>
                  ))}
                  {failureCase.commonFailures.length > 2 && (
                    <div className="text-xs text-red-600 font-medium">
                      +{failureCase.commonFailures.length - 2} more failure points
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-1 text-sm">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">{failureCase.realStories} cases</span>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Target className="h-4 w-4 text-red-600" />
                  <span className="text-gray-700">{failureCase.category}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2 group">
                <span>Analyze Failures</span>
                <Eye className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reality Check CTA */}
      <div className="mt-16 bg-black text-white rounded-2xl p-8 text-center">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-red-400" />
            <h3 className="text-2xl font-bold">Ready for Uncomfortable Truth?</h3>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Most success advice ignores the 90% who fail. We document the real costs, 
            hidden requirements, and systematic reasons why smart people keep failing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              See All Failure Cases
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              Submit Your Failure
            </button>
          </div>
        </div>
      </div>

      {/* Anti-Motivational Quote */}
      <div className="mt-16 border-2 border-gray-200 rounded-2xl p-8">
        <div className="text-center space-y-6">
          <div className="text-6xl text-gray-400 mb-4">"</div>
          <blockquote className="text-2xl font-bold text-black italic">
            Success is not about positive thinking. It's about negative preparation.
          </blockquote>
          <p className="text-gray-600">
            — Understanding what kills dreams before they kill you
          </p>
        </div>
      </div>
    </section>
  );
};

export default FailureGrid;