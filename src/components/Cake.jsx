import React, { useState, useEffect } from 'react'
import './Cake.css'

function Confetti({ active }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (active) {
      const p = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#60a5fa', '#93c5fd', '#fde68a', '#f0c060', '#bfdbfe', '#fff', '#3b82f6'][Math.floor(Math.random() * 7)],
        size: Math.random() * 10 + 6,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 2,
        rotate: Math.random() * 360,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        drift: (Math.random() - 0.5) * 200,
      }))
      setPieces(p)
    } else {
      setPieces([])
    }
  }, [active])

  return (
    <div className="confetti-container">
      {pieces.map(p => (
        <div
          key={p.id}
          className={`confetti-piece ${p.shape}`}
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.shape === 'circle' ? p.size : p.size * 0.6,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

export default function Cake() {
  const [blown, setBlown] = useState(false)
  const [showSmoke, setShowSmoke] = useState(false)
  const [showWish, setShowWish] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [wishVisible, setWishVisible] = useState(false)

  useEffect(() => {
    if (showWish) {
      document.body.style.overflow = 'hidden'
      const hideTimer = setTimeout(() => {
        setWishVisible(false)
        setTimeout(() => setShowWish(false), 200)
      }, 5000)
      return () => clearTimeout(hideTimer)
    }

    document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [showWish])

  const blowCandle = () => {
    if (blown) return
    setBlown(true)
    setShowSmoke(true)
    setShowConfetti(true)
    setTimeout(() => setShowSmoke(false), 3000)
    setTimeout(() => { setShowWish(true); setTimeout(() => setWishVisible(true), 100) }, 1200)
    setTimeout(() => setShowConfetti(false), 5000)
  }


  return (
    <section id="cake" className="cake-section">
      <Confetti active={showConfetti} />

      <div className="cake-header">
        <h2 className="section-title">🎂 Make a Wish</h2>
        <p className="cake-subtitle">
          {blown ? 'Your wish is flying to the universe 🌟' : 'Click the candle flame to blow it 🎂'}
        </p>
      </div>

      <div className="cake-wrapper">
        {/* Candle and flame */}
        <div className="candle-area" onClick={blowCandle} title="Click to blow the candle!">
          {/* Flame */}
          {!blown && (
            <div className="flame-container">
              <div className="flame-outer" />
              <div className="flame-inner" />
              <div className="flame-core" />
              <div className="flame-glow" />
              <div className="flame-click-hint">👆 Click!</div>
            </div>
          )}

          {/* Smoke */}
          {showSmoke && (
            <div className="smoke-container">
              <div className="smoke s1" />
              <div className="smoke s2" />
              <div className="smoke s3" />
            </div>
          )}

          {/* Candle body */}
          <div className="candle-body">
            <div className="candle-stripe" />
            <div className="candle-stripe" />
            <div className="candle-stripe" />
          </div>
          <div className="candle-base" />
        </div>

        {/* Cake SVG */}
        <div className="cake-visual">
          <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" className="cake-svg">
            {/* Plate */}
            <ellipse cx="160" cy="248" rx="155" ry="10" fill="rgba(37,99,235,0.15)" />

            {/* Bottom tier */}
            <rect x="20" y="160" width="280" height="80" rx="8" fill="url(#tierGradient1)" />
            <ellipse cx="160" cy="160" rx="140" ry="16" fill="url(#topEllipse1)" />
            <ellipse cx="160" cy="240" rx="140" ry="10" fill="rgba(10,30,100,0.5)" />

            {/* Bottom tier frosting drips */}
            {[40,70,100,130,160,190,220,250,280].map((x, i) => (
              <ellipse key={i} cx={x} cy={160} rx={10} ry={14 + Math.sin(i) * 4} fill="rgba(255,255,255,0.7)" />
            ))}

            {/* Middle tier */}
            <rect x="55" y="90" width="210" height="70" rx="8" fill="url(#tierGradient2)" />
            <ellipse cx="160" cy="90" rx="105" ry="14" fill="url(#topEllipse2)" />
            <ellipse cx="160" cy="160" rx="105" ry="10" fill="rgba(10,30,80,0.3)" />

            {/* Middle tier frosting */}
            {[70,100,130,160,190,220,250].map((x, i) => (
              <ellipse key={i} cx={x} cy={90} rx={8} ry={12 + Math.cos(i)*3} fill="rgba(255,255,255,0.75)" />
            ))}

            {/* Top tier */}
            <rect x="95" y="30" width="130" height="62" rx="8" fill="url(#tierGradient3)" />
            <ellipse cx="160" cy="30" rx="65" ry="12" fill="url(#topEllipse3)" />

            {/* Top tier frosting */}
            {[105,130,160,190,215].map((x, i) => (
              <ellipse key={i} cx={x} cy={30} rx={6} ry={10 + Math.sin(i)*2} fill="rgba(255,255,255,0.8)" />
            ))}

            {/* Decorative dots */}
            {[50,80,110,140,170,200,230,270].map((x, i) => (
              <circle key={i} cx={x} cy={195 + (i%3)*5} r={5} fill={i%2===0 ? '#fde68a' : '#93c5fd'} />
            ))}
            {[75,115,155,195,235].map((x, i) => (
              <circle key={i} cx={x} cy={125} r={4} fill={i%2===0 ? '#60a5fa' : '#fde68a'} />
            ))}

            {/* "Happy Birthday" text on middle tier */}
            <text x="160" y="132" textAnchor="middle" fontFamily="Dancing Script, cursive" fontSize="13" fill="rgba(255,255,255,0.9)" fontWeight="700">
              Happy Birthday!
            </text>

            {/* "20" on top tier */}
            <text x="160" y="68" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="22" fill="rgba(255,255,255,0.95)" fontWeight="900">
              20
            </text>

            {/* Blue heart decorations */}
            <text x="85" y="185" fontSize="16" fill="#60a5fa">💙</text>
            <text x="230" y="185" fontSize="16" fill="#60a5fa">💙</text>
            <text x="115" y="115" fontSize="12" fill="#fde68a">⭐</text>
            <text x="205" y="115" fontSize="12" fill="#fde68a">⭐</text>

            <defs>
              <linearGradient id="tierGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
              <linearGradient id="tierGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="tierGradient3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <radialGradient id="topEllipse1">
                <stop offset="0%" stopColor="rgba(96,165,250,0.8)" />
                <stop offset="100%" stopColor="rgba(37,99,235,0.3)" />
              </radialGradient>
              <radialGradient id="topEllipse2">
                <stop offset="0%" stopColor="rgba(96,165,250,0.8)" />
                <stop offset="100%" stopColor="rgba(37,99,235,0.3)" />
              </radialGradient>
              <radialGradient id="topEllipse3">
                <stop offset="0%" stopColor="rgba(147,197,253,0.9)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.4)" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Plate */}
        <div className="cake-plate" />
      </div>

      {showWish && (
        <div className={`wish-container ${wishVisible ? 'visible' : ''}`}>
          <div className="wish-card">
            <div className="wish-sparkles">✨ ✨ ✨</div>
            <h3 className="wish-title">Make a Wish, Meera Shri! 💙</h3>
            <p className="wish-text">
              Close your eyes, think of your deepest dream,<br/>
              and send it to the universe...
            </p>
            <div className="wish-hearts">💙 🌟 💙</div>
          </div>
        </div>
      )}
    </section>
  )
}
