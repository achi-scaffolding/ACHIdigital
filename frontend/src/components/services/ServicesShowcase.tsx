"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

type ShowcaseItem = {
  key: string
  title: string
  subtitle: string
  href: string
  imageSrc: string
  imageAlt: string
}

type Props = {
  heading?: string
  subheading?: string
  items?: ShowcaseItem[]
  initialActiveKey?: string
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default function ServicesShowcase({
  heading = "",
  subheading = "",
  items,
  initialActiveKey,
}: Props) {
  const safeItems: ShowcaseItem[] = Array.isArray(items) ? items : []

  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const [bg, setBg] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height

      const x = (px - 0.5) * 14
      const y = (py - 0.5) * 10

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => setBg({ x, y }))
    }

    el.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      el.removeEventListener("mousemove", onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const activeKey = useMemo(() => {
    if (!safeItems.length) return ""
    if (initialActiveKey && safeItems.some((i) => i.key === initialActiveKey)) return initialActiveKey
    return safeItems[0].key
  }, [safeItems, initialActiveKey])

  const normalizedItems = useMemo(() => {
    return safeItems.map((it, i) => ({
      ...it,
      isFar: i >= 4,
      farStrength: clamp((i - 3) / 6, 0, 1),
    }))
  }, [safeItems])

  return (
    <section className="relative w-full overflow-hidden">
      <div
        ref={wrapRef}
        className="relative w-full"
style={{ ["--mx" as any]: `${bg.x}px`, ["--my" as any]: `${bg.y}px` } as React.CSSProperties}
 
      >
<div className="fixed inset-0 services-stage" aria-hidden="true" />


        <div className="relative mx-auto w-full max-w-6xl px-6 py-14">
          <div className="mb-10">
            <h1 className="services-neon-title services-title-no-blue">{heading}</h1>
            <p className="services-neon-subtitle">{subheading}</p>
          </div>

          <div className="services-cards-row services-cards-row-scroll">
            {normalizedItems.map((it, idx) => (
              <NeonServiceCard
                key={it.key}
                item={it}
                index={idx}
                isActive={it.key === activeKey}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function NeonServiceCard({
  item,
  index,
  isActive,
}: {
  item: any
  index: number
  isActive: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, p: 0.5 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const ry = (px - 0.5) * 18
    const rx = -(py - 0.5) * 14
    setTilt({ rx, ry, p: px })
  }

  const onLeave = () => setTilt({ rx: 0, ry: 0, p: 0.5 })

  const strength = item.isFar ? item.farStrength : 0



const blur = 0
const opacity = 1
const scale = 1

const style: React.CSSProperties = {
  transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1)`,
  opacity: 1,
}


  return (
    <Link
      ref={ref}
      href={item.href || "#"}
      className={`services-card ${isActive ? "services-card-active" : ""}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={item.title || ""}
      style={style}
    >
      <div className="services-card-glow-no-blue" />
      <div className="services-card-sheen" style={{ left: `${tilt.p * 100}%` }} />
      <div className="services-card-frame services-card-frame-no-blue">
        <div className="services-card-media">
          <Image
            src={item.imageSrc || "/assets/services/cards/1.png"}
            alt={item.imageAlt || item.title || ""}
            fill
            sizes="240px"
            className="object-cover"
            priority={index < 4}
          />
        </div>

<div className="fixed inset-0 services-stage -z-10">
  <div className="services-ceiling" />
  <div className="services-floor" />
  <div className="services-vignette" />
  <div className="services-glowPulse" />
</div>

      </div>
    </Link>
  )
}
