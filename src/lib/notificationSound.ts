let audioCtx: AudioContext | null = null

function getContext(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

function kick(ctx: AudioContext, time: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)

  // Deep bass drum — pitch drops from 160Hz to 40Hz
  osc.frequency.setValueAtTime(160, time)
  osc.frequency.exponentialRampToValueAtTime(40, time + 0.08)

  gain.gain.setValueAtTime(0.9, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15)

  osc.start(time)
  osc.stop(time + 0.15)

  // Add a click/attack transient with noise
  const bufferSize = ctx.sampleRate * 0.02
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const noiseGain = ctx.createGain()
  noise.connect(noiseGain)
  noiseGain.connect(ctx.destination)
  noiseGain.gain.setValueAtTime(0.3, time)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02)
  noise.start(time)
}

export function playDoubleKick() {
  try {
    const ctx = getContext()
    if (ctx.state === 'suspended') ctx.resume()
    const now = ctx.currentTime
    kick(ctx, now)
    kick(ctx, now + 0.1)
  } catch {
    // Audio not available
  }
}

export function playTripleKick() {
  try {
    const ctx = getContext()
    if (ctx.state === 'suspended') ctx.resume()
    const now = ctx.currentTime
    kick(ctx, now)
    kick(ctx, now + 0.08)
    kick(ctx, now + 0.16)
  } catch {
    // Audio not available
  }
}
