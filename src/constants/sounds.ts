/**
 * Sound definitions for Meme Soundboard
 */

// =============================================================================
// TYPES
// =============================================================================

export interface MemeSound {
  id: string;
  name: string;
  icon: string;
  category: CategoryId;
  gradient: readonly [string, string];
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

// Modern, muted gradients - premium feel
const GRADIENTS = {
  purple: ['#7C3AED', '#4F46E5'] as const,
  blue: ['#3B82F6', '#1D4ED8'] as const,
  cyan: ['#06B6D4', '#0891B2'] as const,
  green: ['#10B981', '#059669'] as const,
  amber: ['#F59E0B', '#D97706'] as const,
  orange: ['#F97316', '#EA580C'] as const,
  rose: ['#F43F5E', '#E11D48'] as const,
  pink: ['#EC4899', '#DB2777'] as const,
  slate: ['#64748B', '#475569'] as const,
  violet: ['#8B5CF6', '#7C3AED'] as const,
} as const;

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
  gradient: readonly [string, string]
): MemeSound => ({
  id,
  name,
  icon,
  category,
  gradient,
  url: `${SOUND_BASE}/${id}.mp3`,
});

export const SOUNDS: MemeSound[] = [
  // 😂 Classic Memes
  createSound('bruh', 'Bruh', '😐', 'classic', GRADIENTS.purple),
  createSound('oof', 'Oof', '💀', 'classic', GRADIENTS.rose),
  createSound('vine-boom', 'Vine Boom', '💥', 'classic', GRADIENTS.blue),
  createSound('emotional-damage', 'Emotional', '😭', 'classic', GRADIENTS.green),
  createSound('sus', 'Sus', '🤨', 'classic', GRADIENTS.amber),
  createSound('nope', 'Nope', '🙅', 'classic', GRADIENTS.cyan),
  createSound('wow', 'Wow', '😮', 'classic', GRADIENTS.pink),
  createSound('yeet', 'Yeet', '🚀', 'classic', GRADIENTS.violet),

  // 🎵 Music/Effects
  createSound('airhorn', 'Airhorn', '📯', 'music', GRADIENTS.orange),
  createSound('sad-violin', 'Sad Violin', '🎻', 'music', GRADIENTS.violet),
  createSound('dun-dun', 'Dun Dun', '⚖️', 'music', GRADIENTS.green),
  createSound('dramatic', 'Dramatic', '🎭', 'music', GRADIENTS.rose),
  createSound('crickets', 'Crickets', '🦗', 'music', GRADIENTS.green),
  createSound('rimshot', 'Ba Dum Tss', '🥁', 'music', GRADIENTS.amber),
  createSound('sad-trombone', 'Sad Trombone', '🎺', 'music', GRADIENTS.purple),
  createSound('mlg-horn', 'MLG Horn', '🔥', 'music', GRADIENTS.orange),

  // 🎮 Gaming
  createSound('victory', 'Victory', '🏆', 'gaming', GRADIENTS.amber),
  createSound('game-over', 'Game Over', '☠️', 'gaming', GRADIENTS.slate),
  createSound('level-up', 'Level Up', '⬆️', 'gaming', GRADIENTS.green),
  createSound('coin', 'Coin', '🪙', 'gaming', GRADIENTS.amber),
  createSound('minecraft-oof', 'MC Oof', '⛏️', 'gaming', GRADIENTS.green),
  createSound('headshot', 'Headshot', '🎯', 'gaming', GRADIENTS.rose),
  createSound('among-us', 'Among Us', '🚀', 'gaming', GRADIENTS.orange),
  createSound('roblox-oof', 'Roblox Oof', '🟥', 'gaming', GRADIENTS.rose),

  // 🗣️ Reactions
  createSound('damn', 'Damn', '😳', 'reactions', GRADIENTS.pink),
  createSound('sheesh', 'Sheesh', '🥶', 'reactions', GRADIENTS.cyan),
  createSound('oh-no', 'Oh No', '😱', 'reactions', GRADIENTS.orange),
  createSound('what', 'What?!', '❓', 'reactions', GRADIENTS.purple),
  createSound('lets-go', "Let's Go!", '🎉', 'reactions', GRADIENTS.rose),
  createSound('noice', 'Noice', '👌', 'reactions', GRADIENTS.blue),
  createSound('ayo', 'Ayo?!', '🤔', 'reactions', GRADIENTS.amber),
  createSound('bonk', 'Bonk', '🔨', 'reactions', GRADIENTS.rose),

  // 📺 TV/Movies
  createSound('illuminati', 'Illuminati', '👁️', 'tv', GRADIENTS.violet),
  createSound('to-be-continued', 'To Be Cont.', '➡️', 'tv', GRADIENTS.purple),
  createSound('curb', 'Curb Theme', '📺', 'tv', GRADIENTS.blue),
  createSound('directed-by', 'Directed By', '🎬', 'tv', GRADIENTS.slate),
  createSound('surprised', 'Pikachu', '⚡', 'tv', GRADIENTS.amber),
  createSound('hello-there', 'Hello There', '👋', 'tv', GRADIENTS.purple),
  createSound('nooo', 'Noooo!', '😫', 'tv', GRADIENTS.rose),
  createSound('run', 'Run', '🏃', 'tv', GRADIENTS.rose),

  // 😂 Random/Misc
  createSound('fart', 'Fart', '💨', 'misc', GRADIENTS.slate),
  createSound('burp', 'Burp', '🤢', 'misc', GRADIENTS.green),
  createSound('slap', 'Slap', '👋', 'misc', GRADIENTS.amber),
  createSound('punch', 'Punch', '👊', 'misc', GRADIENTS.rose),
  createSound('explosion', 'Explosion', '💣', 'misc', GRADIENTS.orange),
  createSound('laugh', 'Laugh Track', '😂', 'misc', GRADIENTS.amber),
  createSound('scream', 'Scream', '😱', 'misc', GRADIENTS.slate),
  createSound('fbi', 'FBI Open Up', '🚔', 'misc', GRADIENTS.blue),
];
