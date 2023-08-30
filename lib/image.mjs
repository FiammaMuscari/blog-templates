import fs from 'fs'
import path from 'path'
import axios from 'axios'

function getThumbnailUrl(src) {
  // public_id: ignore file extension of src
  const public_id = process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER + src.replace(/\.[^/.]+$/, '')
  const params = ['f_auto', 'c_limit', 'w_64', 'q_auto']
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(',')}/${public_id}`
}

export async function generateThumbnail(slug, imagePath) {
  const filePath = path.join(process.cwd(), '.data', `blog/${slug}.json`)
  const dir = path.dirname(filePath)
  // create dir if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  // create file in `.data` folder if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '{"thumbnails":{}}')
  }
  // read json file
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  // check thumbnail existence
  if (json.thumbnails[imagePath]) {
    return
  }
  // get thumbnail url of cloudinary
  const thumbnailUrl = getThumbnailUrl(imagePath)
  // download thumbnail as base64 format with axios
  const base64 = await axios
    .get(thumbnailUrl, { responseType: 'arraybuffer' })
    .then((response) => Buffer.from(response.data, 'binary').toString('base64'))
  const base64Url = `data:image/jpeg;base64,${base64}`
  // add thumbnail url to json
  json.thumbnails[imagePath] = base64Url
  // write json file
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2))
  console.log(`[${slug}] [${imagePath}] thumbnail generated`)
}
