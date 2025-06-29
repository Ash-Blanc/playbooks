import React from 'react';
import { AlertTriangle, Eye, Target, TrendingDown, Users, Shield } from 'lucide-react';

const ContrarianHero: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-white">
      {/* Subtle Warning Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M20 20l-10-10h20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Contrarian Content */}
          <div className="space-y-8">
            {/* Warning Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg border border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-bold tracking-wide">UNCOMFORTABLE TRUTHS AHEAD</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-black">
                Why
                <br />
                <span className="italic relative">
                  Most Advice
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-500 opacity-60"></div>
                </span>
                <br />
                <span className="text-red-600">Fails</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                Learn from verified failures, hidden costs, and uncomfortable realities. 
                <span className="font-bold text-black"> No motivational BS.</span> Just what actually works—and why it usually doesn't.
              </p>
            </div>

            {/* Reality Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">90%</div>
                <div className="text-gray-600 text-sm font-medium">Strategies Fail</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-1">$50K+</div>
                <div className="text-gray-600 text-sm font-medium">Hidden Costs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-1">100%</div>
                <div className="text-gray-600 text-sm font-medium">Verified</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group bg-black hover:bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl">
                <Eye className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>See The Truth</span>
              </button>
              
              <button className="bg-white border-2 border-black text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Why I'll Fail</span>
              </button>
            </div>

            {/* Anti-Social Proof */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-3">Rejected by:</p>
              <div className="flex items-center space-x-8 text-gray-400">
                <span className="font-bold line-through">MOTIVATIONAL GURUS</span>
                <span className="font-bold line-through">SUCCESS COACHES</span>
                <span className="font-bold line-through">FEEL-GOOD CONTENT</span>
              </div>
            </div>
          </div>

          {/* Right Column - Failure Analysis Preview */}
          <div className="relative">
            {/* Main Failure Report */}
            <div className="bg-white border-2 border-red-200 rounded-2xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="bg-red-600 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-sm font-bold">FAILURE ANALYSIS</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingDown className="h-4 w-4 text-white" />
                    <span className="text-sm font-bold">77% Fail</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">"Follow Your Passion" Strategy</h3>
                <p className="text-red-100 text-sm">Why 8 out of 10 passion projects fail</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Hidden Cost: Living expenses</span>
                    <span className="text-red-600 font-bold">$45K/year</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Time to profitability</span>
                    <span className="text-red-600 font-bold">3-5 years</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Relationship strain rate</span>
                    <span className="text-red-600 font-bold">68%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Mental health impact</span>
                    <span className="text-red-600 font-bold">High</span>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="text-red-800 font-bold text-sm mb-1">Why It Usually Fails:</h4>
                  <ul className="text-red-700 text-xs space-y-1">
                    <li>• Passion ≠ Market demand</li>
                    <li>• Underestimated financial runway</li>
                    <li>• Lack of business skills</li>
                    <li>• Timing and luck factors</li>
                  </ul>
                </div>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>See Full Analysis</span>
                </button>
              </div>
            </div>

            {/* Floating Reality Checks */}
            <div className="absolute -top-4 -left-4 bg-white border-2 border-orange-200 rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-orange-800 font-bold text-sm">Reality Check</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-black text-white rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="font-bold text-sm">Verified Failure Data</span>
              </div>
            </div>

            {/* Background Elements */}
            <div className="absolute -z-10 top-8 -right-8 bg-red-50 border border-red-200 rounded-xl w-64 h-80 transform rotate-6 opacity-60"></div>
            <div className="absolute -z-20 top-16 -right-16 bg-gray-50 border border-gray-200 rounded-xl w-64 h-80 transform rotate-12 opacity-40"></div>
          </div>
        </div>

        {/* Bottom Section - What We're Not */}
        <div className="mt-20 bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-black">What This Platform Is NOT</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-red-500 text-4xl mb-2">❌</div>
                <h4 className="font-bold text-black mb-2">Motivational Content</h4>
                <p className="text-gray-600 text-sm">No "you can do it" cheerleading or inspirational quotes</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-red-500 text-4xl mb-2">❌</div>
                <h4 className="font-bold text-black mb-2">Success Porn</h4>
                <p className="text-gray-600 text-sm">No cherry-picked winner stories without context</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-red-500 text-4xl mb-2">❌</div>
                <h4 className="font-bold text-black mb-2">Generic Advice</h4>
                <p className="text-gray-600 text-sm">No "work hard and believe in yourself" platitudes</p>
              </div>
            </div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Instead, we show you the uncomfortable realities, hidden costs, and systematic reasons why most strategies fail—
              so you can make informed decisions with your eyes wide open.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContrarianHero;