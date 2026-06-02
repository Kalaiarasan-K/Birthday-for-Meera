import React, { useEffect, useState } from 'react'
import './HeroSection.css'

const FLOATERS = [
  { emoji: '💙', size: 36, x: 8, y: 20, delay: 0 },
  { emoji: '🎈', size: 40, x: 85, y: 15, delay: 1 },
  { emoji: '⭐', size: 28, x: 15, y: 70, delay: 2 },
  { emoji: '🌟', size: 32, x: 90, y: 65, delay: 0.5 },
  { emoji: '💙', size: 24, x: 50, y: 8, delay: 1.5 },
  { emoji: '🎉', size: 34, x: 25, y: 40, delay: 3 },
  { emoji: '✨', size: 22, x: 75, y: 45, delay: 2.5 },
  { emoji: '🎀', size: 30, x: 60, y: 80, delay: 1.2 },
  { emoji: '💫', size: 26, x: 40, y: 90, delay: 0.8 },
  { emoji: '🌙', size: 28, x: 5, y: 50, delay: 3.5 },
  { emoji: '💎', size: 22, x: 95, y: 35, delay: 2.8 },
  { emoji: '🎊', size: 32, x: 70, y: 10, delay: 4 },
]

export default function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <section className="hero-section">
      {/* Background glow layers */}
      <div className="hero-bg-glow glow-a" />
      <div className="hero-bg-glow glow-b" />
      <div className="hero-bg-glow glow-c" />

      {/* Floating elements */}
      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className="floater"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: f.size,
            animationDelay: `${f.delay}s`,
          }}
        >
          {f.emoji}
        </div>
      ))}

      {/* Stars */}
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={`star-${i}`}
          className="hero-star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className={`hero-content ${visible ? 'visible' : ''}`}>
        <div className="hero-badge">
          <span className="hero-badge-text">✨ June 3rd, 2006 ✨</span>
        </div>

        <h1 className="hero-heading-main">
          Happy Birthday
        </h1>
        <h1 className="hero-heading-name">
          Meera Shri <span className="hero-heart">💙</span>
        </h1>

        <div className="hero-divider">
          <span className="divider-line" />
          <span className="divider-diamond">◆</span>
          <span className="divider-line" />
        </div>

        <h2 className="hero-heading-sub">
          Happy 20th Birthday
        </h2>
        <h2 className="hero-heading-nickname">
          Roshini <span>🎂</span>
        </h2>

        <p className="hero-tagline">
          "Twenty years of sunshine, laughter, and pure magic — this day celebrates you!"
        </p>

        <div className="hero-age-badge">
          <span className="age-number">20</span>
          <span className="age-label">Years of Brilliance</span>
        </div>

        <a href="#cake" className="hero-scroll-btn">
          🎂 Let's Celebrate!
        </a>
      </div>
    </section>
  )
}
