"use client";

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type Props = {
  children: ReactNode
  className?: string
}

export function ScrollRevealSection({ children, className }: Props) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <section className={className}>{children}</section>
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.section>
  )
}

