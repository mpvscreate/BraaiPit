import { useState, useEffect } from 'react'
import { getRandomAlbumBg, type AlbumBackground as AlbumBg } from '../data/albumArt'
import './AlbumBackground.css'

export default function AlbumBackground() {
  const [album] = useState<AlbumBg>(getRandomAlbumBg)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => setLoaded(true)
    img.onerror = () => setLoaded(true)
    img.src = album.image
  }, [album.image])

  return (
    <div className={`album-bg ${loaded ? 'visible' : ''}`}>
      <div
        className="album-bg-image"
        style={{ backgroundImage: `url(${album.image})` }}
      />
      <div className="album-bg-darken" />
      <div
        className="album-bg-tint"
        style={{ background: album.tint }}
      />
      <div className="album-bg-vignette" />
      <div className="album-bg-info">
        <span className="album-bg-name">{album.name}</span>
        <span className="album-bg-artist">{album.artist}</span>
      </div>
    </div>
  )
}
