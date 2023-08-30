import { Parent, Node, Literal } from 'unist'
import { visit } from 'unist-util-visit'
import sizeOf from 'image-size'
import fs from 'fs'

export type ImageNode = Parent & {
  url: string
  alt: string
  name: string
  attributes: (Literal & { name: string })[]
}

/**
 * Converts markdown image nodes to next/image jsx.
 *
 */
export function remarkImgToJsx() {
  return (tree: Node, file) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node: Parent): node is Parent =>
        node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
      (node: Parent) => {
        const imageNode = node.children.find((n) => n.type === 'image') as ImageNode

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)
          const attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.url },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
            { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
          ]
          const dataPath = file.data.rawDocumentData.flattenedPath
          const jsonPath = `${process.cwd()}/.data/${dataPath}.json`
          if (fs.existsSync(jsonPath)) {
            const root = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
            const base64Url = root['thumbnails'][imageNode.url]
            if (base64Url) {
              attributes.push(
                { type: 'mdxJsxAttribute', name: 'placeholder', value: 'blur' },
                {
                  type: 'mdxJsxAttribute',
                  name: 'blurDataURL',
                  value: base64Url,
                }
              )
              // console.log(`[remarkImgToJsx] [${dataPath}] ${imageNode.url}`)
            }
          }

          // Convert original node to next/image
          ;(imageNode.type = 'mdxJsxFlowElement'),
            (imageNode.name = 'Image'),
            (imageNode.attributes = attributes)

          // Change node type from p to div to avoid nesting error
          node.type = 'div'
          node.children = [imageNode]
        }
      }
    )
  }
}
