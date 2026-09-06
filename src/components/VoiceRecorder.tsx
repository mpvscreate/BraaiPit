import { useState, useRef, useCallback } from 'react'
import { Square, X } from 'lucide-react'
import VintageMic from './VintageMic'
import './VoiceRecorder.css'

export interface VoiceMessage {
  audioUrl: string
  duration: number
  transcript?: string
}

interface Props {
  onRecorded: (voice: VoiceMessage) => void
}

const MOCK_TRANSCRIPTS = [
  "Hey boet, just checking if you're still coming Saturday?",
  "The braai is going to be epic, don't forget the wors!",
  "Did you see that try? Absolutely unbelievable!",
  "My bike is finally fixed, we should hit the trails this weekend",
  "Check out this new track, it's an absolute banger",
  "Anyone keen to go fishing before the braai?",
  "Bru, you need to try this marinade recipe, it's next level",
]

export default function VoiceRecorder({ onRecorded }: Props) {
  const [isRecording, setIsRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(0)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(blob)
        const finalDuration = Math.round((Date.now() - startTimeRef.current) / 1000)
        const transcript = MOCK_TRANSCRIPTS[Math.floor(Math.random() * MOCK_TRANSCRIPTS.length)]

        onRecorded({ audioUrl, duration: finalDuration, transcript })
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      startTimeRef.current = Date.now()
      setIsRecording(true)
      setDuration(0)

      timerRef.current = setInterval(() => {
        setDuration(Math.round((Date.now() - startTimeRef.current) / 1000))
      }, 200)
    } catch {
      const transcript = MOCK_TRANSCRIPTS[Math.floor(Math.random() * MOCK_TRANSCRIPTS.length)]
      onRecorded({ audioUrl: '', duration: 3, transcript })
    }
  }, [onRecorded])

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
    setDuration(0)
  }, [])

  const cancelRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.onstop = null
      mediaRecorderRef.current.stop()
      const stream = mediaRecorderRef.current.stream
      stream.getTracks().forEach(track => track.stop())
    }
    setIsRecording(false)
    setDuration(0)
  }, [])

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (isRecording) {
    return (
      <div className="voice-recording-bar">
        <button className="voice-cancel" onClick={cancelRecording} aria-label="Cancel recording">
          <X size={20} />
        </button>
        <div className="voice-recording-indicator">
          <span className="voice-pulse" />
          <span className="voice-timer">{formatTime(duration)}</span>
          <span className="voice-label">Recording...</span>
        </div>
        <button className="voice-stop" onClick={stopRecording} aria-label="Stop and send">
          <Square size={16} fill="currentColor" />
        </button>
      </div>
    )
  }

  return (
    <button className="voice-fab" onClick={startRecording} aria-label="Record voice message">
      <VintageMic size={26} />
    </button>
  )
}
