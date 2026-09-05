import { useState, useEffect } from 'react'
import './SplashScreen.css'

const embers = Array.from({ length: 24 }, () => ({
  left: `${5 + Math.random() * 90}%`,
  delay: `${Math.random() * 2}s`,
  duration: `${1.5 + Math.random() * 2}s`,
  drift: `${(Math.random() - 0.5) * 80}px`,
}))

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000)
    const t2 = setTimeout(onDone, 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={`splash ${fadeOut ? 'splash-out' : ''}`}>
      <div className="splash-embers">
        {embers.map((e, i) => (
          <div
            key={i}
            className="ember"
            style={{
              left: e.left,
              animationDelay: e.delay,
              animationDuration: e.duration,
              '--drift': e.drift,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="splash-fire">🔥</div>
      <h1 className="splash-title">THE <span>BRAAI</span> PIT</h1>
      <p className="splash-tagline">Where legends braai</p>
    </div>
  )
}
