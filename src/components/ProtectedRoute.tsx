import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { LoadingSpinner } from './LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to access this content and continue your journey.</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
            <p className="text-gray-500 text-sm">
              Don't have an account? Sign up to get started.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}