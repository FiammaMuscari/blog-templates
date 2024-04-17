import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import { clsx } from 'clsx'
export const metadata = genPageMetadata({ title: 'Proyectos' })

export default function proyectos() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Proyectos
          </h1>
        </div>
        <div className=" py-12">
          <div className=" flex flex-wrap gap-12 justify-center">
            {projectsData.map((d) => (
              <div
                key={d.title}
                className="z-10  max-w-[19rem] mb-8 scale-100 hover:z-50 xl:mb-0 xl:hover:scale-[1.05]"
              >
                <div
                  className={clsx(
                    'flex flex-col overflow-hidden xl:rounded-lg',
                    'shadow-demure dark:prose-invert dark:shadow-mondegreen',
                    'outline outline-1 outline-gray-100 dark:outline-gray-600'
                  )}
                >
                  <Card
                    title={d.title}
                    description={d.description}
                    imgSrc={d.imgSrc}
                    href={d.href}
                  />
                  <span className="prose-invert h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
