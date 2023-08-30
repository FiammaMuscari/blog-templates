import { FC } from 'react'

const StackBlitz: FC<{ id: string }> = ({ id }) => {
  return (
    <div>
      <iframe
        src={`https://stackblitz.com/edit/${id}}?embed=1`}
        title="stackblitz"
        width="100%"
        height="450"
      ></iframe>
    </div>
  )
}

export default StackBlitz
