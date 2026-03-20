import { create } from 'zustand';
import type { User } from '../types';
import api from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('verdoq_token'),
  isLoading: true,
  isAuthenticated: false,

  setAuth: (user, token) => {
    localStorage.setItem('verdoq_token', token);
    set({ user, token, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('verdoq_token');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },

  fetchUser: async () => {
    const token = localStorage.getItem('verdoq_token');
    if (!token) {
      set({ isLoading: false, isAuthenticated: false });
      return;
    }
    try {
      const { data } = await api.get('/api/auth/me');
      set({ user: data.data, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('verdoq_token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));
