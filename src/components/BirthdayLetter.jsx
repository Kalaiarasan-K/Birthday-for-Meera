import React, { useRef, useState, useEffect } from 'react'
import './BirthdayLetter.css'

const LETTER_PARAGRAPHS = [
  "Dear Meera Shri, my dearest Roshini,",
  "Today, on this beautiful June 3rd, the world celebrates the day you arrived — and truly, the world has never been the same since. Twenty years ago, something extraordinary happened: you.",
  "You carry a light within you that no darkness can extinguish. Whether it's the way your eyes sparkle when you laugh, or the quiet strength you show when things get hard — you are, in every sense of the word, remarkable.",
  "Twenty years of living, growing, dreaming, and becoming the person you are today. Every single moment has been worth it — and every moment ahead of you holds more beauty than you can yet imagine.",
  "On this special day, I hope you feel the love that surrounds you. I hope you know that your presence in this world is a gift — not just to those who know you, but to the universe itself.",
  "May this year bring you joy that makes your heart full, adventures that take your breath away, and dreams that unfold exactly as you've imagined them — and even better.",
  "I know that because of some mistakes I made, things are not the same anymore. Deep down, I still wish we could go back to the way we were because those memories mean a lot to me. I don't know if that will ever happen, but I truly hope you're happy.",
  "Stay strong, stay confident, and enjoy every moment of your life. Never change your beautiful qualities or your character for anyone. Those are the things that make you special.",
  "Whether we talk every day or not at all, you'll always have a special place in my heart. Even from a distance, I'll always care about you. And if you ever need me or call me, I'll be there.",
  "I'm sorry for the mistakes I've made, and thank you for all the memories, support, and moments we've shared. Take care, Roshini. Always keep smiling.",
  "Once Again Happy Birthday, Meera Shri. Happy Birthday, Roshini. You are magic. You are light. You are loved.",
  "With endless love and warmest wishes, 💙",
  "Friendship forever. 💙"
]

export default function BirthdayLetter() {
  const [visible, setVisible] = useState(false)
  const [revealed, setRevealed] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !visible) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [visible])

  useEffect(() => {
    if (!visible) return
    const int = setInterval(() => {
      setRevealed(r => {
        if (r >= LETTER_PARAGRAPHS.length) { clearInterval(int); return r }
        return r + 1
      })
    }, 600)
    return () => clearInterval(int)
  }, [visible])

  return (
    <section className="letter-section" ref={sectionRef}>
      <div className="letter-bg-orbs">
        <div className="letter-orb lo-1" />
        <div className="letter-orb lo-2" />
      </div>

      <div className="letter-header">
        <h2 className="section-title">💌 A Letter For You</h2>
        <p className="letter-subtitle">Words written from the heart</p>
      </div>

      <div className={`letter-card ${visible ? 'letter-visible' : ''}`}>
        {/* Decorative header */}
        <div className="letter-top-deco">
          <div className="letter-seal">💙</div>
          <div className="letter-lines">
            <span /><span />
          </div>
        </div>

        <div className="letter-date">June 3rd, 2026 &nbsp;·&nbsp; For Meera Shri / Roshini</div>

        <div className="letter-body">
          {LETTER_PARAGRAPHS.map((para, i) => (
            <p
              key={i}
              className={`letter-para ${i === 0 ? 'letter-salutation' : ''} ${i === LETTER_PARAGRAPHS.length - 1 ? 'letter-sign' : ''} ${i < revealed ? 'para-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {para}
              {i < revealed && i === revealed - 1 && i < LETTER_PARAGRAPHS.length - 1 && (
                <span className="cursor-blink">|</span>
              )}
            </p>
          ))}
        </div>

        <div className="letter-bottom-deco">
          <span>✦</span>
          <span className="letter-deco-line" />
          <span>💙</span>
          <span className="letter-deco-line" />
          <span>✦</span>
        </div>
      </div>
    </section>
  )
}
