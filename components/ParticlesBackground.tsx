'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

const ParticlesBackground = () => {
  const [init, setInit] = useState(false)
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="pointer-events-none fixed inset-0 -z-50" key={pathname}>
      <Particles
        id="tsparticles"
        options={{
          fpsLimit: 60,
          zIndex: -50,
          interactivity: {
            events: {
              onHover: {
                enable: false,
              },
            },
          },
          particles: {
            color: {
              value: isDark ? '#6366f1' : '#312e81',
            },
            links: {
              color: isDark ? '#a5b4fc' : '#4338ca',
              distance: 150,
              enable: true,
              opacity: isDark ? 0.3 : 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.6,
              direction: 'none',
              random: true,
              straight: false,
              outModes: {
                default: 'out',
              },
            },
            number: {
              density: {
                enable: true,
              },
              value: 30,
            },
            opacity: {
              value: isDark ? { min: 0.1, max: 0.5 } : { min: 0.3, max: 0.7 },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
          fullScreen: {
            enable: false,
          },
        }}
        className="h-full w-full"
      />
    </div>
  )
}

export default ParticlesBackground
