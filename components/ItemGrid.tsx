import Image from './Image'

export type Item = {
  image: string
  name: string
  description: string
  url: string
}

type ItemGridProps = {
  items: Item[]
}

const ItemGrid = (props: ItemGridProps) => {
  const { items } = props

  return (
    <div className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-4">
      {items.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-6 rounded-lg border border-zinc-300 dark:border-zinc-800 p-4 no-underline transition-colors duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-900 sm:flex-col sm:gap-3"
        >
          <Image
            src={item.image}
            width={256}
            height={256}
            alt={item.name}
            className="m-0 h-36 w-24 sm:w-full object-contain"
          />
          <div className="flex flex-col justify-center gap-2">
            <div className="text-lg font-extrabold text-zinc-700 dark:text-zinc-100">
              {item.name}
            </div>
            <div className="text-sm text-zinc-500">{item.description}</div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default ItemGrid
