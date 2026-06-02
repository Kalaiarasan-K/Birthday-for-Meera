import React, { useRef, useEffect } from 'react'
import './MusicPlayer.css'

export default function MusicPlayer({ playing, setPlaying }) {
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/audio/birthday-song.mp3')
    audioRef.current.loop = true

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.play().catch(() => {
        // optional: handle browser autoplay restrictions
      })
    } else {
      audioRef.current.pause()
    }
  }, [playing])

  const toggle = () => {
    setPlaying(p => !p)
  }

  return (
    <button
      className={`music-btn ${playing ? 'playing' : ''}`}
      onClick={toggle}
      title={playing ? 'Pause Music' : 'Play Music'}
    >
      <div className="music-icon">
        {playing ? '🎵' : '🎶'}
      </div>
      {playing && (
        <div className="music-bars">
          <span /><span /><span /><span />
        </div>
      )}
    </button>
  )
}
