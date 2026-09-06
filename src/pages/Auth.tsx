import { useState } from 'react'
import { Flame, ArrowRight, Loader } from 'lucide-react'
import { joinWithName, type Member } from '../lib/supabase'
import './Auth.css'

interface Props {
  onAuth: (member: Member) => void
}

type Step = 'welcome' | 'join'

export default function Auth({ onAuth }: Props) {
  const [step, setStep] = useState<Step>('welcome')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleJoin() {
    if (!name.trim()) {
      setError('Enter your name, boet!')
      return
    }
    setLoading(true)
    setError('')
    const result = await joinWithName(name.trim())
    setLoading(false)
    if ('error' in result) {
      setError(result.error)
    } else {
      onAuth(result.member)
    }
  }

  if (step === 'welcome') {
    return (
      <div className="auth-page">
        <div className="auth-hero">
          <div className="auth-fire-bg" />
          <div className="auth-logo-big">🔥</div>
          <h1 className="auth-title">THE <span>BRAAI</span> PIT</h1>
          <p className="auth-tagline">Your crew's HQ for braai, bikes, rugby & banter</p>
        </div>

        <div className="auth-bottom">
          <button className="btn-primary auth-btn" onClick={() => setStep('join')}>
            <Flame size={20} />
            Join The Braai Pit
          </button>
          <p className="auth-hint">Got an invite link? Tap to join your crew</p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page auth-form-page">
      <div className="auth-form-header">
        <div className="auth-logo-sm">🔥</div>
        <h2>What do they call you?</h2>
        <p>Enter your name so the crew knows who you are</p>
      </div>

      <div className="auth-form">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => { setName(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleJoin()}
          autoFocus
          maxLength={30}
        />
        {error && <span className="auth-error">{error}</span>}

        <button
          className="btn-primary auth-btn"
          onClick={handleJoin}
          disabled={!name.trim() || loading}
        >
          {loading ? <><Loader size={18} className="spin" /> Joining...</> : <>Let's go! <ArrowRight size={18} /></>}
        </button>
      </div>
    </div>
  )
}
