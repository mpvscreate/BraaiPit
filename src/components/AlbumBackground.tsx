import { useState, useEffect } from 'react'
import { getRandomAlbumBg, type AlbumBackground as AlbumBg } from '../data/albumArt'
import './AlbumBackground.css'

export default function AlbumBackground() {
  const [album] = useState<AlbumBg>(getRandomAlbumBg)
  const [show, setShow] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setShow(true))
  }, [])

  return (
    <div className={`album-bg ${show ? 'visible' : ''}`}>
      <div
        className="album-bg-gradient"
        style={{ background: album.gradient }}
      />
      {album.overlay && (
        <div
          className="album-bg-overlay"
          style={{ background: album.overlay }}
        />
      )}
      <div className="album-bg-noise" />
      <div className="album-bg-info">
        <span className="album-bg-name">{album.name}</span>
        <span className="album-bg-artist">{album.artist}</span>
      </div>
    </div>
  )
}
