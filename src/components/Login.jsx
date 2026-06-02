import React, { useState, useEffect } from 'react'
import PuzzlePopup from './PuzzlePopup'
import './Login.css'

const VALID_USERNAMES = ['meera shri', 'roshini']
const VALID_PASSWORD = '03/06/2006'

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPuzzle, setShowPuzzle] = useState(false)
  const [particles, setParticles] = useState([])
  const [shake, setShake] = useState(false)

  useEffect(() => {
    const p = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 4,
      type: Math.random() > 0.5 ? 'star' : 'dot',
    }))
    setParticles(p)
  }, [])

  const handleLogin = () => {
    const uNorm = username.trim().toLowerCase()
    if (!VALID_USERNAMES.includes(uNorm)) {
      setError('Who are you? 🤔 Try "Meera Shri" or "Roshini"')
      triggerShake()
      return
    }
    if (password === VALID_PASSWORD) {
      setError('')
      onSuccess()
    } else {
      setError('Oops! Wrong password... can you solve the puzzle? 💙')
      triggerShake()
      setTimeout(() => setShowPuzzle(true), 600)
    }
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="login-page">
      {/* Animated background particles */}
      <div className="login-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className={`login-particle ${p.type}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Login card */}
      <div className={`login-card ${shake ? 'shake' : ''}`}>
        <div className="login-header">
          <div className="login-icon">💙</div>
          <h1 className="login-title">Welcome</h1>
          <p className="login-subtitle">A surprise awaits you...</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label className="input-label">Your Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                className="login-input"
                placeholder="Meera Shri or Roshini"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Secret Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔑</span>
              <input
                type="password"
                className="login-input"
                placeholder="Your special date..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {error && (
            <div className="login-error">
              <span>{error}</span>
            </div>
          )}

          <button className="login-btn" onClick={handleLogin}>
            <span className="login-btn-text">Open My Surprise 🎁</span>
            <span className="login-btn-shine" />
          </button>
        </div>

        <div className="login-footer">
          <p>💙 Made with love, just for you 💙</p>
        </div>
      </div>

      {showPuzzle && (
        <PuzzlePopup
          onClose={() => setShowPuzzle(false)}
          onReveal={() => {
            setShowPuzzle(false)
            setPassword(VALID_PASSWORD)
          }}
          correctPassword={VALID_PASSWORD}
          onSuccess={onSuccess}
        />
      )}
    </div>
  )
}
