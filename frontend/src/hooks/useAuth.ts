import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { user, isAuthenticated, isLoading, fetchUser, logout, setAuth } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, isAuthenticated, isLoading, logout, setAuth };
}
