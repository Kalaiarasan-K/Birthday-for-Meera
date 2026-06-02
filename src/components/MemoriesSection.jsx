import React from 'react'
import './MemoriesSection.css'

const PHOTOS = [
  '/images/photom1.jpeg',
  '/images/photom2.jpeg',
  '/images/photom3.jpeg',
  '/images/photom4.jpeg',
  '/images/photom5.jpeg',
  '/images/photom6.jpeg',
  '/images/photom7.jpeg',
  '/images/photom8.jpeg',
]

export default function MemoriesSection() {
  return (
    <section className="memories-section">
      <div className="memories-shape memories-shape-a" />
      <div className="memories-shape memories-shape-b" />
      <div className="memories-shape memories-shape-c" />

      <div className="memories-content">
        <div className="memories-header">
          <h2 className="memories-title">Memories with Friends</h2>
          <p className="memories-copy">
            A lively collage of eight memories and group photos.
          </p>
        </div>

        <div className="memories-collage">
          {PHOTOS.map((photo, index) => (
            <div key={index} className={`collage-piece piece-${index + 1}`}>
              <img src={photo} alt={`Memory ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
