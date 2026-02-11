"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type Item = {
  href: string
  title: string
  icon: React.ReactNode
}

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export default function ServicesFocusGrid({
  items,
  perRow = 5,
  initialIndex = 2
}: {
  items: Item[]
  perRow?: number
  initialIndex?: number
}) {
  const rows = useMemo(() => chunk(items, perRow), [items, perRow])
  const [active, setActive] = useState(() => {
    const safe = Math.max(0, Math.min(items.length - 1, initialIndex))
    return safe
  })

  return (
    <div className="mt-6 space-y-10">
      {rows.map((row, rowIdx) => {
        const base = rowIdx * perRow

        return (
          <ul
            key={rowIdx}
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            role="list"
          >
            {row.map((it, i) => {
              const idx = base + i
              const isActive = idx === active

              return (
                <li key={it.href} className="list-none">
                  <Link
                    href={it.href}
                    onMouseEnter={() => setActive(idx)}
                    className={[
                      "group relative block",
                      "h-[150px] w-[120px] sm:h-[190px] sm:w-[150px] lg:h-[230px] lg:w-[180px]",
                      "rounded-2xl border border-neutral-200 bg-white overflow-hidden",
                      "transition duration-300 ease-out",
isActive
  ? "z-10 scale-[1.14] sm:scale-[1.18] shadow-xl"
  : "scale-[0.96] opacity-70"
                    ].join(" ")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/0 via-neutral-900/0 to-neutral-900/35" aria-hidden="true" />

                    <div
                      className={[
                        "absolute left-3 top-3",
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                        "border border-white/15 bg-black/25 backdrop-blur-sm",
                        "transition duration-300",
                        isActive ? "opacity-100" : "opacity-80"
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <span className="[&>svg]:h-5 [&>svg]:w-5 text-white">
                        {it.icon}
                      </span>
                    </div>

                    <div
                      className={[
                        "absolute inset-0",
                        "transition duration-300 ease-out",
                        isActive
                          ? "blur-0 brightness-110 saturate-110"
                          : "blur-[3px] brightness-75 saturate-90"
                      ].join(" ")}
                      aria-hidden="true"
                    />

                    <div className="absolute inset-0" aria-hidden="true" />

                    <div
                      className={[
                        "absolute inset-x-0 bottom-0 p-3",
                        "transition duration-300",
                        isActive ? "opacity-100" : "opacity-90"
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <div className="text-xs font-medium text-white line-clamp-2">
                        {it.title}
                      </div>
                    </div>

                    <div
                      className={[
                        "pointer-events-none absolute inset-0 rounded-2xl",
                        "ring-1 transition duration-300",
                        isActive ? "ring-white/25" : "ring-black/5"
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        )
      })}
    </div>
  )
}
