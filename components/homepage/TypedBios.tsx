'use client'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { Twemoji } from '@/components/Twemoji'

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 1000,
  })
}

export function TypedBios() {
  const el = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!el.current) return

    // Inicializa el Typed.js
    const typed = createTypedInstance(el.current)

    return () => {
      // Destruye el Typed instance durante la limpieza para detener la animación
      typed.destroy()
    }
  }, [])

  // Mensaje inicial con puntos suspensivos
  const initialMessage = '...'

  return (
    <div className="dark:bg-cyan-950 bg-[#cca8ff82] md:ml-[7em] border-2 border-[#905fff] dark:border-white rounded-xl py-[20px] px-[15px]">
      <ul id="bios" className="hidden">
        <li>
          Hola soy Fiamma! <Twemoji emoji="video-game" />
        </li>
        <li>Lee los distintos blogs quizás te sirvan</li>
        <li>Colaborá en github, forkea y hacé un pr</li>
        <li>No me gusta javascript, pero es lo que hay</li>
        <li>Robemos componentes como Robin Hood!</li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200">
        {initialMessage}
      </span>
    </div>
  )
}
