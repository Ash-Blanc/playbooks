import React, { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, Brain, Target, Award, Play, Lock, TrendingUp } from 'lucide-react';
import { Assessment, AssessmentQuestion } from '../types';

const AssessmentCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const assessments: Assessment[] = [
    {
      id: '1',
      title: 'Leadership Readiness Assessment',
      type: 'readiness',
      questions: [
        {
          id: '1',
          question: 'You discover a critical project is 3 weeks behind schedule. Your immediate response is:',
          type: 'scenario',
          options: [
            'Call an emergency team meeting to assign blame',
            'Analyze the root cause and develop a recovery plan',
            'Inform stakeholders about the delay immediately',
            'Work overtime personally to catch up'
          ],
          correctAnswer: 'Analyze the root cause and develop a recovery plan',
          explanation: 'Effective leaders focus on solutions rather than blame, gathering data before making decisions.',
          weight: 3
        },
        {
          id: '2',
          question: 'How many people have you directly managed in your career?',
          type: 'multiple-choice',
          options: [
            '0 people',
            '1-5 people',
            '6-15 people',
            '16+ people'
          ],
          correctAnswer: '6-15 people',
          explanation: 'Tim Cook\'s framework requires experience managing medium-sized teams to understand scalability challenges.',
          weight: 2
        },
        {
          id: '3',
          question: 'Describe a time when you had to make a decision with incomplete information. What was your process?',
          type: 'practical',
          explanation: 'This assesses decision-making frameworks and comfort with uncertainty.',
          weight: 4
        }
      ],
      passingScore: 70,
      retakePolicy: 'Once per month',
      validityPeriod: '6 months'
    },
    {
      id: '2',
      title: 'First Principles Thinking Capability',
      type: 'capability',
      questions: [
        {
          id: '1',
          question: 'Break down the problem: "Our app has low user retention." What are the fundamental components?',
          type: 'practical',
          explanation: 'Tests ability to deconstruct complex problems into basic elements.',
          weight: 5
        },
        {
          id: '2',
          question: 'When faced with industry "best practices," your approach is typically:',
          type: 'multiple-choice',
          options: [
            'Follow them exactly as they\'re proven to work',
            'Question their underlying assumptions first',
            'Adapt them to our specific situation',
            'Ignore them and create our own approach'
          ],
          correctAnswer: 'Question their underlying assumptions first',
          explanation: 'First principles thinking requires questioning all assumptions, even widely accepted ones.',
          weight: 3
        }
      ],
      passingScore: 80,
      retakePolicy: 'Once per week',
      validityPeriod: '3 months'
    },
    {
      id: '3',
      title: 'Wealth Building Mindset Assessment',
      type: 'readiness',
      questions: [
        {
          id: '1',
          question: 'Your current investment knowledge level is:',
          type: 'multiple-choice',
          options: [
            'Beginner - savings accounts only',
            'Basic - some stocks and bonds',
            'Intermediate - diversified portfolio',
            'Advanced - complex strategies'
          ],
          correctAnswer: 'Intermediate - diversified portfolio',
          explanation: 'Naval\'s framework requires foundational investment knowledge to implement effectively.',
          weight: 2
        },
        {
          id: '2',
          question: 'You have $10,000 to invest. Market analysis suggests a 30% chance of 200% returns, 70% chance of 50% loss. Your decision:',
          type: 'scenario',
          options: [
            'Invest the full amount - high risk, high reward',
            'Invest 50% - balanced approach',
            'Invest 10% - minimal risk exposure',
            'Don\'t invest - too risky'
          ],
          correctAnswer: 'Invest 10% - minimal risk exposure',
          explanation: 'Wealth building requires understanding position sizing and risk management.',
          weight: 4
        }
      ],
      passingScore: 75,
      retakePolicy: 'Once per month',
      validityPeriod: '6 months'
    }
  ];

  const userAssessmentHistory = [
    {
      id: '1',
      assessmentId: '3',
      title: 'Wealth Building Mindset Assessment',
      completedDate: '2024-03-10',
      score: 85,
      passed: true,
      validUntil: '2024-09-10',
      attempts: 1
    },
    {
      id: '2',
      assessmentId: '1',
      title: 'Leadership Readiness Assessment',
      completedDate: '2024-03-05',
      score: 65,
      passed: false,
      nextAttempt: '2024-04-05',
      attempts: 2
    }
  ];

  const handleStartAssessment = (assessment: Assessment) => {
    setCurrentAssessment(assessment);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setAssessmentComplete(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (!currentAssessment) return;
    
    const currentQuestion = currentAssessment.questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer
    });
  };

  const handleNextQuestion = () => {
    if (!currentAssessment) return;
    
    if (currentQuestionIndex < currentAssessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete
      setAssessmentComplete(true);
    }
  };

  const calculateScore = () => {
    if (!currentAssessment) return 0;
    
    let totalWeight = 0;
    let earnedPoints = 0;
    
    currentAssessment.questions.forEach(question => {
      totalWeight += question.weight;
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        earnedPoints += question.weight;
      }
    });
    
    return Math.round((earnedPoints / totalWeight) * 100);
  };

  const getAssessmentTypeColor = (type: string) => {
    switch (type) {
      case 'capability': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'readiness': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'progress': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'outcome': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getAssessmentIcon = (type: string) => {
    switch (type) {
      case 'capability': return Brain;
      case 'readiness': return CheckCircle;
      case 'progress': return TrendingUp;
      case 'outcome': return Award;
      default: return Target;
    }
  };

  if (currentAssessment && !assessmentComplete) {
    const currentQuestion = currentAssessment.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100;

    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{currentAssessment.title}</h2>
              <p className="text-gray-400">Question {currentQuestionIndex + 1} of {currentAssessment.questions.length}</p>
            </div>
            <button
              onClick={() => setCurrentAssessment(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">{currentQuestion.question}</h3>
              
              {currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'scenario' ? (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        answers[currentQuestion.id] === option
                          ? 'bg-purple-500/20 border-purple-500/50 text-white'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          answers[currentQuestion.id] === option
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-400'
                        }`}>
                          {answers[currentQuestion.id] === option && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <textarea
                  placeholder="Provide a detailed response..."
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 h-32 resize-none"
                />
              )}
            </div>

            {/* Question Info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 text-sm">
                <strong>Weight:</strong> {currentQuestion.weight} points | 
                <strong> Type:</strong> {currentQuestion.type.replace('-', ' ')}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <button
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestion.id]}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestionIndex === currentAssessment.questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (assessmentComplete && currentAssessment) {
    const score = calculateScore();
    const passed = score >= currentAssessment.passingScore;

    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            passed ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
          }`}>
            {passed ? (
              <CheckCircle className="h-10 w-10 text-green-400" />
            ) : (
              <AlertTriangle className="h-10 w-10 text-red-400" />
            )}
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Assessment Complete</h2>
          <p className="text-gray-300 mb-6">{currentAssessment.title}</p>

          <div className="bg-white/5 rounded-lg p-6 border border-white/10 mb-6">
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-white mb-2">{score}%</p>
              <p className="text-gray-400">Your Score</p>
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="text-gray-400">Passing Score:</span>
              <span className="text-white">{currentAssessment.passingScore}%</span>
              <span className={passed ? 'text-green-400' : 'text-red-400'}>
                {passed ? '✓ PASSED' : '✗ FAILED'}
              </span>
            </div>
          </div>

          {passed ? (
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-medium">Congratulations! You're ready for this framework.</p>
                <p className="text-gray-300 text-sm mt-1">
                  Valid until: {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setCurrentAssessment(null)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue to Framework
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 font-medium">Additional preparation recommended.</p>
                <p className="text-gray-300 text-sm mt-1">
                  You can retake this assessment {currentAssessment.retakePolicy.toLowerCase()}
                </p>
              </div>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setCurrentAssessment(null)}
                  className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
                >
                  Review Materials
                </button>
                <button
                  onClick={() => handleStartAssessment(currentAssessment)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Assessment Center
        </h1>
        <p className="text-gray-300">Validate your readiness and track your capability development</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-lg border border-white/10">
        {[
          { id: 'available', label: 'Available Assessments', icon: Target },
          { id: 'history', label: 'My History', icon: Clock },
          { id: 'progress', label: 'Progress Tracking', icon: TrendingUp }
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

      {/* Available Assessments Tab */}
      {activeTab === 'available' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {assessments.map((assessment) => {
              const Icon = getAssessmentIcon(assessment.type);
              const userHistory = userAssessmentHistory.find(h => h.assessmentId === assessment.id);
              const canTake = !userHistory || !userHistory.passed || 
                (userHistory.nextAttempt && new Date(userHistory.nextAttempt) <= new Date());

              return (
                <div
                  key={assessment.id}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`p-3 rounded-full border ${getAssessmentTypeColor(assessment.type)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{assessment.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${getAssessmentTypeColor(assessment.type)}`}>
                        {assessment.type} Assessment
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Questions:</span>
                      <span className="text-white">{assessment.questions.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Passing Score:</span>
                      <span className="text-white">{assessment.passingScore}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Retake Policy:</span>
                      <span className="text-white">{assessment.retakePolicy}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Valid For:</span>
                      <span className="text-white">{assessment.validityPeriod}</span>
                    </div>
                  </div>

                  {userHistory && (
                    <div className={`p-3 rounded-lg border mb-4 ${
                      userHistory.passed 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${userHistory.passed ? 'text-green-400' : 'text-red-400'}`}>
                          Last Score: {userHistory.score}% ({userHistory.passed ? 'Passed' : 'Failed'})
                        </span>
                        <span className="text-gray-400 text-xs">
                          {userHistory.attempts} attempt{userHistory.attempts !== 1 ? 's' : ''}
                        </span>
                      </div>
                      {userHistory.validUntil && (
                        <p className="text-gray-400 text-xs mt-1">
                          Valid until: {userHistory.validUntil}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => canTake ? handleStartAssessment(assessment) : null}
                    disabled={!canTake}
                    className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                      canTake
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {canTake ? (
                      <>
                        <Play className="h-4 w-4" />
                        <span>Start Assessment</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        <span>
                          {userHistory?.nextAttempt 
                            ? `Available ${userHistory.nextAttempt}`
                            : 'Already Passed'
                          }
                        </span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Assessment History</h3>
            
            <div className="space-y-4">
              {userAssessmentHistory.map((history) => (
                <div
                  key={history.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{history.title}</h4>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        history.passed 
                          ? 'text-green-400 bg-green-500/20 border-green-500/30'
                          : 'text-red-400 bg-red-500/20 border-red-500/30'
                      }`}>
                        {history.passed ? 'Passed' : 'Failed'}
                      </span>
                      <span className="text-white font-bold">{history.score}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Completed: {history.completedDate}</span>
                    <span>Attempts: {history.attempts}</span>
                    {history.validUntil && (
                      <span>Valid until: {history.validUntil}</span>
                    )}
                    {history.nextAttempt && (
                      <span>Next attempt: {history.nextAttempt}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Tracking Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-white mb-1">3</p>
              <p className="text-blue-300 text-sm">Assessments Taken</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-white mb-1">1</p>
              <p className="text-green-300 text-sm">Passed</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-white mb-1">75%</p>
              <p className="text-purple-300 text-sm">Average Score</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-white mb-1">2</p>
              <p className="text-orange-300 text-sm">Frameworks Unlocked</p>
            </div>
          </div>

          {/* Capability Radar */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Capability Overview</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-3">Strengths</h4>
                <div className="space-y-2">
                  {[
                    { skill: 'Financial Literacy', level: 85 },
                    { skill: 'Risk Assessment', level: 78 },
                    { skill: 'Strategic Thinking', level: 72 }
                  ].map((strength) => (
                    <div key={strength.skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{strength.skill}</span>
                        <span className="text-white">{strength.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${strength.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3">Areas for Development</h4>
                <div className="space-y-2">
                  {[
                    { skill: 'Team Management', level: 45 },
                    { skill: 'First Principles Thinking', level: 38 },
                    { skill: 'Decision Speed', level: 52 }
                  ].map((area) => (
                    <div key={area.skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{area.skill}</span>
                        <span className="text-white">{area.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                          style={{ width: `${area.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentCenter;