import React, { useState, useEffect } from 'react'
import './CountdownReveal.css'

const SEQUENCE = ['3', '2', '1', '🎉 Surprise! 💙']

export default function CountdownReveal({ onDone }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step < SEQUENCE.length) {
      const t = setTimeout(() => setStep(s => s + 1), step === SEQUENCE.length - 1 ? 1600 : 900)
      return () => clearTimeout(t)
    } else {
      onDone()
    }
  }, [step])

  const current = SEQUENCE[step] || ''

  return (
    <div className="countdown-page">
      <div className="countdown-orb" />
      <div key={step} className="countdown-number">
        {current}
      </div>
      <div className="countdown-rings">
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />
      </div>
    </div>
  )
}
