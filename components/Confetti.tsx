'use client'

import { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  scale: number
  velocityX: number
  velocityY: number
}

export default function Confetti() {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([])
  
  useEffect(() => {
    const colors = ['#FF6B35', '#F7931E', '#FFC107', '#4CAF50', '#2196F3', '#9C27B0', '#E91E63']
    const pieces: ConfettiPiece[] = []
    
    // Generate confetti pieces
    for (let i = 0; i < 150; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.5 + Math.random() * 0.5,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: 2 + Math.random() * 3
      })
    }
    
    setConfettiPieces(pieces)
    
    // Clean up after animation
    const timer = setTimeout(() => {
      setConfettiPieces([])
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
    if (confettiPieces.length === 0) return
    
    const interval = setInterval(() => {
      setConfettiPieces(prevPieces => 
        prevPieces.map(piece => ({
          ...piece,
          x: piece.x + piece.velocityX,
          y: piece.y + piece.velocityY,
          rotation: piece.rotation + 2,
          velocityY: piece.velocityY + 0.1 // gravity
        })).filter(piece => piece.y < window.innerHeight + 50)
      )
    }, 20)
    
    return () => clearInterval(interval)
  }, [confettiPieces.length])
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            backgroundColor: piece.color,
            transition: 'none'
          }}
        />
      ))}
    </div>
  )
}