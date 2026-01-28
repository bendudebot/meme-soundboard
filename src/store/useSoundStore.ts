import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// =============================================================================
// TYPES
// =============================================================================

interface SoundStoreState {
  favorites: string[];
  playCount: number;
}

interface SoundStoreActions {
  toggleFavorite: (soundId: string) => void;
  isFavorite: (soundId: string) => boolean;
  incrementPlayCount: () => void;
  resetPlayCount: () => void;
}

type SoundStore = SoundStoreState & SoundStoreActions;

// =============================================================================
// STORE
// =============================================================================

const STORAGE_KEY = 'meme-soundboard-storage';

export const useSoundStore = create<SoundStore>()(
  persist(
    (set, get) => ({
      // State
      favorites: [],
      playCount: 0,

      // Actions
      toggleFavorite: (soundId) => {
        const { favorites } = get();
        const isFav = favorites.includes(soundId);

        set({
          favorites: isFav
            ? favorites.filter((id) => id !== soundId)
            : [...favorites, soundId],
        });
      },

      isFavorite: (soundId) => get().favorites.includes(soundId),

      incrementPlayCount: () => {
        set((state) => ({ playCount: state.playCount + 1 }));
      },

      resetPlayCount: () => {
        set({ playCount: 0 });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        playCount: state.playCount,
      }),
    }
  )
);
