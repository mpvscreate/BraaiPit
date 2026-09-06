export interface AlbumBackground {
  id: string
  name: string
  artist: string
  image: string
  tint: string
}

export const albumBackgrounds: AlbumBackground[] = [
  {
    id: 'highway-to-hell',
    name: 'Highway to Hell',
    artist: 'AC/DC',
    image: 'https://archive.org/download/mbid-8866e226-7cd6-414e-b7d2-6ae0b0df6715/mbid-8866e226-7cd6-414e-b7d2-6ae0b0df6715-11338877966_thumb500.jpg',
    tint: 'rgba(139, 0, 0, 0.3)',
  },
  {
    id: 'back-in-black',
    name: 'Back in Black',
    artist: 'AC/DC',
    image: 'https://archive.org/download/mbid-83ff6988-2f79-40b9-82d5-437f2a5da5f3/mbid-83ff6988-2f79-40b9-82d5-437f2a5da5f3-3959751624_thumb500.jpg',
    tint: 'rgba(0, 0, 0, 0.3)',
  },
  {
    id: 'master-of-puppets',
    name: 'Master of Puppets',
    artist: 'Metallica',
    image: 'https://archive.org/download/mbid-4c183eb6-1258-4a9f-b8e4-9f9e94187b6b/mbid-4c183eb6-1258-4a9f-b8e4-9f9e94187b6b-16111659376_thumb500.jpg',
    tint: 'rgba(139, 0, 0, 0.2)',
  },
  {
    id: 'ride-the-lightning',
    name: 'Ride the Lightning',
    artist: 'Metallica',
    image: 'https://archive.org/download/mbid-589ff96d-0be8-3f82-bdd2-299592e51b40/mbid-589ff96d-0be8-3f82-bdd2-299592e51b40-41578959727_thumb500.jpg',
    tint: 'rgba(0, 0, 80, 0.25)',
  },
  {
    id: 'paranoid',
    name: 'Paranoid',
    artist: 'Black Sabbath',
    image: 'https://archive.org/download/mbid-c027e2bc-77b0-4773-9cfd-0ec7ef4b9104/mbid-c027e2bc-77b0-4773-9cfd-0ec7ef4b9104-36208497747_thumb500.jpg',
    tint: 'rgba(80, 0, 80, 0.2)',
  },
  {
    id: 'number-of-the-beast',
    name: 'The Number of the Beast',
    artist: 'Iron Maiden',
    image: 'https://archive.org/download/mbid-eb8b0a99-0c1e-4cc8-9dbc-afdbb6c221ac/mbid-eb8b0a99-0c1e-4cc8-9dbc-afdbb6c221ac-10878271035_thumb500.jpg',
    tint: 'rgba(139, 0, 0, 0.2)',
  },
  {
    id: 'appetite-for-destruction',
    name: 'Appetite for Destruction',
    artist: "Guns N' Roses",
    image: 'https://archive.org/download/mbid-7e1aaffd-3f00-4534-bddc-5ff88dc8600b/mbid-7e1aaffd-3f00-4534-bddc-5ff88dc8600b-31838425903_thumb500.jpg',
    tint: 'rgba(80, 60, 0, 0.2)',
  },
  {
    id: 'ace-of-spades',
    name: 'Ace of Spades',
    artist: 'Motorhead',
    image: 'https://archive.org/download/mbid-e4bca6cd-48eb-4d8d-a335-41363c78aba6/mbid-e4bca6cd-48eb-4d8d-a335-41363c78aba6-27084615378_thumb500.jpg',
    tint: 'rgba(0, 0, 0, 0.3)',
  },
  {
    id: 'nevermind',
    name: 'Nevermind',
    artist: 'Nirvana',
    image: 'https://archive.org/download/mbid-0fb1bdd3-1443-4569-943f-fc69c6424f99/mbid-0fb1bdd3-1443-4569-943f-fc69c6424f99-45224054828_thumb500.jpg',
    tint: 'rgba(0, 40, 80, 0.2)',
  },
  {
    id: 'screaming-for-vengeance',
    name: 'Screaming for Vengeance',
    artist: 'Judas Priest',
    image: 'https://archive.org/download/mbid-fbed3fb7-17f6-34fb-add6-b24b27f8f391/mbid-fbed3fb7-17f6-34fb-add6-b24b27f8f391-10655194025_thumb500.jpg',
    tint: 'rgba(80, 60, 0, 0.2)',
  },
]

export function getRandomAlbumBg(): AlbumBackground {
  return albumBackgrounds[Math.floor(Math.random() * albumBackgrounds.length)]
}
