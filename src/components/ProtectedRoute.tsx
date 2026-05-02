import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-10">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 px-8 py-7 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600"></div>
              <div className="absolute inset-1 animate-spin rounded-full border-2 border-transparent border-t-amber-500 [animation-direction:reverse]"></div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                Secure Session
              </p>
              <p className="text-base font-semibold text-slate-900">
                Dang khoi phuc phien lam viec...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
