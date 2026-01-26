export interface MemeSound {
  id: string;
  name: string;
  icon: string;
  category: string;
  gradient: [string, string];
  url: string; // URL to sound file
}

// Sound URLs - Replace with actual hosted sound files
// Use services like: Cloudinary, AWS S3, or Firebase Storage
const SOUND_BASE = 'https://example.com/sounds'; // TODO: Replace with real CDN

export const SOUNDS: MemeSound[] = [
  // 😂 Classic Memes
  { id: 'bruh', name: 'Bruh', icon: '😐', category: 'classic', gradient: ['#667eea', '#764ba2'], url: `${SOUND_BASE}/bruh.mp3` },
  { id: 'oof', name: 'Oof', icon: '💀', category: 'classic', gradient: ['#f093fb', '#f5576c'], url: `${SOUND_BASE}/oof.mp3` },
  { id: 'vine-boom', name: 'Vine Boom', icon: '💥', category: 'classic', gradient: ['#4facfe', '#00f2fe'], url: `${SOUND_BASE}/vine-boom.mp3` },
  { id: 'emotional-damage', name: 'Emotional', icon: '😭', category: 'classic', gradient: ['#43e97b', '#38f9d7'], url: `${SOUND_BASE}/emotional-damage.mp3` },
  { id: 'sus', name: 'Sus', icon: '🤨', category: 'classic', gradient: ['#fa709a', '#fee140'], url: `${SOUND_BASE}/sus.mp3` },
  { id: 'nope', name: 'Nope', icon: '🙅', category: 'classic', gradient: ['#a8edea', '#fed6e3'], url: `${SOUND_BASE}/nope.mp3` },
  { id: 'wow', name: 'Wow', icon: '😮', category: 'classic', gradient: ['#ff9a9e', '#fecfef'], url: `${SOUND_BASE}/wow.mp3` },
  { id: 'yeet', name: 'Yeet', icon: '🚀', category: 'classic', gradient: ['#a18cd1', '#fbc2eb'], url: `${SOUND_BASE}/yeet.mp3` },

  // 🎵 Music/Effects
  { id: 'airhorn', name: 'Airhorn', icon: '📯', category: 'music', gradient: ['#ff6b6b', '#feca57'], url: `${SOUND_BASE}/airhorn.mp3` },
  { id: 'sad-violin', name: 'Sad Violin', icon: '🎻', category: 'music', gradient: ['#5f72bd', '#9b23ea'], url: `${SOUND_BASE}/sad-violin.mp3` },
  { id: 'dun-dun', name: 'Dun Dun', icon: '⚖️', category: 'music', gradient: ['#11998e', '#38ef7d'], url: `${SOUND_BASE}/dun-dun.mp3` },
  { id: 'dramatic', name: 'Dramatic', icon: '🎭', category: 'music', gradient: ['#ee0979', '#ff6a00'], url: `${SOUND_BASE}/dramatic.mp3` },
  { id: 'crickets', name: 'Crickets', icon: '🦗', category: 'music', gradient: ['#56ab2f', '#a8e063'], url: `${SOUND_BASE}/crickets.mp3` },
  { id: 'rimshot', name: 'Ba Dum Tss', icon: '🥁', category: 'music', gradient: ['#f12711', '#f5af19'], url: `${SOUND_BASE}/rimshot.mp3` },
  { id: 'sad-trombone', name: 'Sad Trombone', icon: '🎺', category: 'music', gradient: ['#654ea3', '#eaafc8'], url: `${SOUND_BASE}/sad-trombone.mp3` },
  { id: 'mlg-horn', name: 'MLG Horn', icon: '🔥', category: 'music', gradient: ['#f83600', '#f9d423'], url: `${SOUND_BASE}/mlg-horn.mp3` },

  // 🎮 Gaming
  { id: 'victory', name: 'Victory', icon: '🏆', category: 'gaming', gradient: ['#f7971e', '#ffd200'], url: `${SOUND_BASE}/victory.mp3` },
  { id: 'game-over', name: 'Game Over', icon: '☠️', category: 'gaming', gradient: ['#232526', '#414345'], url: `${SOUND_BASE}/game-over.mp3` },
  { id: 'level-up', name: 'Level Up', icon: '⬆️', category: 'gaming', gradient: ['#00b09b', '#96c93d'], url: `${SOUND_BASE}/level-up.mp3` },
  { id: 'coin', name: 'Coin', icon: '🪙', category: 'gaming', gradient: ['#f9d423', '#ff4e50'], url: `${SOUND_BASE}/coin.mp3` },
  { id: 'minecraft-oof', name: 'MC Oof', icon: '⛏️', category: 'gaming', gradient: ['#56ab2f', '#a8e063'], url: `${SOUND_BASE}/minecraft-oof.mp3` },
  { id: 'headshot', name: 'Headshot', icon: '🎯', category: 'gaming', gradient: ['#ff416c', '#ff4b2b'], url: `${SOUND_BASE}/headshot.mp3` },
  { id: 'among-us', name: 'Among Us', icon: '🚀', category: 'gaming', gradient: ['#fc4a1a', '#f7b733'], url: `${SOUND_BASE}/among-us.mp3` },
  { id: 'roblox-oof', name: 'Roblox Oof', icon: '🟥', category: 'gaming', gradient: ['#e52d27', '#b31217'], url: `${SOUND_BASE}/roblox-oof.mp3` },

  // 🗣️ Reactions
  { id: 'damn', name: 'Damn', icon: '😳', category: 'reactions', gradient: ['#f5576c', '#f093fb'], url: `${SOUND_BASE}/damn.mp3` },
  { id: 'sheesh', name: 'Sheesh', icon: '🥶', category: 'reactions', gradient: ['#4facfe', '#00f2fe'], url: `${SOUND_BASE}/sheesh.mp3` },
  { id: 'oh-no', name: 'Oh No', icon: '😱', category: 'reactions', gradient: ['#ff9966', '#ff5e62'], url: `${SOUND_BASE}/oh-no.mp3` },
  { id: 'what', name: 'What?!', icon: '❓', category: 'reactions', gradient: ['#7f00ff', '#e100ff'], url: `${SOUND_BASE}/what.mp3` },
  { id: 'lets-go', name: "Let's Go!", icon: '🎉', category: 'reactions', gradient: ['#f857a6', '#ff5858'], url: `${SOUND_BASE}/lets-go.mp3` },
  { id: 'noice', name: 'Noice', icon: '👌', category: 'reactions', gradient: ['#00c6ff', '#0072ff'], url: `${SOUND_BASE}/noice.mp3` },
  { id: 'ayo', name: 'Ayo?!', icon: '🤔', category: 'reactions', gradient: ['#f2994a', '#f2c94c'], url: `${SOUND_BASE}/ayo.mp3` },
  { id: 'bonk', name: 'Bonk', icon: '🔨', category: 'reactions', gradient: ['#eb3349', '#f45c43'], url: `${SOUND_BASE}/bonk.mp3` },

  // 📺 TV/Movies
  { id: 'illuminati', name: 'Illuminati', icon: '👁️', category: 'tv', gradient: ['#1a2a6c', '#b21f1f'], url: `${SOUND_BASE}/illuminati.mp3` },
  { id: 'to-be-continued', name: 'To Be Cont.', icon: '➡️', category: 'tv', gradient: ['#4568dc', '#b06ab3'], url: `${SOUND_BASE}/to-be-continued.mp3` },
  { id: 'curb', name: 'Curb Theme', icon: '📺', category: 'tv', gradient: ['#000428', '#004e92'], url: `${SOUND_BASE}/curb.mp3` },
  { id: 'directed-by', name: 'Directed By', icon: '🎬', category: 'tv', gradient: ['#0f0c29', '#302b63'], url: `${SOUND_BASE}/directed-by.mp3` },
  { id: 'surprised', name: 'Pikachu', icon: '⚡', category: 'tv', gradient: ['#f7971e', '#ffd200'], url: `${SOUND_BASE}/surprised.mp3` },
  { id: 'hello-there', name: 'Hello There', icon: '👋', category: 'tv', gradient: ['#3a1c71', '#d76d77'], url: `${SOUND_BASE}/hello-there.mp3` },
  { id: 'nooo', name: 'Noooo!', icon: '😫', category: 'tv', gradient: ['#200122', '#6f0000'], url: `${SOUND_BASE}/nooo.mp3` },
  { id: 'run', name: 'Run', icon: '🏃', category: 'tv', gradient: ['#c31432', '#240b36'], url: `${SOUND_BASE}/run.mp3` },

  // 😂 Random/Misc
  { id: 'fart', name: 'Fart', icon: '💨', category: 'misc', gradient: ['#8e9eab', '#eef2f3'], url: `${SOUND_BASE}/fart.mp3` },
  { id: 'burp', name: 'Burp', icon: '🤢', category: 'misc', gradient: ['#134e5e', '#71b280'], url: `${SOUND_BASE}/burp.mp3` },
  { id: 'slap', name: 'Slap', icon: '👋', category: 'misc', gradient: ['#ff4e50', '#f9d423'], url: `${SOUND_BASE}/slap.mp3` },
  { id: 'punch', name: 'Punch', icon: '👊', category: 'misc', gradient: ['#eb3349', '#f45c43'], url: `${SOUND_BASE}/punch.mp3` },
  { id: 'explosion', name: 'Explosion', icon: '💣', category: 'misc', gradient: ['#f12711', '#f5af19'], url: `${SOUND_BASE}/explosion.mp3` },
  { id: 'laugh', name: 'Laugh Track', icon: '😂', category: 'misc', gradient: ['#ff9966', '#ff5e62'], url: `${SOUND_BASE}/laugh.mp3` },
  { id: 'scream', name: 'Scream', icon: '😱', category: 'misc', gradient: ['#232526', '#414345'], url: `${SOUND_BASE}/scream.mp3` },
  { id: 'fbi', name: 'FBI Open Up', icon: '🚔', category: 'misc', gradient: ['#0052d4', '#4364f7'], url: `${SOUND_BASE}/fbi.mp3` },
];

export const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🔊' },
  { id: 'classic', name: 'Classic', icon: '😂' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'reactions', name: 'Reactions', icon: '🗣️' },
  { id: 'tv', name: 'TV/Movies', icon: '📺' },
  { id: 'misc', name: 'Random', icon: '🎲' },
];
