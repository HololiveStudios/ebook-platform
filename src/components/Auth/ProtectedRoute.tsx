import React, { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/Common/LoadingSpinner';
import { AuthPage } from './AuthPage';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen text="Carregando..." />;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return <>{children}</>;
};