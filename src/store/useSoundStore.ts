import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SoundStore {
  favorites: string[];
  playCount: number;
  toggleFavorite: (soundId: string) => void;
  isFavorite: (soundId: string) => boolean;
  incrementPlayCount: () => void;
}

export const useSoundStore = create<SoundStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      playCount: 0,
      
      toggleFavorite: (soundId: string) => {
        const { favorites } = get();
        if (favorites.includes(soundId)) {
          set({ favorites: favorites.filter(id => id !== soundId) });
        } else {
          set({ favorites: [...favorites, soundId] });
        }
      },
      
      isFavorite: (soundId: string) => {
        return get().favorites.includes(soundId);
      },
      
      incrementPlayCount: () => {
        set({ playCount: get().playCount + 1 });
      },
    }),
    {
      name: 'meme-soundboard-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
