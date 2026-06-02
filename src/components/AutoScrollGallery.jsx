import React, { useRef, useEffect, useState } from 'react'
import './AutoScrollGallery.css'

const PHOTOS = [
  '/images/photoa1.jpeg',
  '/images/photoa2.jpeg',
  '/images/photoa3.jpeg',
  '/images/photoa4.jpeg',
  '/images/photoa5.jpeg',
  '/images/photoa6.jpg',
  '/images/photoa7.jpg',
  '/images/photoa8.jpeg',
]

const PHOTOS_REVERSE = [
  '/images/photor1.jpeg',
  '/images/photor2.jpeg',
  '/images/photor4.jpeg',
  '/images/photor3.jpeg',
  '/images/photor5.jpeg',
  '/images/photor6.jpeg',
  '/images/photor7.jpeg',
  '/images/photor8.jpeg',
]

export default function AutoScrollGallery() {
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.1 }
    )
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="gallery-section" ref={containerRef}>
      <div className="gallery-bg-glow" />
      <div className="gallery-header">
        <h2 className="section-title">📸 Memory Lane</h2>
        <p className="gallery-subtitle">Scroll through the beautiful moments</p>
      </div>

      <div
        className="gallery-outer"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className={`gallery-track ${paused ? 'paused' : ''} ${inView ? 'in-view' : ''}`} ref={trackRef}>
          {[...PHOTOS, ...PHOTOS].map((src, i) => (
            <div key={i} className="gallery-item">
              <div className="gallery-card">
                <img
                  src={src}
                  alt="Memory photo"
                  className="gallery-img"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={`gallery-track reverse ${paused ? 'paused' : ''} ${inView ? 'in-view' : ''}`}>
          {[...PHOTOS_REVERSE, ...PHOTOS_REVERSE].map((src, i) => (
            <div key={`reverse-${i}`} className="gallery-item">
              <div className="gallery-card">
                <img
                  src={src}
                  alt="Memory photo"
                  className="gallery-img"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="gallery-fade-left" />
        <div className="gallery-fade-right" />
      </div>

      {/* Manual scroll bar */}
      <div className="gallery-scrollbar-wrap">
        <div
          className="gallery-scrollbar-track"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const pct = (e.clientX - rect.left) / rect.width
            if (trackRef.current) {
              trackRef.current.style.animationPlayState = 'paused'
              // Not a real scroll since it's CSS animation; this is decorative
            }
          }}
        >
          <div className={`gallery-scrollbar-thumb ${paused ? 'paused' : ''}`} />
        </div>
        <p className="gallery-hint">← Hover to pause • Scroll to explore →</p>
      </div>
    </section>
  )
}
