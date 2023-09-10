import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => {
  // Establece una altura máxima para la descripción
  const maxDescriptionHeight = '12rem' // Ajusta la altura máxima según tus necesidades

  return (
    <div className="md max-w-[544px] p-4 ">
      <div
        className={`flex flex-col ${
          imgSrc ? 'h-full' : ''
        } max-h-[30em] rounded-md overflow-hidden`}
      >
        {imgSrc && (
          <div className="flex-shrink-0">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                <Image
                  alt={title}
                  src={imgSrc}
                  className="object-cover object-center md:h-36 lg:h-48"
                  width={544}
                  height={306}
                />
              </Link>
            ) : (
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48"
                width={544}
                height={306}
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
          {/* Establece una altura máxima para la descripción */}
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
