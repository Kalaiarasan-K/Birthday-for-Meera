import React, { useState, useEffect } from 'react'
import './PuzzlePopup.css'

const GRID = 3 // 3x3 puzzle
const TOTAL = GRID * GRID

function createSolvedState() {
  return Array.from({ length: TOTAL }, (_, i) => i)
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function isSolved(pieces) {
  return pieces.every((p, i) => p === i)
}

export default function PuzzlePopup({ onClose, onReveal, correctPassword, onSuccess }) {
  const [pieces, setPieces] = useState(() => shuffle(createSolvedState()))
  const [selected, setSelected] = useState(null)
  const [solved, setSolved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  const imageUrl = '/images/photo1.jpg'

  const handlePieceClick = (idx) => {
    if (solved) return
    if (selected === null) {
      setSelected(idx)
    } else {
      const newPieces = [...pieces]
      ;[newPieces[selected], newPieces[idx]] = [newPieces[idx], newPieces[selected]]
      setPieces(newPieces)
      setSelected(null)
      if (isSolved(newPieces)) {
        setTimeout(() => setSolved(true), 300)
      }
    }
  }

  const handleYes = () => {
    setShowPassword(true)
  }

  const handleNo = () => {
    onSuccess()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(correctPassword).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenSurprise = () => {
    onSuccess()
  }

  return (
    <div className="puzzle-overlay">
      <div className="puzzle-modal">
        <button className="puzzle-close" onClick={onClose}>✕</button>

        {!solved ? (
          <>
            <div className="puzzle-header">
              <h2 className="puzzle-title">🧩 Fix the Puzzle!</h2>
              <p className="puzzle-desc">Click two pieces to swap them. Arrange Roshini's photo! 💙</p>
            </div>

            <div className="puzzle-grid">
              {pieces.map((pieceIdx, position) => (
                <div
                  key={position}
                  className={`puzzle-piece ${selected === position ? 'selected' : ''}`}
                  onClick={() => handlePieceClick(position)}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: `${GRID * 100}%`,
                    backgroundPosition: `${(pieceIdx % GRID) * 50}% ${Math.floor(pieceIdx / GRID) * 50}%`,
                  }}
                >
                  {selected === position && <div className="piece-select-ring" />}
                  <span className="piece-number">{position + 1}</span>
                </div>
              ))}
            </div>

            <p className="puzzle-hint">💡 Hint: Click a piece, then click where it should go</p>

            <button className="btn-reset" onClick={() => { setPieces(shuffle(createSolvedState())); setSelected(null) }}>
              🔀 Shuffle Again
            </button>
          </>
        ) : (
          <div className="puzzle-solved">
            <div className="solved-stars">✨ 🎉 ✨</div>
            <h2 className="solved-title">You Solved It! 🎊</h2>
            <p className="solved-msg">
              "You solved it! But the secret is still playful 💙"
            </p>

            <div className="solved-image-preview">
              <img src={imageUrl} alt="Roshini" className="solved-img" />
            </div>

            {!showPassword ? (
              <div className="solved-buttons">
                <button
                  className="btn-yes"
                  onClick={handleYes}
                >
                  Yes, show password
                </button>
                <button className="btn-no" onClick={handleNo}>
                  No, open surprise 🎁
                </button>
              </div>
            ) : (
              <div className="password-reveal">
                <p className="reveal-label">🔑 Here's the password:</p>
                <div className="reveal-password-box">
                  <span className="reveal-password">{correctPassword}</span>
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <button className="btn-open-surprise" onClick={handleOpenSurprise}>
                  🎂 Open the Surprise! 💙
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
