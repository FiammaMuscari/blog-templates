'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Lang = 'es' | 'en'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextType>({
  lang: 'es',
  setLang: () => {},
})

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    let savedLang: Lang = 'es'
    const match = document.cookie.match(/(^| )lang=([^;]+)/)
    if (match) {
      savedLang = match[2] as Lang
    }

    if (savedLang === 'es' || savedLang === 'en') {
      setLangState(savedLang)
    }
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    document.cookie = `lang=${newLang};path=/;max-age=31536000;SameSite=Lax`
  }

  // To prevent hydration mismatch, we could render children only when mounted,
  // but that breaks SEO / SSR. Best to just render children immediately and
  // let client components read the `lang` after hydration.

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
