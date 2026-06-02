import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import BirthdayHome from './components/BirthdayHome'
import CountdownReveal from './components/CountdownReveal'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  const [page, setPage] = useState('login') // 'login' | 'countdown' | 'home'
  const [musicPlaying, setMusicPlaying] = useState(true)

  const handleLoginSuccess = () => {
    setPage('countdown')
  }

  const handleCountdownDone = () => {
    setPage('home')
  }

  return (
    <div className="app">
      {page === 'login' && <Login onSuccess={handleLoginSuccess} />}
      {page === 'countdown' && <CountdownReveal onDone={handleCountdownDone} />}
      {page === 'home' && (
        <>
          <MusicPlayer playing={musicPlaying} setPlaying={setMusicPlaying} />
          <BirthdayHome />
        </>
      )}
    </div>
  )
}
