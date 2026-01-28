/**
 * Sound definitions for Meme Soundboard
 */

import { type SoundTint } from './theme';

// =============================================================================
// TYPES
// =============================================================================

export interface MemeSound {
  id: string;
  name: string;
  icon: string;
  category: CategoryId;
  tint: SoundTint;
  url: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}

export type CategoryId = 'all' | 'classic' | 'music' | 'gaming' | 'reactions' | 'tv' | 'misc';

// =============================================================================
// CONFIG
// =============================================================================

// TODO: Replace with real CDN (Cloudinary, S3, Firebase Storage)
const SOUND_BASE = 'https://example.com/sounds';

// =============================================================================
// CATEGORIES
// =============================================================================

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: '🔊' },
  { id: 'classic', name: 'Classic', icon: '😂' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'reactions', name: 'Reactions', icon: '🗣️' },
  { id: 'tv', name: 'TV/Movies', icon: '📺' },
  { id: 'misc', name: 'Random', icon: '🎲' },
];

// =============================================================================
// SOUNDS
// =============================================================================

const createSound = (
  id: string,
  name: string,
  icon: string,
  category: CategoryId,
  tint: SoundTint
): MemeSound => ({
  id,
  name,
  icon,
  category,
  tint,
  url: `${SOUND_BASE}/${id}.mp3`,
});

export const SOUNDS: MemeSound[] = [
  // 😂 Classic Memes
  createSound('bruh', 'Bruh', '😐', 'classic', 'purple'),
  createSound('oof', 'Oof', '💀', 'classic', 'rose'),
  createSound('vine-boom', 'Vine Boom', '💥', 'classic', 'blue'),
  createSound('emotional-damage', 'Emotional', '😭', 'classic', 'green'),
  createSound('sus', 'Sus', '🤨', 'classic', 'amber'),
  createSound('nope', 'Nope', '🙅', 'classic', 'cyan'),
  createSound('wow', 'Wow', '😮', 'classic', 'pink'),
  createSound('yeet', 'Yeet', '🚀', 'classic', 'violet'),

  // 🎵 Music/Effects
  createSound('airhorn', 'Airhorn', '📯', 'music', 'orange'),
  createSound('sad-violin', 'Sad Violin', '🎻', 'music', 'violet'),
  createSound('dun-dun', 'Dun Dun', '⚖️', 'music', 'green'),
  createSound('dramatic', 'Dramatic', '🎭', 'music', 'rose'),
  createSound('crickets', 'Crickets', '🦗', 'music', 'green'),
  createSound('rimshot', 'Ba Dum Tss', '🥁', 'music', 'amber'),
  createSound('sad-trombone', 'Sad Trombone', '🎺', 'music', 'purple'),
  createSound('mlg-horn', 'MLG Horn', '🔥', 'music', 'orange'),

  // 🎮 Gaming
  createSound('victory', 'Victory', '🏆', 'gaming', 'amber'),
  createSound('game-over', 'Game Over', '☠️', 'gaming', 'slate'),
  createSound('level-up', 'Level Up', '⬆️', 'gaming', 'green'),
  createSound('coin', 'Coin', '🪙', 'gaming', 'amber'),
  createSound('minecraft-oof', 'MC Oof', '⛏️', 'gaming', 'green'),
  createSound('headshot', 'Headshot', '🎯', 'gaming', 'rose'),
  createSound('among-us', 'Among Us', '🚀', 'gaming', 'orange'),
  createSound('roblox-oof', 'Roblox Oof', '🟥', 'gaming', 'rose'),

  // 🗣️ Reactions
  createSound('damn', 'Damn', '😳', 'reactions', 'pink'),
  createSound('sheesh', 'Sheesh', '🥶', 'reactions', 'cyan'),
  createSound('oh-no', 'Oh No', '😱', 'reactions', 'orange'),
  createSound('what', 'What?!', '❓', 'reactions', 'purple'),
  createSound('lets-go', "Let's Go!", '🎉', 'reactions', 'rose'),
  createSound('noice', 'Noice', '👌', 'reactions', 'blue'),
  createSound('ayo', 'Ayo?!', '🤔', 'reactions', 'amber'),
  createSound('bonk', 'Bonk', '🔨', 'reactions', 'rose'),

  // 📺 TV/Movies
  createSound('illuminati', 'Illuminati', '👁️', 'tv', 'violet'),
  createSound('to-be-continued', 'To Be Cont.', '➡️', 'tv', 'purple'),
  createSound('curb', 'Curb Theme', '📺', 'tv', 'blue'),
  createSound('directed-by', 'Directed By', '🎬', 'tv', 'slate'),
  createSound('surprised', 'Pikachu', '⚡', 'tv', 'amber'),
  createSound('hello-there', 'Hello There', '👋', 'tv', 'purple'),
  createSound('nooo', 'Noooo!', '😫', 'tv', 'rose'),
  createSound('run', 'Run', '🏃', 'tv', 'rose'),

  // 😂 Random/Misc
  createSound('fart', 'Fart', '💨', 'misc', 'slate'),
  createSound('burp', 'Burp', '🤢', 'misc', 'green'),
  createSound('slap', 'Slap', '👋', 'misc', 'amber'),
  createSound('punch', 'Punch', '👊', 'misc', 'rose'),
  createSound('explosion', 'Explosion', '💣', 'misc', 'orange'),
  createSound('laugh', 'Laugh Track', '😂', 'misc', 'amber'),
  createSound('scream', 'Scream', '😱', 'misc', 'slate'),
  createSound('fbi', 'FBI Open Up', '🚔', 'misc', 'blue'),
];
