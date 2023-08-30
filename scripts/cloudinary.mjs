import cloudinary from 'cloudinary'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import esMain from 'es-main'

import { generateThumbnail } from '../lib/image.mjs'

function getPublicId(imagePath) {
  const cloudPath = path.join(process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER, imagePath)
  // public_id: remove file extension
  return cloudPath.replace(/\.[^/.]+$/, '')
}

// NOTE: cloudinary will create subfolders automatically if necessary
async function upload(imagePath, invalidateCache = true) {
  // check if file exists
  const filePath = path.join(process.cwd(), 'public', imagePath)
  if (!fs.existsSync(filePath)) {
    console.error('image not found:', filePath)
    return false
  }

  const publicId = getPublicId(imagePath)

  if (invalidateCache) {
    await deleteFromCloud(publicId)
  }

  // upload
  console.log(`uploading image: ${filePath}...`)
  try {
    const resp = await cloudinary.v2.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: 'image',
    })
    console.log('image uploaded:', resp.public_id)
    return true
  } catch (error) {
    console.log('image upload failed:', error.message)
    return false
  }
}

async function deleteImage(imagePath) {
  // delete local file
  const filePath = path.join(process.cwd(), 'public', imagePath)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    console.log('deleted local file:', filePath)
  }

  // delete from cloud
  const publicId = getPublicId(imagePath)
  await deleteFromCloud(publicId)
}

async function deleteFromCloud(publicId) {
  // delete from cloudinary and invalidate CDN cache
  const resp = await cloudinary.v2.uploader.destroy(publicId, {
    invalidate: 'true',
  })
  console.log('deleting from cloud:', resp)
}

function main() {
  yargs(hideBin(process.argv))
    .version(false)
    .strict()
    .command(
      'upload <path> [slug]',
      'upload image to cloudinary and optionally generate thumbnail',
      (yargs) => {
        return yargs
          .option('slug', {
            alias: 's',
            type: 'string',
            desc: 'the related doc slug',
          })
          .option('delete', {
            alias: 'd',
            type: 'boolean',
            default: true,
            desc: 'delete old image and invalidate CDN cache',
          })
      },
      async (argv) => {
        // 2023/image.jpg
        const imagePath = `/static/images/${argv.path}`
        const uploaded = await upload(imagePath, argv.delete)

        if (uploaded && argv.slug) {
          // 2023/hello-world
          await generateThumbnail(argv.slug, imagePath)
        }
      }
    )
    .command(
      'delete <path>',
      'delete image from cloudinary and invalidate CDN cache',
      () => {},
      (argv) => {
        const imagePath = `/static/images/${argv.path}`
        deleteImage(imagePath)
      }
    )
    .positional('path', {
      type: 'string',
      desc: 'image path relative to `/public/static/images/` folder',
    })
    .alias('h', 'help')
    .parse()
}

// check if this ES module is run directly with Node.js
if (esMain(import.meta)) {
  // load .env file
  dotenv.config()

  cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })

  main()
}
