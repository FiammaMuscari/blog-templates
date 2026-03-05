'use client'
import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import { useLang } from '@/components/LangContext'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Card from '@/components/Card'
import { clsx } from 'clsx'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

const leetcodeVideos = [
  {
    title: 'Two Sum (Ts & python)',
    description: {
      es: 'Resolviendo el problema Two Sum en TypeScript y Python.',
      en: 'Solving the Two Sum problem in TypeScript and Python.',
    },
    imgSrc: 'https://img.youtube.com/vi/nOaJKWcCzlE/0.jpg',
    href: 'https://www.youtube.com/watch?v=nOaJKWcCzlE',
  },
  {
    title: 'Add Two Numbers (Ts & python)',
    description: {
      es: 'Suma de dos números representados como listas enlazadas.',
      en: 'Sum of two numbers represented as linked lists.',
    },
    imgSrc: 'https://img.youtube.com/vi/dcBrX78iGRg/0.jpg',
    href: 'https://www.youtube.com/watch?v=dcBrX78iGRg',
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    description: {
      es: 'Encontrar la subcadena más larga sin caracteres repetidos.',
      en: 'Finding the longest substring without repeating characters.',
    },
    imgSrc: 'https://img.youtube.com/vi/XfoOqz_4ob4/0.jpg',
    href: 'https://www.youtube.com/watch?v=XfoOqz_4ob4',
  },
  {
    title: 'Median of Two Sorted Arrays',
    description: {
      es: 'Encontrar la mediana de dos arrays ordenados con complejidad O(log n + m).',
      en: 'Finding the median of two sorted arrays with O(log n + m) complexity.',
    },
    imgSrc: 'https://img.youtube.com/vi/CllEfLpmGcc/0.jpg',
    href: 'https://www.youtube.com/watch?v=CllEfLpmGcc',
  },
]

const bioEs = (
  <>
    <h3 className="text-xl font-bold mb-4">Hola soy Fi,</h3>
    <p>
      Desarrolladora Full Stack con experiencia en front-end, back-end, QA, infraestructura y cloud,
      interesada en AI y servidores MCP. He trabajado como CTO en España, en proyectos para México y
      Estados Unidos, he impartido clases de programación en la universidad. También creo contenido
      educativo en Twitch y YouTube. Además, he desarrollado dApps en Wordcoin. 😊
    </p>
  </>
)

const bioEn = (
  <>
    <h3 className="text-xl font-bold mb-4">Hi, I'm Fi,</h3>
    <p>
      Full Stack Developer with experience in front-end, back-end, QA, infrastructure, and cloud,
      interested in AI and MCP servers. I have worked as a CTO in Spain, on projects for Mexico and
      the US, and I've taught programming classes at the university. I also create educational
      content on Twitch and YouTube. In addition, I have developed dApps in Wordcoin. 😊
    </p>
  </>
)

export default function AuthorLayout({ children, content }: Props) {
  const { lang } = useLang()
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {lang === 'en' ? 'About me' : 'Info'}
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full object-cover"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-3 text-center md:text-left">
            {lang === 'en' ? bioEn : bioEs}
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 mt-8">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            LeetCode
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {lang === 'en'
              ? 'Algorithm tutorials explained step by step in TypeScript and Python.'
              : 'Tutoriales de algoritmos explicados paso a paso en TypeScript y Python.'}
          </p>
        </div>
        <div className="py-12">
          <div className="flex flex-wrap gap-12 justify-center">
            {leetcodeVideos.map((video) => (
              <div
                key={video.title}
                className="z-10 max-w-[19rem] mb-8 scale-100 hover:z-50 xl:mb-0 xl:hover:scale-[1.05]"
              >
                <div
                  className={clsx(
                    'flex flex-col overflow-hidden xl:rounded-lg',
                    'bg-white shadow-md dark:bg-gray-900 dark:prose-invert dark:shadow-mondegreen'
                  )}
                >
                  <Card
                    title={video.title}
                    description={video.description[lang] || video.description.es}
                    imgSrc={video.imgSrc}
                    href={video.href}
                  />
                  <span className="h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
