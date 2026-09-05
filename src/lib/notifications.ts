import { playDoubleKick } from './notificationSound'

type Listener = (counts: NotificationCounts) => void

export interface NotificationCounts {
  chat: number
  channels: number
  total: number
}

let counts: NotificationCounts = { chat: 0, channels: 0, total: 0 }
const listeners = new Set<Listener>()

function notify() {
  counts = { ...counts, total: counts.chat + counts.channels }
  listeners.forEach(fn => fn(counts))
  updateAppBadge(counts.total)
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn)
  fn(counts)
  return () => listeners.delete(fn)
}

export function getCounts(): NotificationCounts {
  return { ...counts }
}

export function addChatNotification(n = 1) {
  counts.chat += n
  notify()
  playDoubleKick()
}

export function addChannelNotification(n = 1) {
  counts.channels += n
  notify()
  playDoubleKick()
}

export function clearChat() {
  counts.chat = 0
  notify()
}

export function clearChannels() {
  counts.channels = 0
  notify()
}

export function clearAll() {
  counts.chat = 0
  counts.channels = 0
  notify()
}

function updateAppBadge(count: number) {
  try {
    if ('setAppBadge' in navigator) {
      if (count > 0) {
        (navigator as any).setAppBadge(count)
      } else {
        (navigator as any).clearAppBadge()
      }
    }
  } catch {
    // Badge API not available
  }
}

// Simulate incoming messages for demo
const incomingMessages = [
  { delay: 15000, type: 'chat' as const, from: 'Boet', text: 'Who\'s bringing the rolls?' },
  { delay: 30000, type: 'channel' as const, from: 'Riaan', text: 'Check this new trail!' },
  { delay: 50000, type: 'chat' as const, from: 'Danie', text: 'Bru the game starts at 5!' },
]

let simStarted = false

export function startSimulation() {
  if (simStarted) return
  simStarted = true

  incomingMessages.forEach(msg => {
    setTimeout(() => {
      if (msg.type === 'chat') addChatNotification()
      else addChannelNotification()
    }, msg.delay)
  })
}
