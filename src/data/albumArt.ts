export interface AlbumBackground {
  id: string
  name: string
  artist: string
  image: string
  tint: string
}

const CAA = 'https://coverartarchive.org/release'

export const albumBackgrounds: AlbumBackground[] = [
  {
    id: 'highway-to-hell',
    name: 'Highway to Hell',
    artist: 'AC/DC',
    image: `${CAA}/8866e226-7cd6-414e-b7d2-6ae0b0df6715/front-500`,
    tint: 'rgba(139, 0, 0, 0.3)',
  },
  {
    id: 'back-in-black',
    name: 'Back in Black',
    artist: 'AC/DC',
    image: `${CAA}/83ff6988-2f79-40b9-82d5-437f2a5da5f3/front-500`,
    tint: 'rgba(0, 0, 0, 0.3)',
  },
  {
    id: 'master-of-puppets',
    name: 'Master of Puppets',
    artist: 'Metallica',
    image: `${CAA}/4c183eb6-1258-4a9f-b8e4-9f9e94187b6b/front-500`,
    tint: 'rgba(139, 0, 0, 0.2)',
  },
  {
    id: 'ride-the-lightning',
    name: 'Ride the Lightning',
    artist: 'Metallica',
    image: `${CAA}/96ea4fc3-bce0-3982-965f-d0f127a38d12/front-500`,
    tint: 'rgba(0, 0, 80, 0.25)',
  },
  {
    id: 'paranoid',
    name: 'Paranoid',
    artist: 'Black Sabbath',
    image: `${CAA}/c027e2bc-77b0-4773-9cfd-0ec7ef4b9104/front-500`,
    tint: 'rgba(80, 0, 80, 0.2)',
  },
  {
    id: 'number-of-the-beast',
    name: 'The Number of the Beast',
    artist: 'Iron Maiden',
    image: `${CAA}/eb8b0a99-0c1e-4cc8-9dbc-afdbb6c221ac/front-500`,
    tint: 'rgba(139, 0, 0, 0.2)',
  },
  {
    id: 'appetite-for-destruction',
    name: 'Appetite for Destruction',
    artist: "Guns N' Roses",
    image: `${CAA}/7e1aaffd-3f00-4534-bddc-5ff88dc8600b/front-500`,
    tint: 'rgba(80, 60, 0, 0.2)',
  },
  {
    id: 'ace-of-spades',
    name: 'Ace of Spades',
    artist: 'Motörhead',
    image: `${CAA}/45dc83bb-8f32-43fe-b9a6-83f1b08044d1/front-500`,
    tint: 'rgba(0, 0, 0, 0.3)',
  },
  {
    id: 'nevermind',
    name: 'Nevermind',
    artist: 'Nirvana',
    image: `${CAA}/f922ec87-4758-421d-a839-3193455345ff/front-500`,
    tint: 'rgba(0, 40, 80, 0.2)',
  },
  {
    id: 'screaming-for-vengeance',
    name: 'Screaming for Vengeance',
    artist: 'Judas Priest',
    image: `${CAA}/fbed3fb7-17f6-34fb-add6-b24b27f8f391/front-500`,
    tint: 'rgba(80, 60, 0, 0.2)',
  },
]

export function getRandomAlbumBg(): AlbumBackground {
  return albumBackgrounds[Math.floor(Math.random() * albumBackgrounds.length)]
}
