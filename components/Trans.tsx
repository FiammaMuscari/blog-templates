'use client'

import React, { ReactNode } from 'react'
import { useLang } from '@/components/LangContext'

export default function Trans({ lang: sectionLang, children }: { lang: 'en' | 'es', children: ReactNode }) {
    const { lang } = useLang()
    if (lang !== sectionLang) return null
    return <>{children}</>
}
