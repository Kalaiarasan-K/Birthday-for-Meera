import React, { useEffect, useRef, useState } from 'react'
import './PhotoCards.css'

const CARDS = [
  {
    photo: '/images/photo1.jpg',
    emoji: '💙',
    title: 'Magical Smile',
    message: 'Your smile makes every moment magical. The world becomes brighter the instant you smile.',
    color: 'card-blue',
  },
  {
    photo: '/images/photo2.jpeg',
    emoji: '🌟',
    title: 'Beautiful Soul',
    message: 'You are a beautiful soul with a bright heart. Your kindness touches everyone around you.',
    color: 'card-gold',
  },
  {
    photo: '/images/photo3.jpeg',
    emoji: '✨',
    title: 'Shining Dreams',
    message: 'May your dreams shine like stars in the midnight sky — always glowing, always guiding.',
    color: 'card-sky',
  },
  {
    photo: '/images/photo4.jpeg',
    emoji: '🎂',
    title: 'Special Day',
    message: 'This day is as special as you are, Meera Shri. May every birthday bring more joy.',
    color: 'card-blue',
  },
]

function PhotoCard({ card, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`photo-card ${card.color} ${visible ? 'card-visible' : ''}`}
      style={{ animationDelay: `${index * 0.15}s`, transitionDelay: `${index * 0.12}s` }}
    >
      <div className="card-image-wrap">
        <img
          src={card.photo}
          alt={card.title}
          className="card-photo"
          loading="lazy"
        />
        <div className="card-image-overlay" />
        <div className="card-emoji-badge">{card.emoji}</div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{card.title}</h3>
        <p className="card-message">"{card.message}"</p>
        <div className="card-divider" />
        <div className="card-stars">✦ ✦ ✦</div>
      </div>
    </div>
  )
}

export default function PhotoCards() {
  return (
    <section className="photocards-section">
      <div className="photocards-bg-orb" />
      <div className="photocards-header">
        <h2 className="section-title">💙 Messages From the Heart</h2>
        <p className="photocards-subtitle">Words that were made just for you</p>
      </div>

      <div className="photocards-grid">
        {CARDS.map((card, i) => (
          <PhotoCard key={i} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}
