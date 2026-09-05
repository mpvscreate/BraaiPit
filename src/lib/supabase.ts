import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kclecchxzmmwampfsxku.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbGVjY2h4em1td2FtcGZzeGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2Mjk1MzYsImV4cCI6MjEwNDIwNTUzNn0.fgnKUr_YsNey9SNOJnFWSVZcvnzS0B3oV7lhy_bZ7yM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Member {
  id: string
  auth_id: string
  name: string
  avatar_url: string | null
  is_online: boolean
  created_at: string
}

export interface DbMessage {
  id: string
  author_id: string
  content: string
  voice_url: string | null
  voice_transcript: string | null
  created_at: string
  author?: Member
}

export interface DbReaction {
  id: string
  message_id: string
  member_id: string
  emoji: string
}

export interface DbPost {
  id: string
  author_id: string
  content: string
  image_url: string | null
  channel: string | null
  created_at: string
  author?: Member
}

const SESSION_KEY = 'braaipit_session'

interface StoredSession {
  email: string
  memberId: string
  name: string
}

export function getStoredSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function storeSession(session: StoredSession) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)) } catch {}
}

export function clearSession() {
  try { localStorage.removeItem(SESSION_KEY) } catch {}
}

export async function signUp(name: string, pin: string): Promise<{ member: Member } | { error: string }> {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'user'
  const email = `${slug}-${crypto.randomUUID().slice(0, 8)}@example.com`

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: pin,
  })

  if (authError || !authData.user) {
    return { error: authError?.message || 'Sign up failed' }
  }

  const { data: member, error: memberError } = await supabase
    .from('members')
    .insert({ auth_id: authData.user.id, name })
    .select()
    .single()

  if (memberError || !member) {
    return { error: memberError?.message || 'Failed to create profile' }
  }

  storeSession({ email, memberId: member.id, name })
  return { member: member as Member }
}

export async function signIn(email: string, pin: string): Promise<{ member: Member } | { error: string }> {
  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: pin,
  })

  if (authError) {
    return { error: authError.message }
  }

  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return { error: 'No session' }

  const { data: member } = await supabase
    .from('members')
    .select()
    .eq('auth_id', session.session.user.id)
    .single()

  if (!member) return { error: 'Member not found' }

  return { member: member as Member }
}

export async function restoreSession(): Promise<Member | null> {
  const { data } = await supabase.auth.getSession()
  if (!data.session) return null

  const { data: member } = await supabase
    .from('members')
    .select()
    .eq('auth_id', data.session.user.id)
    .single()

  return member as Member | null
}
