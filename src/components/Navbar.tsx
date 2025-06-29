import React, { useState } from 'react';
import { Crown, Search, User, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAuthenticated: boolean;
  onAuthClick: (mode: 'login' | 'signup') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection, isAuthenticated, onAuthClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Library' },
    { id: 'playbooks', label: 'Playbooks' },
    { id: 'dashboard', label: 'Progress' }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center">
              <Crown className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-black tracking-tight">Playbooks</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search minds, systems, frameworks..."
                className="w-full bg-gray-50/80 border-0 rounded-full px-10 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black/20 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-medium text-black">Level 8</p>
                </div>
                <button
                  onClick={() => setActiveSection('account')}
                  className={`w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors ${
                    activeSection === 'account' ? 'ring-2 ring-gray-300' : ''
                  }`}
                >
                  <User className="h-4 w-4 text-white" />
                </button>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => onAuthClick('login')}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onAuthClick('signup')}
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Get Access
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-10 py-3 text-sm text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Auth */}
              {!isAuthenticated && (
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      onAuthClick('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onAuthClick('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full bg-black text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Get Access
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;