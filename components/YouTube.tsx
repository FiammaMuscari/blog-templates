import { FC } from 'react'

const YouTube: FC<{ id: string }> = ({ id }) => {
  return (
    <div>
      <iframe
        width="100%"
        height="450"
        src={'https://www.youtube.com/embed/' + id}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YouTube
