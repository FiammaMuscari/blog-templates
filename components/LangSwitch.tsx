'use client'

import { useEffect, useState } from 'react'
import { useLang } from './LangContext'

const LangSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { lang, setLang } = useLang()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-10 h-8"></div> // placeholder space

  return (
    <div className="flex items-center ml-2 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden bg-white dark:bg-gray-800 text-sm font-medium">
      <button
        onClick={() => setLang('en')}
        className={`px-2 py-1 transition-colors ${
          lang === 'en'
            ? 'bg-blue-500 text-white dark:bg-cyan-600'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="English"
      >
        EN
      </button>
      <button
        onClick={() => setLang('es')}
        className={`px-2 py-1 transition-colors ${
          lang === 'es'
            ? 'bg-blue-500 text-white dark:bg-cyan-600'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
        aria-label="Español"
      >
        ES
      </button>
    </div>
  )
}

export default LangSwitch
