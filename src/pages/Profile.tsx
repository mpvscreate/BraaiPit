import { useState, useEffect } from 'react'
import { Camera, LogOut, Bell, Moon, Share2, ChevronRight, Copy, Check } from 'lucide-react'
import { supabase, type Member } from '../lib/supabase'
import './Profile.css'

interface Props {
  member: Member
  onLogout: () => void
}

export default function Profile({ member, onLogout }: Props) {
  const [copied, setCopied] = useState(false)
  const [crew, setCrew] = useState<{ name: string; is_online: boolean }[]>([])

  useEffect(() => {
    supabase
      .from('members')
      .select('name, is_online')
      .neq('id', member.id)
      .then(({ data }) => {
        if (data) setCrew(data)
      })
  }, [member.id])

  function copyInvite() {
    navigator.clipboard.writeText('https://braaipit.app/join/CREW2024').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="page profile-page">
      <div className="profile-hero">
        <div className="profile-avatar-lg">
          <span>{member.name[0].toUpperCase()}</span>
          <button className="profile-camera" aria-label="Change photo">
            <Camera size={16} />
          </button>
        </div>
        <h2 className="profile-name">{member.name}</h2>
        <p className="profile-status">Member of The Braai Pit</p>
      </div>

      <div className="profile-invite-card">
        <div className="invite-header">
          <Share2 size={18} />
          <span>Invite to The Braai Pit</span>
        </div>
        <div className="invite-link-row">
          <code className="invite-code">braaipit.app/join/CREW2024</code>
          <button className="invite-copy" onClick={copyInvite}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <p className="invite-hint">Share this link with mates to join the crew</p>
      </div>

      <div className="profile-section">
        <div className="section-header">SETTINGS</div>
        <div className="settings-list">
          <button className="settings-item">
            <Bell size={20} />
            <span>Notifications</span>
            <ChevronRight size={18} className="settings-chevron" />
          </button>
          <button className="settings-item">
            <Moon size={20} />
            <span>Appearance</span>
            <span className="settings-value">Dark</span>
            <ChevronRight size={18} className="settings-chevron" />
          </button>
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header">CREW</div>
        <div className="crew-list">
          {crew.map(c => (
            <div key={c.name} className="crew-member">
              <div className="avatar">{c.name[0].toUpperCase()}</div>
              <span className="crew-name">{c.name}</span>
              <span className={`crew-status ${c.is_online ? 'online' : ''}`} />
            </div>
          ))}
          {crew.length === 0 && (
            <p style={{ color: 'var(--text-muted)', padding: '12px 0', fontSize: '14px' }}>
              No crew members yet. Invite your mates!
            </p>
          )}
        </div>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={18} />
        <span>Leave The Braai Pit</span>
      </button>

      <p className="profile-version">The Braai Pit v1.0.0</p>
    </div>
  )
}
