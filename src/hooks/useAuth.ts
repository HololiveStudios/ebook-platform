import { useAppContext } from '@/contexts/AppContext';

export const useAuth = () => {
  const { user, login, register, logout, loading, error } = useAppContext();

  return {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
    error
  };
};