import React from 'react'
import './HerImageSection.css'

const HER_PHOTOS = [
  '/images/photoh1.jpeg',
  '/images/photoh2.jpeg',
  '/images/photoh4.jpeg',
  '/images/photoh3.jpeg',
  '/images/photoh5.jpeg',
]

export default function HerImageSection() {
  return (
    <section className="her-image-section">
      <div className="her-image-intro">
        <p className="her-image-note">A private gallery of moments just for her</p>
      </div>

      <div className="her-gallery-stack">
        {HER_PHOTOS.map((src, index) => (
          <div
            key={src}
            className={`her-gallery-card card-${index + 1}`}
            style={{ '--idx': index + 1 }}
          >
            <img
              src={src}
              alt={`Her photo ${index + 1}`}
              className="her-gallery-photo"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
