import { useState, useRef, useEffect } from 'react'
import { Send, Image, Smile } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import VoiceRecorder, { type VoiceMessage } from '../components/VoiceRecorder'
import VoiceMessageBubble from '../components/VoiceMessageBubble'
import { supabase, type Member } from '../lib/supabase'
import './Chat.css'

interface Message {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: Date
  isOwn: boolean
  voice?: VoiceMessage
  reactions?: Record<string, string[]>
  dbId?: string
}

const REACTIONS = ['🔥', '🤘', '🏉', '🍖', '😂']

interface Props {
  member: Member
}

export default function Chat({ member }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [reactionTarget, setReactionTarget] = useState<string | null>(null)
  const [typing, setTyping] = useState<{ author: string; avatar: string } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const longPressTimer = useRef<number>(0)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true

    loadMessages()

    const channel = supabase
      .channel('chat-messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, async (payload) => {
        const row = payload.new as { id: string; author_id: string; content: string; created_at: string; voice_url: string | null; voice_transcript: string | null }
        if (row.author_id === member.id) return

        const { data: author } = await supabase
          .from('members')
          .select('name')
          .eq('id', row.author_id)
          .single()

        const name = author?.name || 'Unknown'
        setTyping(null)
        setMessages(prev => [...prev, {
          id: row.id,
          dbId: row.id,
          author: name,
          avatar: name[0].toUpperCase(),
          content: row.content,
          timestamp: new Date(row.created_at),
          isOwn: false,
          voice: row.voice_url ? { audioUrl: row.voice_url, duration: 0, transcript: row.voice_transcript || undefined } : undefined,
        }])
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'reactions',
      }, () => {
        loadReactions()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [member.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  async function loadMessages() {
    const { data: rows } = await supabase
      .from('messages')
      .select('id, author_id, content, voice_url, voice_transcript, created_at, author:members!messages_author_id_fkey(id, name)')
      .order('created_at', { ascending: true })
      .limit(100)

    if (!rows) return

    const msgs: Message[] = rows.map((row: any) => {
      const authorName = row.author?.name || 'Unknown'
      return {
        id: row.id,
        dbId: row.id,
        author: row.author_id === member.id ? member.name : authorName,
        avatar: row.author_id === member.id ? member.name[0].toUpperCase() : authorName[0].toUpperCase(),
        content: row.content || '',
        timestamp: new Date(row.created_at),
        isOwn: row.author_id === member.id,
        voice: row.voice_url ? { audioUrl: row.voice_url, duration: 0, transcript: row.voice_transcript || undefined } : undefined,
      }
    })

    setMessages(msgs)
    loadReactions()
  }

  async function loadReactions() {
    const { data: reactions } = await supabase
      .from('reactions')
      .select('message_id, emoji, member:members!reactions_member_id_fkey(name)')

    if (!reactions) return

    const reactionMap: Record<string, Record<string, string[]>> = {}
    for (const r of reactions as any[]) {
      const msgId = r.message_id
      if (!reactionMap[msgId]) reactionMap[msgId] = {}
      const name = r.member?.name || 'Unknown'
      if (!reactionMap[msgId][r.emoji]) reactionMap[msgId][r.emoji] = []
      reactionMap[msgId][r.emoji].push(name === member.name ? 'You' : name)
    }

    setMessages(prev => prev.map(msg => ({
      ...msg,
      reactions: msg.dbId && reactionMap[msg.dbId] ? reactionMap[msg.dbId] : undefined,
    })))
  }

  async function sendMessage() {
    if (!newMessage.trim()) return
    const content = newMessage
    setNewMessage('')

    const tempId = Date.now().toString()
    setMessages(prev => [...prev, {
      id: tempId,
      author: member.name,
      avatar: member.name[0].toUpperCase(),
      content,
      timestamp: new Date(),
      isOwn: true,
    }])

    const { data } = await supabase
      .from('messages')
      .insert({ author_id: member.id, content })
      .select()
      .single()

    if (data) {
      setMessages(prev => prev.map(m => m.id === tempId ? { ...m, dbId: data.id, id: data.id } : m))
    }
  }

  function handleVoice(voice: VoiceMessage) {
    const tempId = Date.now().toString()
    setMessages(prev => [...prev, {
      id: tempId,
      author: member.name,
      avatar: member.name[0].toUpperCase(),
      content: '',
      timestamp: new Date(),
      isOwn: true,
      voice,
    }])

    supabase
      .from('messages')
      .insert({ author_id: member.id, content: '', voice_transcript: voice.transcript || null })
      .select()
      .single()
      .then(({ data }) => {
        if (data) {
          setMessages(prev => prev.map(m => m.id === tempId ? { ...m, dbId: data.id, id: data.id } : m))
        }
      })
  }

  function handleLongPressStart(msgId: string) {
    longPressTimer.current = window.setTimeout(() => {
      setReactionTarget(prev => prev === msgId ? null : msgId)
    }, 500)
  }

  function handleLongPressEnd() {
    clearTimeout(longPressTimer.current)
  }

  async function toggleReaction(msgId: string, emoji: string) {
    setReactionTarget(null)

    const msg = messages.find(m => m.id === msgId)
    if (!msg?.dbId) return

    const existing = msg.reactions?.[emoji]?.includes('You')

    if (existing) {
      await supabase
        .from('reactions')
        .delete()
        .eq('message_id', msg.dbId)
        .eq('member_id', member.id)
        .eq('emoji', emoji)
    } else {
      await supabase
        .from('reactions')
        .insert({ message_id: msg.dbId, member_id: member.id, emoji })
    }
  }

  let lastAuthor = ''

  return (
    <div className="page chat-page" onClick={() => setReactionTarget(null)}>
      <div className="chat-header-bar">
        <div className="chat-group-info">
          <div className="chat-group-avatars">
            <span>🔥</span>
          </div>
          <div>
            <div className="chat-group-name">The Braai Pit Crew</div>
            <div className="chat-group-members">Group chat</div>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <p>No messages yet. Be the first to say something!</p>
          </div>
        )}

        {messages.map(msg => {
          const showAvatar = msg.author !== lastAuthor
          lastAuthor = msg.author
          const hasReactions = msg.reactions && Object.keys(msg.reactions).length > 0
          return (
            <div key={msg.id} className={`chat-msg ${msg.isOwn ? 'own' : ''} ${showAvatar ? '' : 'grouped'}`}>
              {!msg.isOwn && showAvatar && <div className="avatar">{msg.avatar}</div>}
              {!msg.isOwn && !showAvatar && <div className="avatar-spacer" />}
              <div className="chat-bubble-wrap">
                <div
                  className="chat-bubble"
                  onTouchStart={() => handleLongPressStart(msg.id)}
                  onTouchEnd={handleLongPressEnd}
                  onTouchCancel={handleLongPressEnd}
                  onContextMenu={e => { e.preventDefault(); setReactionTarget(msg.id) }}
                >
                  {!msg.isOwn && showAvatar && (
                    <span className="chat-author">{msg.author}</span>
                  )}
                  {msg.voice ? (
                    <VoiceMessageBubble
                      audioUrl={msg.voice.audioUrl}
                      duration={msg.voice.duration}
                      transcript={msg.voice.transcript}
                    />
                  ) : (
                    <p>{msg.content}</p>
                  )}
                  <span className="chat-time">
                    {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                  </span>
                </div>

                {reactionTarget === msg.id && (
                  <div className="reaction-picker" onClick={e => e.stopPropagation()}>
                    {REACTIONS.map(emoji => (
                      <button
                        key={emoji}
                        className="reaction-option"
                        onClick={() => toggleReaction(msg.id, emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                {hasReactions && (
                  <div className="reaction-bar">
                    {Object.entries(msg.reactions!).map(([emoji, users]) => (
                      <button
                        key={emoji}
                        className={`reaction-chip ${users.includes('You') ? 'own' : ''}`}
                        onClick={e => { e.stopPropagation(); toggleReaction(msg.id, emoji) }}
                      >
                        {emoji} <span>{users.length}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {typing && (
          <div className="chat-msg typing-msg">
            <div className="avatar">{typing.avatar}</div>
            <div className="chat-bubble">
              <span className="chat-author">{typing.author}</span>
              <div className="typing-dots">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-bar">
        <button className="icon-btn" aria-label="Add emoji">
          <Smile size={22} />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button className="icon-btn" aria-label="Add photo">
          <Image size={22} />
        </button>
        {newMessage.trim() ? (
          <button className="chat-send" onClick={sendMessage} aria-label="Send">
            <Send size={18} />
          </button>
        ) : null}
      </div>

      <VoiceRecorder onRecorded={handleVoice} />
    </div>
  )
}
