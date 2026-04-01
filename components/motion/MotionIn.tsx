'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function useIsDark() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    const update = () => setIsDark(root.classList.contains('dark'))
    update()
    const obs = new MutationObserver(update)
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return isDark
}

export function MotionIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const isDark = useIsDark()
  return (
    <motion.div
      initial={{ opacity: 0, y: isDark ? 18 : 12, filter: isDark ? 'blur(6px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: isDark ? 0.65 : 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

