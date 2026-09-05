import { useState, useRef, useMemo } from 'react'
import { Play, Pause } from 'lucide-react'

interface Props {
  audioUrl: string
  duration: number
  transcript: string
}

export default function VoiceMessageBubble({ audioUrl, duration, transcript }: Props) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const bars = useMemo(() => {
    return Array.from({ length: 20 }, () => 4 + Math.random() * 18)
  }, [])

  function togglePlay() {
    if (!audioUrl) return
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl)
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime / audioRef.current.duration)
        }
      }
      audioRef.current.onended = () => {
        setPlaying(false)
        setProgress(0)
      }
    }

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const playedBars = Math.floor(progress * bars.length)

  return (
    <div className="voice-msg">
      <div className="voice-player">
        <button className="voice-play-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        </button>
        <div className="voice-waveform">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`voice-waveform-bar ${i < playedBars ? 'played' : ''}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        <span className="voice-duration">{formatTime(duration)}</span>
      </div>
      <div className="voice-transcript">
        <span className="voice-transcript-label">Transcript:</span>
        {transcript}
      </div>
    </div>
  )
}
