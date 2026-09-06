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
    gradient: 'radial-gradient(ellipse at 30% 80%, #B22222 0%, #FF4500 25%, #8B0000 50%, #1a0500 75%, #0a0a0a 100%)',
    overlay: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,69,0,0.05) 2px, rgba(255,69,0,0.05) 4px)',
  },
  {
    id: 'electric-purple',
    name: 'Electric Storm',
    artist: 'Voltage',
    gradient: 'radial-gradient(ellipse at 70% 20%, #7B00CC 0%, #9B30FF 20%, #4B0082 50%, #1a0033 80%, #0a0a0a 100%)',
    overlay: 'radial-gradient(circle at 30% 70%, rgba(155,48,255,0.08) 0%, transparent 60%)',
  },
  {
    id: 'iron-rust',
    name: 'Rust & Iron',
    artist: 'Steel Forge',
    gradient: 'radial-gradient(ellipse at 50% 60%, #CD853F 0%, #A0522D 20%, #8B4513 50%, #1a0e05 80%, #0a0a0a 100%)',
    overlay: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(205,133,63,0.05) 3px, rgba(205,133,63,0.05) 6px)',
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Ride',
    artist: 'Chrome Devils',
    gradient: 'radial-gradient(ellipse at 40% 30%, #0055AA 0%, #003380 25%, #001f4d 55%, #000d1a 80%, #0a0a0a 100%)',
    overlay: 'radial-gradient(circle at 60% 70%, rgba(0,85,170,0.12) 0%, transparent 55%)',
  },
  {
    id: 'neon-green',
    name: 'Toxic Wasteland',
    artist: 'Nuclear Braai',
    gradient: 'radial-gradient(ellipse at 60% 70%, #008800 0%, #006600 25%, #004d00 50%, #001a00 80%, #0a0a0a 100%)',
    overlay: 'repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(0,136,0,0.05) 3px, rgba(0,136,0,0.05) 6px)',
  },
  {
    id: 'blood-gold',
    name: 'Golden Skull',
    artist: 'Braai Bones',
    gradient: 'radial-gradient(ellipse at 50% 40%, #DAA520 0%, #B8860B 20%, #8B6914 50%, #1a1200 80%, #0a0a0a 100%)',
    overlay: 'radial-gradient(circle at 30% 80%, rgba(218,165,32,0.1) 0%, transparent 50%)',
  },
  {
    id: 'smoke-ember',
    name: 'Smoke & Ember',
    artist: 'Coal Runners',
    gradient: 'radial-gradient(ellipse at 50% 85%, #DC143C 0%, #FF6347 15%, #B22222 40%, #1a0505 75%, #0a0a0a 100%)',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 60%, rgba(220,20,60,0.1) 100%)',
  },
  {
    id: 'chrome-silver',
    name: 'Chrome Machine',
    artist: 'Piston Heads',
    gradient: 'radial-gradient(ellipse at 45% 35%, #555 0%, #3a3a3a 20%, #2a2a2a 50%, #151515 80%, #0a0a0a 100%)',
    overlay: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
  },
  {
    id: 'desert-heat',
    name: 'Desert Thunder',
    artist: 'Sand Vipers',
    gradient: 'radial-gradient(ellipse at 55% 65%, #CC5500 0%, #E06600 15%, #8B4000 45%, #1a0e00 80%, #0a0a0a 100%)',
    overlay: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(204,85,0,0.04) 4px, rgba(204,85,0,0.04) 8px)',
  },
  {
    id: 'deep-crimson',
    name: 'Blood & Steel',
    artist: 'The Springbok Skulls',
    gradient: 'radial-gradient(ellipse at 35% 50%, #990000 0%, #CC0000 15%, #660000 45%, #1a0000 80%, #0a0a0a 100%)',
    overlay: 'radial-gradient(circle at 70% 30%, rgba(204,0,0,0.1) 0%, transparent 55%)',
  },
]

export function getRandomAlbumBg(): AlbumBackground {
  return albumBackgrounds[Math.floor(Math.random() * albumBackgrounds.length)]
}
