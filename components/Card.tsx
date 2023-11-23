'use client'
import Image from './Image'
import Link from './Link'
import { useState } from 'react'

const Card = ({ title, description, imgSrc, href }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const maxDescriptionHeight = '12rem' // Ajusta la altura máxima según tus necesidades

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div className="md max-w-[544px] p-4 ">
      <div
        className={`flex flex-col ${
          imgSrc ? 'h-full' : ''
        } max-h-[30em] rounded-md overflow-hidden`}
      >
        {!imageLoaded && (
          <div className="object-cover object-center ">
            <p className=" flex justify-center h-48 bg-gray-300 dark:bg-gray-700 animate-pulse">
              <svg
                aria-hidden="true"
                className=" m-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </p>
          </div>
        )}

        {imgSrc && (
          <div className={`flex-shrink-0 ${imageLoaded ? '' : 'hidden'}`}>
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                <Image
                  alt={title}
                  src={imgSrc}
                  className="object-cover object-center md:h-36 lg:h-48"
                  width={544}
                  height={306}
                  priority
                  onLoad={handleImageLoad}
                />
              </Link>
            ) : (
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
                priority
                onLoad={handleImageLoad}
              />
            )}
          </div>
        )}

        <div className="flex-grow p-6 flex flex-col min-h-[13.3em] max-h-[13.3em]">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link
                className="text-base font-medium leading-6 text-primary-500 dark:text-teal-500 hover:text-primary-600 dark:hover:text-teal-400"
                href={href}
                aria-label={`Link to ${title}`}
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p
            className="prose mb-3 text-gray-500 dark:text-gray-400 flex-grow"
            style={{ maxHeight: maxDescriptionHeight, overflow: 'hidden' }}
          >
            {description}
          </p>
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 dark:text-teal-500 hover:text-primary-600 dark:hover:text-teal-400"
              aria-label={`Link to ${title}`}
            >
              Ver más &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
