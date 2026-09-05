import { useState, useEffect } from 'react'
import { X, RefreshCw } from 'lucide-react'
import { getRandomJoke, getCategoryEmoji, type DadJoke } from '../data/dadJokes'
import './DadJokeModal.css'

interface Props {
  onClose: () => void
}

export default function DadJokeModal({ onClose }: Props) {
  const [joke, setJoke] = useState<DadJoke>(getRandomJoke)
  const [showPunchline, setShowPunchline] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowPunchline(true), 1500)
    return () => clearTimeout(timer)
  }, [joke])

  function nextJoke() {
    setAnimating(true)
    setShowPunchline(false)
    setTimeout(() => {
      setJoke(getRandomJoke())
      setAnimating(false)
    }, 200)
  }

  return (
    <div className="joke-overlay" onClick={onClose}>
      <div className="joke-modal" onClick={e => e.stopPropagation()}>
        <button className="joke-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="joke-emoji">{getCategoryEmoji(joke.category)}</div>

        <div className={`joke-content ${animating ? 'joke-exit' : 'joke-enter'}`}>
          <p className="joke-setup">{joke.setup}</p>
          {showPunchline && (
            <p className="joke-punchline">{joke.punchline}</p>
          )}
        </div>

        <div className="joke-category">{joke.category}</div>

        <div className="joke-actions">
          <button className="joke-next" onClick={nextJoke}>
            <RefreshCw size={16} />
            Another one
          </button>
          <button className="joke-dismiss" onClick={onClose}>
            Let me in!
          </button>
        </div>
      </div>
    </div>
  )
}
