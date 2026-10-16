'use client'

import { useEffect, useRef } from 'react'

import styles from './AsciiField.module.css'

/**
 * The background effect: a grid of random characters that light up in
 * rings around the cursor.
 *
 * How it works, in short:
 * 1. A <canvas> covers the window, behind the page, and ignores the mouse.
 * 2. The screen is split into cells. Each cell holds one random character.
 * 3. Moving the mouse drops "ripples": circles that grow and fade.
 * 4. Every frame, each cell checks how close it is to each ripple's edge.
 *    Closer means more visible. The characters never move; only their
 *    opacity changes.
 * 5. There are two kinds of ripple. Moving the mouse (and the idle ones)
 *    make soft, light green rings. A click makes a dark green ring, so it
 *    feels like a response to what you did.
 *
 * Everything lives in plain variables inside useEffect, not React state.
 * React state would re-render the component 30 times a second for no reason.
 */

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const CELL_W = 10
const CELL_H = 18
const SPEED = 260 // px per second a ripple grows
const LIFE = 2.8 // seconds a ripple lives
const BAND = 26 // how thick a ripple's ring is
const FRAME_MS = 33 // about 30 frames per second

/** s = size multiplier. click = true for the dark ripple from a click. */
type Ripple = { x: number; y: number; t: number; s: number; click?: boolean }

type Props = {
  /** 0 to 1. How visible the characters get. */
  strength?: number
}

export function AsciiField({ strength = 0.45 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Read the colors from the CSS tokens, so styles.css stays the one place
    // where colors are defined.
    const rootStyle = getComputedStyle(document.documentElement)
    const lightColor = rootStyle.getPropertyValue('--field').trim() || '#a8cbb2'
    const darkColor = rootStyle.getPropertyValue('--accent').trim() || '#1f5c3f'
    const monoFont = getComputedStyle(document.body).getPropertyValue('--font-mono').trim() || 'monospace'
    const pick = () => CHARS[(Math.random() * CHARS.length) | 0]

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let grid: string[] = []
    let ripples: Ripple[] = []
    let raf = 0
    let lastFrame = 0
    let pointerX = -9999
    let pointerY = -9999
    let lastMove = -Infinity
    let lastSpawnX = -9999
    let lastSpawnY = -9999
    let lastAuto = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / CELL_W) + 1
      rows = Math.ceil(height / CELL_H) + 1
      grid = Array.from({ length: cols * rows }, pick)
    }

    const draw = (now: number, still = false) => {
      ctx.clearRect(0, 0, width, height)

      // With no mouse movement for a while, add a ripple now and then so the
      // page never looks frozen.
      if (!still && now - lastAuto > 2400 && now - lastMove > 1800) {
        lastAuto = now
        ripples.push({
          x: width * (0.1 + Math.random() * 0.8),
          y: height * (0.15 + Math.random() * 0.7),
          t: now,
          s: 0.9 + Math.random() * 0.5,
        })
      }

      ripples = ripples.filter((r) => (now - r.t) / 1000 < LIFE * r.s)
      const live = ripples.map((r) => {
        const age = (now - r.t) / 1000
        return {
          x: r.x,
          y: r.y,
          radius: age * SPEED * r.s,
          fade: Math.pow(1 - age / (LIFE * r.s), 1.6),
          click: Boolean(r.click),
        }
      })
      const glow = Math.max(0, 1 - (now - lastMove) / 1400)

      // Swap a few characters each frame for the flicker.
      const swaps = Math.floor(grid.length * 0.015)
      for (let k = 0; k < swaps; k++) grid[(Math.random() * grid.length) | 0] = pick()

      ctx.font = `500 12px ${monoFont}`
      ctx.textBaseline = 'top'

      for (let row = 0; row < rows; row++) {
        const cy = row * CELL_H + CELL_H / 2
        for (let col = 0; col < cols; col++) {
          const cx = col * CELL_W + CELL_W / 2
          let alpha = 0 // light green rings + cursor glow
          let clickAlpha = 0 // dark green click rings

          for (const r of live) {
            const distance = Math.hypot(cx - r.x, cy - r.y)
            const band = (distance - r.radius) / BAND
            let amount = 0
            if (band > -2.5 && band < 2.5) amount = Math.exp(-band * band) * r.fade
            else if (distance < r.radius) amount = 0.05 * r.fade
            if (r.click) clickAlpha += amount
            else alpha += amount
          }

          if (glow > 0) {
            const d = Math.hypot(cx - pointerX, cy - pointerY)
            if (d < 180) {
              const q = 1 - d / 180
              alpha += q * q * glow * 0.8
            }
          }

          const char = grid[row * cols + col]

          // A click ring wins over the light rings where they overlap.
          if (clickAlpha >= 0.06) {
            ctx.fillStyle = darkColor
            ctx.globalAlpha = Math.min(clickAlpha, 1) * 0.85
            ctx.fillText(char, col * CELL_W, row * CELL_H)
            continue
          }

          if (alpha < 0.04) continue // invisible, skip the expensive draw
          ctx.fillStyle = lightColor
          ctx.globalAlpha = Math.min(alpha, 1) * strength
          ctx.fillText(char, col * CELL_W, row * CELL_H)
        }
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (now - lastFrame < FRAME_MS) return
      lastFrame = now
      draw(now)
    }

    const drawStill = () => {
      const t = performance.now()
      ripples = [
        { x: width * 0.74, y: height * 0.42, t: t - 900, s: 1.3 },
        { x: width * 0.18, y: height * 0.75, t: t - 1500, s: 1.1 },
      ]
      draw(t, true)
    }

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX
      pointerY = e.clientY
      lastMove = performance.now()
      if (Math.hypot(pointerX - lastSpawnX, pointerY - lastSpawnY) > 90) {
        ripples.push({ x: pointerX, y: pointerY, t: lastMove, s: 1 })
        lastSpawnX = pointerX
        lastSpawnY = pointerY
        if (ripples.length > 14) ripples.shift()
      }
    }

    const onDown = (e: PointerEvent) => {
      onMove(e)
      ripples.push({ x: pointerX, y: pointerY, t: lastMove, s: 1.4, click: true })
    }

    const onResize = () => {
      resize()
      if (reduceMotion) drawStill()
    }

    resize()
    window.addEventListener('resize', onResize)

    // People who ask their system for less motion get one still frame.
    if (reduceMotion) {
      drawStill()
    } else {
      ripples.push({ x: width * 0.72, y: height * 0.4, t: performance.now(), s: 1.3 })
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerdown', onDown, { passive: true })
      raf = requestAnimationFrame(loop)
    }

    // Cleanup: React runs this when the component goes away. Without it,
    // the listeners and the animation loop would keep running forever.
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [strength])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
