import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, Upload, Eye, Clock, Award, FileText, Camera, Link } from 'lucide-react';

const VerificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('submit');

  const verificationRequests = [
    {
      id: '1',
      type: 'outcome',
      title: 'Revenue Growth Achievement',
      description: 'Increased company revenue by 340% using Naval\'s Wealth Framework',
      submittedBy: 'Sarah Chen',
      submissionDate: '2024-03-10',
      status: 'under-review',
      evidence: ['Financial statements', 'Board presentation', 'Third-party audit'],
      reviewerNotes: 'Awaiting independent verification from accounting firm',
      estimatedReview: '5-7 days'
    },
    {
      id: '2',
      type: 'framework',
      title: 'New Leadership Framework',
      description: 'Developed systematic approach to remote team management',
      submittedBy: 'Marcus Rodriguez',
      submissionDate: '2024-03-08',
      status: 'verified',
      evidence: ['Team performance data', 'Employee surveys', 'Productivity metrics'],
      verificationDate: '2024-03-12',
      verifiedBy: 'Dr. Emily Watson',
      impactScore: 9
    },
    {
      id: '3',
      type: 'credentials',
      title: 'Executive Coaching Certification',
      description: 'ICF Master Certified Coach with 500+ hours',
      submittedBy: 'Dr. Emily Watson',
      submissionDate: '2024-03-05',
      status: 'verified',
      evidence: ['ICF certificate', 'Client testimonials', 'Session logs'],
      verificationDate: '2024-03-07',
      verifiedBy: 'MasteryOS Verification Team',
      impactScore: 10
    }
  ];

  const verificationStandards = [
    {
      category: 'Outcome Verification',
      requirements: [
        'Quantifiable results with specific metrics',
        'Third-party validation or independent audit',
        'Before/after documentation with timestamps',
        'Methodology documentation showing framework application',
        'Minimum 6-month sustained results'
      ],
      evidenceTypes: ['Financial records', 'Performance data', 'Independent audits', 'Testimonials', 'Media coverage']
    },
    {
      category: 'Framework Validation',
      requirements: [
        'Documented step-by-step process',
        'Minimum 10 successful implementations',
        'Failure rate documentation and analysis',
        'Resource requirement specifications',
        'Reproducible results across different contexts'
      ],
      evidenceTypes: ['Process documentation', 'Case studies', 'User testimonials', 'Success/failure data', 'Video demonstrations']
    },
    {
      category: 'Credential Verification',
      requirements: [
        'Official certifications from recognized institutions',
        'Documented track record of achievements',
        'Professional references and endorsements',
        'Continuous education and skill updates',
        'Ethical standards compliance'
      ],
      evidenceTypes: ['Certificates', 'Diplomas', 'Professional licenses', 'Reference letters', 'Portfolio of work']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'under-review': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'rejected': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'pending': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'under-review': return Clock;
      case 'rejected': return AlertTriangle;
      default: return Shield;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Verification Center
        </h1>
        <p className="text-gray-300">Submit evidence, track verification status, and maintain credibility standards</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-lg border border-white/10">
        {[
          { id: 'submit', label: 'Submit Evidence', icon: Upload },
          { id: 'track', label: 'Track Status', icon: Eye },
          { id: 'standards', label: 'Standards', icon: Shield },
          { id: 'verified', label: 'Verified Results', icon: Award }
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

      {/* Submit Evidence Tab */}
      {activeTab === 'submit' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Submit for Verification</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center hover:border-green-500/50 transition-colors cursor-pointer">
                <Award className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Outcome Achievement</h4>
                <p className="text-green-300 text-sm mb-4">Submit measurable results from framework implementation</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Submit Outcome
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 text-center hover:border-blue-500/50 transition-colors cursor-pointer">
                <FileText className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Framework Validation</h4>
                <p className="text-blue-300 text-sm mb-4">Submit your own success framework for community validation</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Submit Framework
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                <Shield className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Credential Verification</h4>
                <p className="text-purple-300 text-sm mb-4">Verify professional credentials and achievements</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Submit Credentials
                </button>
              </div>
            </div>
          </div>

          {/* Evidence Upload Form */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Evidence Submission Form</h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Verification Type</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50">
                    <option>Outcome Achievement</option>
                    <option>Framework Validation</option>
                    <option>Credential Verification</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Related Framework</label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50">
                    <option>Elon Musk Framework</option>
                    <option>Naval's Wealth Code</option>
                    <option>Tim Cook's Leadership</option>
                    <option>Custom Framework</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Achievement Title</label>
                <input
                  type="text"
                  placeholder="Brief, specific description of your achievement"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Detailed Description</label>
                <textarea
                  placeholder="Provide comprehensive details about your implementation and results"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 h-32 resize-none"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Measurable Impact</label>
                  <input
                    type="text"
                    placeholder="e.g., 340% revenue increase"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>

              {/* Evidence Upload */}
              <div>
                <label className="block text-gray-400 text-sm mb-4">Supporting Evidence</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Upload Documents</p>
                    <p className="text-gray-500 text-xs">PDF, DOC, XLS files</p>
                  </div>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Upload Images</p>
                    <p className="text-gray-500 text-xs">Screenshots, photos</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">External Links</label>
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="Link to external verification (news articles, company reports, etc.)"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                  />
                  <input
                    type="url"
                    placeholder="Additional verification link"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <label className="text-gray-300 text-sm">
                  I certify that all information provided is accurate and I consent to independent verification
                </label>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Submit for Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Track Status Tab */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          {verificationRequests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);
            return (
              <div
                key={request.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{request.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(request.status)}`}>
                        <StatusIcon className="h-3 w-3 inline mr-1" />
                        {request.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{request.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>Submitted by {request.submittedBy}</span>
                      <span>•</span>
                      <span>{request.submissionDate}</span>
                      {request.type && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{request.type}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Evidence Submitted</h4>
                    <div className="space-y-1">
                      {request.evidence.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Review Status</h4>
                    {request.status === 'verified' ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span>Verified on {request.verificationDate}</span>
                        </div>
                        <p className="text-gray-300 text-sm">Verified by: {request.verifiedBy}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">Impact Score:</span>
                          <div className="flex space-x-1">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < (request.impactScore || 0) ? 'bg-yellow-400' : 'bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-yellow-400 text-sm">{request.impactScore}/10</span>
                        </div>
                      </div>
                    ) : request.status === 'under-review' ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-yellow-400">
                          <Clock className="h-4 w-4" />
                          <span>Under review</span>
                        </div>
                        <p className="text-gray-300 text-sm">{request.reviewerNotes}</p>
                        <p className="text-gray-400 text-sm">Estimated completion: {request.estimatedReview}</p>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">
                        Status: {request.status}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Standards Tab */}
      {activeTab === 'standards' && (
        <div className="space-y-6">
          {verificationStandards.map((standard, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">{standard.category}</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Requirements</h4>
                  <div className="space-y-2">
                    {standard.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">Accepted Evidence Types</h4>
                  <div className="space-y-2">
                    {standard.evidenceTypes.map((type, typeIndex) => (
                      <div key={typeIndex} className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300 text-sm">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Verification Process */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Verification Process</h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-blue-500/30">
                  <Upload className="h-8 w-8 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">1. Submit</h4>
                <p className="text-gray-400 text-sm">Upload evidence and documentation</p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-yellow-500/30">
                  <Eye className="h-8 w-8 text-yellow-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">2. Review</h4>
                <p className="text-gray-400 text-sm">Expert panel evaluates submission</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-purple-500/30">
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">3. Verify</h4>
                <p className="text-gray-400 text-sm">Independent validation process</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-green-500/30">
                  <Award className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">4. Certify</h4>
                <p className="text-gray-400 text-sm">Official verification badge awarded</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verified Results Tab */}
      {activeTab === 'verified' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-white mb-1">1,247</p>
              <p className="text-green-300 text-sm">Verified Outcomes</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-white mb-1">89%</p>
              <p className="text-blue-300 text-sm">Verification Rate</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 text-center">
              <p className="text-3xl font-bold text-white mb-1">$2.3B</p>
              <p className="text-purple-300 text-sm">Total Verified Impact</p>
            </div>
          </div>

          {/* Recent Verified Outcomes */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Recent Verified Outcomes</h3>
            
            <div className="space-y-4">
              {[
                {
                  title: 'Startup Valuation Increase',
                  description: 'Applied Elon\'s Framework to achieve $50M Series A',
                  impact: '2,400% valuation increase',
                  framework: 'Elon Musk Framework',
                  verifiedBy: 'Independent Auditor',
                  date: '2024-03-12'
                },
                {
                  title: 'Team Productivity Optimization',
                  description: 'Implemented Tim Cook\'s Leadership principles',
                  impact: '67% productivity improvement',
                  framework: 'Tim Cook Leadership',
                  verifiedBy: 'HR Analytics Firm',
                  date: '2024-03-10'
                },
                {
                  title: 'Investment Portfolio Growth',
                  description: 'Naval\'s wealth principles over 18 months',
                  impact: '156% portfolio growth',
                  framework: 'Naval\'s Wealth Code',
                  verifiedBy: 'Financial Advisor',
                  date: '2024-03-08'
                }
              ].map((outcome, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-green-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1">{outcome.title}</h4>
                      <p className="text-gray-300 text-sm mb-2">{outcome.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>Framework: {outcome.framework}</span>
                        <span>•</span>
                        <span>Verified by: {outcome.verifiedBy}</span>
                        <span>•</span>
                        <span>{outcome.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30 mb-2">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        Verified
                      </div>
                      <p className="text-green-400 font-semibold text-sm">{outcome.impact}</p>
                    </div>
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

export default VerificationCenter;