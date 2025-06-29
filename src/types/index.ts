export interface PlayBook {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  completionRate: number;
  successRate: number;
  image: string;
  modules: number;
  enrolled: number;
  author: string;
  authorCredentials: string[];
  verificationStatus: 'Verified' | 'Under Review' | 'Community Validated';
  lastUpdated: string;
  tags: string[];
  rating: number;
  reviews: number;
  timeToComplete: string;
  nextSession: string;
  progress: number;
}

export interface UserProgress {
  totalPlaybooks: number;
  completedPlaybooks: number;
  currentStreak: number;
  totalHours: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  achievements: string[];
  verifiedOutcomes: VerifiedOutcome[];
  currentAssessments: Assessment[];
}

export interface VerifiedOutcome {
  id: string;
  playbookId: string;
  outcome: string;
  evidence: string[];
  verificationDate: string;
  verifiedBy: string;
  impactScore: number;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'capability' | 'readiness' | 'progress' | 'outcome';
  questions: AssessmentQuestion[];
  passingScore: number;
  retakePolicy: string;
  validityPeriod: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'scenario' | 'practical' | 'evidence-based';
  options?: string[];
  correctAnswer?: string;
  explanation: string;
  weight: number;
}