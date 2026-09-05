import { useState, useRef } from 'react'
import { Heart, MessageCircle, Share2, Image, Send, MoreHorizontal, X } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { type Member } from '../lib/supabase'
import './Feed.css'

interface Post {
  id: string
  author: string
  avatar: string
  content: string
  image?: string
  likes: number
  comments: number
  liked: boolean
  timestamp: Date
  channel?: string
}

interface Props {
  member: Member
}

const DEMO_POSTS: Post[] = [
  {
    id: '1',
    author: 'Boet',
    avatar: 'B',
    content: 'Brisket came out perfect today! 12 hours low and slow over the coals. Who wants some? 🔥🥩',
    likes: 8,
    comments: 3,
    liked: false,
    timestamp: new Date(Date.now() - 3600000),
    channel: 'braai',
  },
  {
    id: '2',
    author: 'Riaan',
    avatar: 'R',
    content: 'Finally got the Hilux lifted! 2 inch suspension lift + new BFGoodrich all-terrains. This weekend we ride! 🏍️💨',
    likes: 12,
    comments: 5,
    liked: true,
    timestamp: new Date(Date.now() - 7200000),
    channel: 'bikes',
  },
  {
    id: '3',
    author: 'Danie',
    avatar: 'D',
    content: 'Bokke 32-12! What a game! Cheslin was absolutely on fire today 🏉🇿🇦',
    likes: 15,
    comments: 7,
    liked: false,
    timestamp: new Date(Date.now() - 14400000),
    channel: 'rugby',
  },
  {
    id: '4',
    author: 'Johan',
    avatar: 'J',
    content: 'Just discovered this Seether track from their new album. SA rock still going strong! Anyone keen for a jam session this weekend? 🎸',
    likes: 6,
    comments: 2,
    liked: false,
    timestamp: new Date(Date.now() - 28800000),
    channel: 'music',
  },
  {
    id: '5',
    author: 'Pieter',
    avatar: 'P',
    content: 'Why do braai masters make the best employees? Because they know how to handle the heat and never leave their post! 😂',
    likes: 9,
    comments: 4,
    liked: true,
    timestamp: new Date(Date.now() - 43200000),
    channel: 'jokes',
  },
]

const channelEmojis: Record<string, string> = {
  braai: '🔥',
  cars: '🚗',
  rugby: '🏉',
  bikes: '🏍️',
  music: '🎸',
  jokes: '😂',
}

export default function Feed({ member }: Props) {
  const [posts, setPosts] = useState(DEMO_POSTS)
  const [newPost, setNewPost] = useState('')
  const [pendingImage, setPendingImage] = useState<string | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function toggleLike(id: string) {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPendingImage(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  function handlePost() {
    if (!newPost.trim() && !pendingImage) return
    const post: Post = {
      id: Date.now().toString(),
      author: member.name,
      avatar: member.name[0].toUpperCase(),
      content: newPost,
      image: pendingImage || undefined,
      likes: 0,
      comments: 0,
      liked: false,
      timestamp: new Date(),
    }
    setPosts(prev => [post, ...prev])
    setNewPost('')
    setPendingImage(null)
  }

  return (
    <div className="page feed-page">
      <div className="compose-bar">
        <div className="avatar">{member.name[0].toUpperCase()}</div>
        <input
          type="text"
          placeholder="What's on the braai today?"
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handlePost()}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="file-input-hidden"
          onChange={handleImageSelect}
        />
        <button
          className="compose-media icon-btn"
          aria-label="Add photo"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>
        {(newPost.trim() || pendingImage) && (
          <button className="compose-send" onClick={handlePost} aria-label="Post">
            <Send size={18} />
          </button>
        )}
      </div>

      {pendingImage && (
        <div className="compose-preview">
          <img src={pendingImage} alt="Preview" />
          <button
            className="compose-preview-remove"
            onClick={() => setPendingImage(null)}
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="feed-list">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <div className="avatar">{post.avatar}</div>
              <div className="post-meta">
                <span className="post-author">{post.author}</span>
                <span className="post-time">
                  {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                  {post.channel && (
                    <span className="post-channel">
                      {' '} in {channelEmojis[post.channel]} {post.channel}
                    </span>
                  )}
                </span>
              </div>
              <button className="icon-btn post-more" aria-label="More options">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <p className="post-content">{post.content}</p>

            {post.image && (
              <div className="post-image" onClick={() => setLightboxImage(post.image!)}>
                <img src={post.image} alt="" />
              </div>
            )}

            <div className="post-actions">
              <button
                className={`post-action ${post.liked ? 'liked' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                <Heart size={18} fill={post.liked ? 'currentColor' : 'none'} />
                <span>{post.likes}</span>
              </button>
              <button className="post-action">
                <MessageCircle size={18} />
                <span>{post.comments}</span>
              </button>
              <button className="post-action">
                <Share2 size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <button className="lightbox-close" aria-label="Close">
            <X size={24} />
          </button>
          <img src={lightboxImage} alt="" />
        </div>
      )}
    </div>
  )
}
