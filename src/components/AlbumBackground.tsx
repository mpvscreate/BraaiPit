import { useState, useEffect, useCallback, useRef } from 'react'
import { Disc3 } from 'lucide-react'
import { albumBackgrounds, type AlbumBackground as AlbumBg } from '../data/albumArt'
import './AlbumBackground.css'

function pickRandom(exclude?: string): AlbumBg {
  const pool = exclude
    ? albumBackgrounds.filter(a => a.id !== exclude)
    : albumBackgrounds
  return pool[Math.floor(Math.random() * pool.length)]
}

function preloadImage(src: string): Promise<void> {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

export default function AlbumBackground() {
  const [current, setCurrent] = useState<AlbumBg>(pickRandom)
  const [next, setNext] = useState<AlbumBg | null>(null)
  const [phase, setPhase] = useState<'show' | 'crossfade'>('show')
  const [ready, setReady] = useState(false)
  const [reveal, setReveal] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const revealTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    preloadImage(current.image).then(() => setReady(true))
  }, [])

  const rotate = useCallback(() => {
    const upcoming = pickRandom(current.id)
    preloadImage(upcoming.image).then(() => {
      setNext(upcoming)
      setPhase('crossfade')
      setTimeout(() => {
        setCurrent(upcoming)
        setNext(null)
        setPhase('show')
      }, 1500)
    })
  }, [current.id])

  useEffect(() => {
    if (reveal) return
    timerRef.current = setTimeout(rotate, 30000)
    return () => clearTimeout(timerRef.current)
  }, [rotate, reveal])

  const showReveal = useCallback(() => {
    setReveal(true)
    clearTimeout(timerRef.current)
    revealTimer.current = setTimeout(() => setReveal(false), 5000)
  }, [])

  const dismissReveal = useCallback(() => {
    clearTimeout(revealTimer.current)
    setReveal(false)
  }, [])

  const activeAlbum = phase === 'crossfade' && next ? next : current

  return (
    <>
      <div className="album-bg-wrap">
        <div className={`album-bg ${ready ? 'visible' : ''}`}>
          <div
            className="album-bg-image"
            style={{ backgroundImage: `url(${current.image})` }}
          />
        </div>

        {next && phase === 'crossfade' && (
          <div className="album-bg album-bg-next">
            <div
              className="album-bg-image"
              style={{ backgroundImage: `url(${next.image})` }}
            />
          </div>
        )}

        <div className="album-bg-darken" />
      </div>

      <div className={`album-bg-bar ${ready ? 'visible' : ''}`}>
        <button className="album-reveal-btn" onClick={showReveal} aria-label="View album cover">
          <Disc3 size={16} />
        </button>
        <div className="album-bg-info">
          <span className="album-bg-name">{activeAlbum.name}</span>
          <span className="album-bg-artist">{activeAlbum.artist}</span>
        </div>
      </div>

      {reveal && (
        <div className="album-reveal-overlay" onClick={dismissReveal}>
          <img
            className="album-reveal-cover"
            src={activeAlbum.image}
            alt={`${activeAlbum.name} by ${activeAlbum.artist}`}
          />
          <div className="album-reveal-info">
            <span className="album-reveal-name">{activeAlbum.name}</span>
            <span className="album-reveal-artist">{activeAlbum.artist}</span>
          </div>
          <div className="album-reveal-progress" />
        </div>
      )}
    </>
  )
}
