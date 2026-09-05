import { useState, useEffect } from 'react'
import { Flame, ArrowRight, Eye, EyeOff, Loader } from 'lucide-react'
import { signUp, signIn, getStoredSession, type Member } from '../lib/supabase'
import './Auth.css'

interface Props {
  onAuth: (member: Member) => void
}

type Step = 'welcome' | 'join' | 'pin' | 'reenter'

export default function Auth({ onAuth }: Props) {
  const [step, setStep] = useState<Step>('welcome')
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [storedEmail, setStoredEmail] = useState<string | null>(null)

  useEffect(() => {
    const session = getStoredSession()
    if (session) {
      setName(session.name)
      setStoredEmail(session.email)
      setStep('reenter')
    }
  }, [])

  async function handleSignUp() {
    if (pin.length < 6) {
      setError('PIN must be at least 6 digits')
      return
    }
    setLoading(true)
    setError('')
    const result = await signUp(name.trim(), pin)
    setLoading(false)
    if ('error' in result) {
      setError(result.error)
    } else {
      onAuth(result.member)
    }
  }

  async function handleSignIn() {
    if (pin.length < 6) {
      setError('PIN must be at least 6 digits')
      return
    }
    if (!storedEmail) return
    setLoading(true)
    setError('')
    const result = await signIn(storedEmail, pin)
    setLoading(false)
    if ('error' in result) {
      setError(result.error)
    } else {
      onAuth(result.member)
    }
  }

  function handleJoin() {
    if (!name.trim()) {
      setError('Enter your name, boet!')
      return
    }
    setError('')
    setStep('pin')
  }

  function switchToNewUser() {
    setStoredEmail(null)
    setName('')
    setPin('')
    setError('')
    setStep('welcome')
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

  if (step === 'join') {
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

          <button className="btn-primary auth-btn" onClick={handleJoin} disabled={!name.trim()}>
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    )
  }

  if (step === 'reenter') {
    return (
      <div className="auth-page auth-form-page">
        <div className="auth-form-header">
          <div className="auth-logo-sm">🔐</div>
          <h2>Welcome back, {name}!</h2>
          <p>Enter your PIN to get back in</p>
        </div>

        <div className="auth-form">
          <div className="pin-input-wrap">
            <input
              type={showPin ? 'text' : 'password'}
              placeholder="• • • •"
              value={pin}
              onChange={e => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 6)
                setPin(v)
                setError('')
              }}
              onKeyDown={e => e.key === 'Enter' && handleSignIn()}
              inputMode="numeric"
              autoFocus
              className="pin-input"
            />
            <button
              className="pin-toggle"
              onClick={() => setShowPin(p => !p)}
              aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
            >
              {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && <span className="auth-error">{error}</span>}

          <button
            className="btn-primary auth-btn"
            onClick={handleSignIn}
            disabled={pin.length < 6 || loading}
          >
            {loading ? <><Loader size={18} className="spin" /> Signing in...</> : <>Let's go! <Flame size={18} /></>}
          </button>

          <button className="auth-switch" onClick={switchToNewUser}>
            Not {name}? Join as someone else
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page auth-form-page">
      <div className="auth-form-header">
        <div className="auth-logo-sm">🔐</div>
        <h2>Set your PIN</h2>
        <p>Create a 6-digit PIN to secure your account</p>
      </div>

      <div className="auth-form">
        <div className="pin-input-wrap">
          <input
            type={showPin ? 'text' : 'password'}
            placeholder="• • • •"
            value={pin}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 6)
              setPin(v)
              setError('')
            }}
            onKeyDown={e => e.key === 'Enter' && handleSignUp()}
            inputMode="numeric"
            autoFocus
            className="pin-input"
          />
          <button
            className="pin-toggle"
            onClick={() => setShowPin(p => !p)}
            aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
          >
            {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && <span className="auth-error">{error}</span>}

        <button
          className="btn-primary auth-btn"
          onClick={handleSignUp}
          disabled={pin.length < 6 || loading}
        >
          {loading ? <><Loader size={18} className="spin" /> Creating account...</> : <>Let's go! <Flame size={18} /></>}
        </button>
      </div>

      <p className="auth-welcome-name">
        Welcome, <strong>{name}</strong>! 🤘
      </p>
    </div>
  )
}
