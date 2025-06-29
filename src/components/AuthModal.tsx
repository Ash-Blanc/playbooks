import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Crown } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Auth submission:', { mode, formData });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Crown className="h-6 w-6" />
              <span className="text-lg font-bold">Playbooks</span>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join the Elite'}
            </h2>
            <p className="text-white/80">
              {mode === 'login' 
                ? 'Access your exclusive playbooks' 
                : 'Get insider access to proven frameworks'
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg pl-10 pr-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg pl-10 pr-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg pl-10 pr-12 py-3 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg pl-10 pr-4 py-3 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-black hover:text-gray-600 font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full bg-white border-2 border-gray-200 hover:border-black text-black py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <span>Continue with Google</span>
            </button>
            <button className="w-full bg-white border-2 border-gray-200 hover:border-black text-black py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <span>Continue with LinkedIn</span>
            </button>
          </div>

          {/* Mode Switch */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-black hover:text-gray-600 font-bold"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Terms */}
          {mode === 'signup' && (
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-xs">
                By creating an account, you agree to our{' '}
                <button className="text-black hover:text-gray-600 font-medium">Terms of Service</button>
                {' '}and{' '}
                <button className="text-black hover:text-gray-600 font-medium">Privacy Policy</button>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <span>🔒 Secure & Private</span>
            <span>•</span>
            <span>✓ 30-Day Guarantee</span>
            <span>•</span>
            <span>👥 10K+ Members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;