export interface AlbumBackground {
  id: string
  name: string
  artist: string
  gradient: string
  overlay?: string
}

export const albumBackgrounds: AlbumBackground[] = [
  {
    id: 'highway-to-hell',
    name: 'Highway to Hell',
    artist: 'Flames & Thunder',
    gradient: 'radial-gradient(ellipse at 30% 80%, #8B0000 0%, #FF4500 20%, #1a0500 50%, #0a0a0a 80%)',
    overlay: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,69,0,0.03) 2px, rgba(255,69,0,0.03) 4px)',
  },
  {
    id: 'electric-purple',
    name: 'Electric Storm',
    artist: 'Voltage',
    gradient: 'radial-gradient(ellipse at 70% 20%, #4B0082 0%, #8B00FF 15%, #1a0033 45%, #0a0a0a 75%)',
    overlay: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(139,0,255,0.05) 100%)',
  },
  {
    id: 'iron-rust',
    name: 'Rust & Iron',
    artist: 'Steel Forge',
    gradient: 'radial-gradient(ellipse at 50% 60%, #8B4513 0%, #A0522D 15%, #1a0e05 45%, #0a0a0a 75%)',
    overlay: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139,69,19,0.04) 3px, rgba(139,69,19,0.04) 6px)',
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Ride',
    artist: 'Chrome Devils',
    gradient: 'radial-gradient(ellipse at 40% 30%, #001f4d 0%, #003380 15%, #000d1a 45%, #0a0a0a 75%)',
    overlay: 'radial-gradient(circle at 60% 70%, rgba(0,51,128,0.1) 0%, transparent 50%)',
  },
  {
    id: 'neon-green',
    name: 'Toxic Wasteland',
    artist: 'Nuclear Braai',
    gradient: 'radial-gradient(ellipse at 60% 70%, #004d00 0%, #006600 15%, #001a00 45%, #0a0a0a 75%)',
    overlay: 'repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(0,102,0,0.03) 3px, rgba(0,102,0,0.03) 6px)',
  },
  {
    id: 'blood-gold',
    name: 'Golden Skull',
    artist: 'Braai Bones',
    gradient: 'radial-gradient(ellipse at 50% 40%, #8B6914 0%, #DAA520 12%, #1a1200 40%, #0a0a0a 70%)',
    overlay: 'radial-gradient(circle at 30% 80%, rgba(218,165,32,0.06) 0%, transparent 40%)',
  },
  {
    id: 'smoke-ember',
    name: 'Smoke & Ember',
    artist: 'Coal Runners',
    gradient: 'radial-gradient(ellipse at 50% 90%, #B22222 0%, #FF6347 10%, #1a0505 40%, #0a0a0a 70%)',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(178,34,34,0.08) 100%)',
  },
  {
    id: 'chrome-silver',
    name: 'Chrome Machine',
    artist: 'Piston Heads',
    gradient: 'radial-gradient(ellipse at 45% 35%, #2a2a2a 0%, #444 12%, #151515 40%, #0a0a0a 70%)',
    overlay: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)',
  },
  {
    id: 'desert-heat',
    name: 'Desert Thunder',
    artist: 'Sand Vipers',
    gradient: 'radial-gradient(ellipse at 55% 65%, #8B4000 0%, #CC5500 12%, #1a0e00 40%, #0a0a0a 70%)',
    overlay: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(204,85,0,0.02) 4px, rgba(204,85,0,0.02) 8px)',
  },
  {
    id: 'deep-crimson',
    name: 'Blood & Steel',
    artist: 'The Springbok Skulls',
    gradient: 'radial-gradient(ellipse at 35% 50%, #4d0000 0%, #990000 12%, #1a0000 40%, #0a0a0a 70%)',
    overlay: 'radial-gradient(circle at 70% 30%, rgba(153,0,0,0.08) 0%, transparent 50%)',
  },
]

export function getRandomAlbumBg(): AlbumBackground {
  return albumBackgrounds[Math.floor(Math.random() * albumBackgrounds.length)]
}
