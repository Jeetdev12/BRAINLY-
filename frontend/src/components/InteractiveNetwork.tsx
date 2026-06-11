"use client"
import  { useEffect, useRef } from 'react'

export function InteractiveNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W: number, H: number
    let pts: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = []
    const mouse = { x: -999, y: -999 }
    const N = 55
    const MAX_DIST = 110

    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        W = canvas.width = parent.offsetWidth
        H = canvas.height = parent.offsetHeight
      }
    }

    const init = () => {
      pts = []
      for (let i = 0; i < N; i++) {
        pts.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
        })
      }
    }

    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y)

    let animationFrameId: number

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      
      for (let p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        const dm = dist(p, mouse)
        if (dm < 120) {
          p.x += (p.x - mouse.x) * 0.012
          p.y += (p.y - mouse.y) * 0.012
        }
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = dist(pts[i], pts[j])
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.35
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${a})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      for (let p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(129, 140, 248, 0.7)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }

    const handleMouseLeave = () => {
      mouse.x = -999
      mouse.y = -999
    }

    resize()
    init()
    draw()

    window.addEventListener('resize', () => { resize(); init(); })
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', () => { resize(); init(); })
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-auto" />
}