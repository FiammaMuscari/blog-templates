export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // ignore external images
  if (!src.startsWith('/static/images/')) return src

  // public_id: ignore file extension of src
  const public_id = process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER + src.replace(/\.[^/.]+$/, '')

  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  // a little hack to make sure the background of images in `uses` folder is transparent
  // if (src.startsWith('/static/images/uses/')) {
  //   // e_bgremoval:rgb:ffff00
  //   params.push('e_bgremoval')
  // }
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(',')}/${public_id}`
}
