export interface Channel {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

export const channels: Channel[] = [
  {
    id: 'braai',
    name: 'Braai',
    icon: '🔥',
    description: 'Recipes, tips & braai pics',
    color: '#FF4500',
  },
  {
    id: 'cars',
    name: 'Cars',
    icon: '🚗',
    description: 'Rides, mods & car talk',
    color: '#3B82F6',
  },
  {
    id: 'rugby',
    name: 'Rugby',
    icon: '🏉',
    description: 'Match day, scores & banter',
    color: '#10B981',
  },
  {
    id: 'bikes',
    name: 'Off-Road',
    icon: '🏍️',
    description: 'Trails, bikes & adventures',
    color: '#F59E0B',
  },
  {
    id: 'music',
    name: 'Rock',
    icon: '🎸',
    description: 'Tunes, gigs & playlists',
    color: '#8B5CF6',
  },
  {
    id: 'jokes',
    name: 'Jokes',
    icon: '😂',
    description: 'Memes, jokes & nonsense',
    color: '#EC4899',
  },
]
