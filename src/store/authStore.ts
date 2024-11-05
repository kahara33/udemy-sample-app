import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Credentials } from '../types';

interface AuthState {
  credentials: Credentials | null;
  setCredentials: (creds: Credentials) => void;
  clearCredentials: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      credentials: null,
      setCredentials: (creds) => set({ credentials: creds }),
      clearCredentials: () => set({ credentials: null }),
    }),
    {
      name: 'udemy-auth-storage',
      partialize: (state) => ({ credentials: state.credentials }),
    }
  )
);