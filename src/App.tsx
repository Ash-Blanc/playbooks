import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlaybookGrid from './components/PlaybookGrid';
import PlaybookDetail from './components/PlaybookDetail';
import Dashboard from './components/Dashboard';
import SuccessPlaybooks from './components/SuccessPlaybooks';
import UserAccount from './components/UserAccount';
import { EnhancedAuthModal } from './components/EnhancedAuthModal';
import { PlayBook, UserProgress } from './types';
import { useAuth } from './contexts/AuthContext';

const mockPlaybooks: PlayBook[] = [
  {
    id: '1',
    title: 'Elon\'s Decision Engine',
    subtitle: 'First Principles Thinking System',
    description: 'The exact decision-making framework that built Tesla and SpaceX. Step-by-step process for breaking down complex problems and building solutions from fundamental truths.',
    category: 'Decision Making',
    difficulty: 'Expert',
    duration: '12 weeks',
    completionRate: 23,
    successRate: 67,
    image: 'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=600',
    modules: 12,
    enrolled: 3200,
    author: 'Elon Musk',
    authorCredentials: ['CEO Tesla', 'CEO SpaceX', 'Founder PayPal'],
    verificationStatus: 'Verified',
    lastUpdated: '2024-03-01',
    tags: ['First Principles', 'Innovation', 'Decision Making'],
    rating: 4.8,
    reviews: 847,
    timeToComplete: '3 months',
    nextSession: 'Problem Deconstruction',
    progress: 0
  },
  {
    id: '2',
    title: 'Naval\'s Wealth Machine',
    subtitle: 'Building Wealth Without Luck',
    description: 'The systematic approach to wealth creation through leverage, judgment, and accountability. Real frameworks behind sustainable wealth building.',
    category: 'Wealth',
    difficulty: 'Advanced',
    duration: '8 weeks',
    completionRate: 34,
    successRate: 78,
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600',
    modules: 8,
    enrolled: 8200,
    author: 'Naval Ravikant',
    authorCredentials: ['AngelList Founder', '200+ Investments', 'Philosophy Leader'],
    verificationStatus: 'Verified',
    lastUpdated: '2024-02-15',
    tags: ['Wealth', 'Leverage', 'Judgment'],
    rating: 4.9,
    reviews: 1521,
    timeToComplete: '2 months',
    nextSession: 'Building Leverage',
    progress: 0
  },
  {
    id: '3',
    title: 'Bezos\' Customer Obsession',
    subtitle: 'Building Customer-Centric Systems',
    description: 'The operational framework that built Amazon. How to systematically prioritize customers and build long-term competitive advantages.',
    category: 'Business Strategy',
    difficulty: 'Advanced',
    duration: '10 weeks',
    completionRate: 41,
    successRate: 82,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
    modules: 10,
    enrolled: 5800,
    author: 'Jeff Bezos',
    authorCredentials: ['Amazon Founder', 'Blue Origin', 'World\'s Richest'],
    verificationStatus: 'Verified',
    lastUpdated: '2024-02-28',
    tags: ['Customer Focus', 'Operations', 'Strategy'],
    rating: 4.7,
    reviews: 892,
    timeToComplete: '2.5 months',
    nextSession: 'Customer Metrics',
    progress: 0
  },
  {
    id: '4',
    title: 'Thiel\'s Contrarian Thinking',
    subtitle: 'Zero to One Methodology',
    description: 'How to think independently and build monopolies. The contrarian approach to innovation and business building.',
    category: 'Innovation',
    difficulty: 'Expert',
    duration: '6 weeks',
    completionRate: 67,
    successRate: 89,
    image: 'https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=600',
    modules: 6,
    enrolled: 12600,
    author: 'Peter Thiel',
    authorCredentials: ['PayPal Co-founder', 'Palantir', 'Founders Fund'],
    verificationStatus: 'Verified',
    lastUpdated: '2024-03-05',
    tags: ['Contrarian', 'Monopoly', 'Innovation'],
    rating: 4.9,
    reviews: 2156,
    timeToComplete: '1.5 months',
    nextSession: 'Monopoly Theory',
    progress: 0
  }
];

const mockUserProgress: UserProgress = {
  totalPlaybooks: 12,
  completedPlaybooks: 2,
  currentStreak: 23,
  totalHours: 156,
  level: 8,
  xp: 2350,
  nextLevelXp: 3000,
  achievements: ['First Playbook', 'Reality Check Survivor', 'Evidence Collector'],
  verifiedOutcomes: [],
  currentAssessments: []
};

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedPlaybook, setSelectedPlaybook] = useState<PlayBook | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { user } = useAuth();

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const renderContent = () => {
    if (selectedPlaybook) {
      return (
        <PlaybookDetail
          playbook={selectedPlaybook}
          onBack={() => setSelectedPlaybook(null)}
        />
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <ProtectedRoute>
            <Dashboard userProgress={mockUserProgress} />
          </ProtectedRoute>
        );
      case 'playbooks':
        return <SuccessPlaybooks playbooks={mockPlaybooks} onPlaybookSelect={setSelectedPlaybook} />;
      case 'account':
        return (
          <ProtectedRoute>
            <UserAccount />
          </ProtectedRoute>
        );
      default:
        return (
          <>
            <Hero />
            <PlaybookGrid 
              playbooks={mockPlaybooks} 
              onPlaybookSelect={setSelectedPlaybook}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {!selectedPlaybook && (
        <Navbar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          isAuthenticated={!!user}
          onAuthClick={handleAuthClick}
        />
      )}
      {renderContent()}
      
      <EnhancedAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;