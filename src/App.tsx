import { useState, useEffect, useRef, useCallback } from 'react'
import { Flame, Hash, MessageSquare, User, Search, Bell } from 'lucide-react'
import DadJokeModal from './components/DadJokeModal'
import AlbumBackground from './components/AlbumBackground'
import SplashScreen from './components/SplashScreen'
import Auth from './pages/Auth'
import Feed from './pages/Feed'
import Channels from './pages/Channels'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import { subscribe, clearChat, clearChannels, startSimulation, type NotificationCounts } from './lib/notifications'
import { restoreSession, type Member } from './lib/supabase'
import './App.css'

type Tab = 'feed' | 'channels' | 'chat' | 'profile'
const TAB_ORDER: Tab[] = ['feed', 'channels', 'chat', 'profile']

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [member, setMember] = useState<Member | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('feed')
  const [showJoke, setShowJoke] = useState(false)
  const [counts, setCounts] = useState<NotificationCounts>({ chat: 0, channels: 0, total: 0 })
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null)
  const [pullDistance, setPullDistance] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const touchRef = useRef<{ x: number; y: number } | null>(null)
  const pullStartY = useRef<number | null>(null)

  const handleSplashDone = useCallback(() => setShowSplash(false), [])

  useEffect(() => {
    restoreSession().then(m => {
      setMember(m)
      setAuthChecked(true)
    })
  }, [])

  useEffect(() => {
    if (member && !showSplash) {
      setShowJoke(true)
      startSimulation()
    }
  }, [member, showSplash])

  useEffect(() => {
    return subscribe(setCounts)
  }, [])

  useEffect(() => {
    if (slideDir) {
      const t = setTimeout(() => setSlideDir(null), 250)
      return () => clearTimeout(t)
    }
  }, [slideDir])

  function handleAuth(m: Member) {
    setMember(m)
  }

  function handleTabSwitch(tab: Tab) {
    setActiveTab(tab)
    if (tab === 'chat') clearChat()
    if (tab === 'channels') clearChannels()
  }

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY }
    if (activeTab === 'feed' && (contentRef.current?.scrollTop ?? 0) <= 0) {
      pullStartY.current = t.clientY
    } else {
      pullStartY.current = null
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (pullStartY.current !== null) {
      const dy = e.touches[0].clientY - pullStartY.current
      if (dy > 0) {
        setPullDistance(Math.min(dy * 0.4, 80))
      }
    }
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (pullDistance > 50) {
      setRefreshing(true)
      setPullDistance(0)
      setTimeout(() => setRefreshing(false), 1200)
      touchRef.current = null
      pullStartY.current = null
      return
    }
    setPullDistance(0)
    pullStartY.current = null

    if (touchRef.current) {
      const dx = e.changedTouches[0].clientX - touchRef.current.x
      const dy = e.changedTouches[0].clientY - touchRef.current.y
      touchRef.current = null

      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        const idx = TAB_ORDER.indexOf(activeTab)
        if (dx < 0 && idx < TAB_ORDER.length - 1) {
          setSlideDir('left')
          handleTabSwitch(TAB_ORDER[idx + 1])
        } else if (dx > 0 && idx > 0) {
          setSlideDir('right')
          handleTabSwitch(TAB_ORDER[idx - 1])
        }
      }
    }
  }

  if (showSplash) {
    return <SplashScreen onDone={handleSplashDone} />
  }

  if (!member) {
    if (!authChecked) return <SplashScreen onDone={handleSplashDone} />
    return <Auth onAuth={handleAuth} />
  }

  const tabs: { id: Tab; label: string; icon: typeof Flame; badge: number }[] = [
    { id: 'feed', label: 'Feed', icon: Flame, badge: 0 },
    { id: 'channels', label: 'Channels', icon: Hash, badge: counts.channels },
    { id: 'chat', label: 'Chat', icon: MessageSquare, badge: counts.chat },
    { id: 'profile', label: 'Profile', icon: User, badge: 0 },
  ]

  return (
    <div className="app-shell">
      <AlbumBackground />

      {showJoke && <DadJokeModal onClose={() => setShowJoke(false)} />}

      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🔥</span>
          <span className="logo-text">
            THE <span className="logo-accent">BRAAI</span> PIT
          </span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="icon-btn notification-bell" aria-label="Notifications">
            <Bell size={20} />
            {counts.total > 0 && (
              <span className="badge">{counts.total}</span>
            )}
          </button>
        </div>
      </header>

      {(pullDistance > 0 || refreshing) && (
        <div className="pull-indicator" style={{ height: refreshing ? 48 : pullDistance }}>
          <div
            className={`pull-spinner ${refreshing ? 'spinning' : ''}`}
            style={{
              opacity: refreshing ? 1 : Math.min(pullDistance / 30, 1),
              transform: refreshing ? undefined : `rotate(${pullDistance * 4}deg)`,
            }}
          >
            🔥
          </div>
        </div>
      )}

      <main
        className={`app-content ${slideDir ? `slide-${slideDir}` : ''}`}
        ref={contentRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {activeTab === 'feed' && <Feed member={member} />}
        {activeTab === 'channels' && <Channels member={member} />}
        {activeTab === 'chat' && <Chat member={member} />}
        {activeTab === 'profile' && <Profile member={member} onLogout={() => { import('./lib/supabase').then(m => { m.clearSession(); m.supabase.auth.signOut() }); setMember(null) }} />}
      </main>

      <nav className="bottom-nav">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabSwitch(tab.id)}
            >
              <Icon size={22} />
              {tab.label}
              {tab.badge > 0 && (
                <span className="badge nav-badge">{tab.badge}</span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
