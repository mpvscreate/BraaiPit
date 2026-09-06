import { useState, useEffect, useCallback, useRef } from 'react'
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
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

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
    timerRef.current = setTimeout(rotate, 30000)
    return () => clearTimeout(timerRef.current)
  }, [rotate])

  return (
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
      <div className="album-bg-vignette" />

      <div className={`album-bg-info ${ready ? 'visible' : ''}`}>
        <span className="album-bg-name">
          {phase === 'crossfade' && next ? next.name : current.name}
        </span>
        <span className="album-bg-artist">
          {phase === 'crossfade' && next ? next.artist : current.artist}
        </span>
      </div>
    </div>
  )
}
