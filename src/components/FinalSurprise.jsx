import React, { useRef, useState, useEffect } from 'react'
import './FinalSurprise.css'

function Fireworks({ active }) {
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    if (!active) return
    const makeNew = () => {
      setBursts(prev => [
        ...prev.slice(-15),
        {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80,
          y: 5 + Math.random() * 60,
          color: ['#60a5fa', '#93c5fd', '#fde68a', '#f0c060', '#bfdbfe', '#fff'][Math.floor(Math.random() * 6)],
          size: 60 + Math.random() * 80,
        }
      ])
    }
    makeNew()
    const int = setInterval(makeNew, 600)
    return () => clearInterval(int)
  }, [active])

  return (
    <div className="fireworks-container" aria-hidden>
      {bursts.map(b => (
        <div
          key={b.id}
          className="firework-burst"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            '--fw-color': b.color,
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="fw-ray"
              style={{ transform: `rotate(${i * 45}deg)`, background: b.color }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function FinalSurprise() {
  const [visible, setVisible] = useState(false)
  const [fireworksOn, setFireworksOn] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          setTimeout(() => setFireworksOn(true), 800)
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const FLOATING = ['💙','⭐','💫','🌟','✨','💙','🎉','💙','⭐','✨','🌟','💫']

  return (
    <section className="final-section" ref={sectionRef}>
      <Fireworks active={fireworksOn} />

      {/* Floating elements */}
      {FLOATING.map((em, i) => (
        <div
          key={i}
          className="final-floater"
          style={{
            left: `${(i / FLOATING.length) * 100}%`,
            top: `${20 + (i % 4) * 15}%`,
            animationDelay: `${i * 0.4}s`,
            fontSize: 20 + (i % 3) * 8,
          }}
        >
          {em}
        </div>
      ))}

      <div className={`final-content ${visible ? 'final-visible' : ''}`}>
        <div className="final-badge">🎂 Special Day 🎂</div>

        <h2 className="final-heading">
          Once Again,
        </h2>
        <h1 className="final-big-heading">
          Happy Birthday<br />
          <span className="final-name-blue">Meera Shri</span>
        </h1>
        <h2 className="final-sub-heading">
          & <span className="final-name-gold">Roshini</span> 💙
        </h2>

        <div className="final-hearts">
          {['💙', '🌟', '💙', '✨', '💙', '⭐', '💙'].map((h, i) => (
            <span
              key={i}
              className="final-heart-item"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {h}
            </span>
          ))}
        </div>

        <p className="final-message">
          "May every day of your 20th year be filled with love, laughter, and the kind of magic that only you create.
          This birthday is just the beginning of your most beautiful chapter yet."
        </p>

        <div className="final-signature">
          <div className="final-sig-line" />
          <span className="final-sig-text">Made with 💙 just for you</span>
          <div className="final-sig-line" />
        </div>

        <div className="final-age-glow">
          <span className="final-age">20</span>
          <span className="final-age-unit">years of pure magic ✨</span>
        </div>

        <button
          className="final-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          💙 Relive from the Top 💙
        </button>
      </div>
    </section>
  )
}
