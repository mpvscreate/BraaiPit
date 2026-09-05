import { useState } from 'react'
import { ArrowLeft, Send, Image, Users } from 'lucide-react'
import { channels, type Channel } from '../data/channels'
import { formatDistanceToNow } from 'date-fns'
import { type Member } from '../lib/supabase'
import './Channels.css'

interface ChannelMessage {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: Date
}

const DEMO_MESSAGES: Record<string, ChannelMessage[]> = {
  braai: [
    { id: '1', author: 'Boet', avatar: 'B', content: 'Who\'s bringing the wors this Saturday?', timestamp: new Date(Date.now() - 1800000) },
    { id: '2', author: 'Riaan', avatar: 'R', content: 'I\'ll sort the wors and boerewors rolls. Someone bring the braai relish!', timestamp: new Date(Date.now() - 1200000) },
    { id: '3', author: 'Danie', avatar: 'D', content: 'I\'ve got a new biltong marinade recipe to try. Prepare yourselves 🔥', timestamp: new Date(Date.now() - 600000) },
  ],
  cars: [
    { id: '1', author: 'Johan', avatar: 'J', content: 'Check this turbo kit I found for the Ranger. Thoughts?', timestamp: new Date(Date.now() - 3600000) },
    { id: '2', author: 'Pieter', avatar: 'P', content: 'Bro that\'s the one! Install it and let\'s do a dyno run', timestamp: new Date(Date.now() - 3000000) },
  ],
  rugby: [
    { id: '1', author: 'Danie', avatar: 'D', content: 'Bokke team announcement for Saturday just dropped!', timestamp: new Date(Date.now() - 7200000) },
    { id: '2', author: 'Boet', avatar: 'B', content: 'Kolisi at 6 again? Let\'s gooo 🏉', timestamp: new Date(Date.now() - 5400000) },
    { id: '3', author: 'Riaan', avatar: 'R', content: 'Watching at my place. Braai from 14:00, kickoff at 17:00', timestamp: new Date(Date.now() - 3600000) },
  ],
  bikes: [
    { id: '1', author: 'Pieter', avatar: 'P', content: 'New trail opened up near Hartbeespoort. 15km single track! 🤘', timestamp: new Date(Date.now() - 14400000) },
    { id: '2', author: 'Johan', avatar: 'J', content: 'I\'m in! Sunday morning early?', timestamp: new Date(Date.now() - 10800000) },
  ],
  music: [
    { id: '1', author: 'Johan', avatar: 'J', content: 'New Fokofpolisiekar album dropping next month!', timestamp: new Date(Date.now() - 86400000) },
    { id: '2', author: 'Boet', avatar: 'B', content: 'No way! Their last one was insane. 🎸🎸🎸', timestamp: new Date(Date.now() - 72000000) },
  ],
  jokes: [
    { id: '1', author: 'Pieter', avatar: 'P', content: 'What do you call a Springbok fan who doesn\'t drink beer? A tourist! 😂', timestamp: new Date(Date.now() - 43200000) },
    { id: '2', author: 'Danie', avatar: 'D', content: 'Why did the braai cross the road? To get to the other side dish! 🤦‍♂️', timestamp: new Date(Date.now() - 36000000) },
  ],
}

interface Props {
  member: Member
}

export default function Channels({ member }: Props) {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)
  const [messages, setMessages] = useState(DEMO_MESSAGES)
  const [newMessage, setNewMessage] = useState('')

  function sendMessage() {
    if (!newMessage.trim() || !activeChannel) return
    const msg: ChannelMessage = {
      id: Date.now().toString(),
      author: member.name,
      avatar: member.name[0].toUpperCase(),
      content: newMessage,
      timestamp: new Date(),
    }
    setMessages(prev => ({
      ...prev,
      [activeChannel.id]: [...(prev[activeChannel.id] || []), msg],
    }))
    setNewMessage('')
  }

  if (activeChannel) {
    const channelMessages = messages[activeChannel.id] || []
    return (
      <div className="page channel-view">
        <div className="channel-header">
          <button className="icon-btn" onClick={() => setActiveChannel(null)}>
            <ArrowLeft size={22} />
          </button>
          <span className="channel-header-icon">{activeChannel.icon}</span>
          <div className="channel-header-info">
            <span className="channel-header-name">{activeChannel.name}</span>
            <span className="channel-header-desc">{activeChannel.description}</span>
          </div>
          <button className="icon-btn">
            <Users size={20} />
          </button>
        </div>

        <div className="channel-messages">
          {channelMessages.map(msg => (
            <div key={msg.id} className={`channel-msg ${msg.author === member.name ? 'own' : ''}`}>
              {msg.author !== 'You' && <div className="avatar">{msg.avatar}</div>}
              <div className="channel-msg-bubble">
                {msg.author !== 'You' && (
                  <span className="channel-msg-author">{msg.author}</span>
                )}
                <p>{msg.content}</p>
                <span className="channel-msg-time">
                  {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="channel-input-bar">
          <button className="icon-btn" aria-label="Add photo">
            <Image size={20} />
          </button>
          <input
            type="text"
            placeholder={`Message #${activeChannel.name.toLowerCase()}...`}
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          {newMessage.trim() && (
            <button className="channel-send" onClick={sendMessage} aria-label="Send">
              <Send size={18} />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page channels-page">
      <div className="section-header">CHANNELS</div>
      <div className="channels-grid">
        {channels.map(channel => {
          const lastMsg = (messages[channel.id] || []).at(-1)
          return (
            <button
              key={channel.id}
              className="channel-card"
              onClick={() => setActiveChannel(channel)}
            >
              <div className="channel-icon" style={{ background: `${channel.color}20`, color: channel.color }}>
                <span>{channel.icon}</span>
              </div>
              <div className="channel-info">
                <span className="channel-name">{channel.name}</span>
                <span className="channel-desc">
                  {lastMsg ? lastMsg.content : channel.description}
                </span>
              </div>
              {lastMsg && (
                <span className="channel-time">
                  {formatDistanceToNow(lastMsg.timestamp, { addSuffix: false })}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
