import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type JSXConvertersFunction, RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

import { mediaUrl } from '@/lib/format'
import type { CodeBlock, Media } from '@/payload-types'

import styles from './RichText.module.css'

/**
 * Payload stores rich text as JSON (a tree of nodes). This component turns
 * that tree into HTML. Built-in nodes (paragraphs, headings, lists, links)
 * use Payload's default converters. We only add one for our Code block.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  // Point uploads at /media/ in the static build, then render them as usual.
  upload: (args) => {
    const { node } = args
    if (typeof node.value !== 'object' || !node.value) return null
    const withUrl = { ...node, value: { ...node.value, url: mediaUrl(node.value as Media) } } as typeof node
    const render = defaultConverters.upload
    return typeof render === 'function' ? render({ ...args, node: withUrl }) : null
  },
  blocks: {
    code: ({ node }: { node: { fields: CodeBlock } }) => {
      const { code, filename, language, caption } = node.fields
      return (
        <figure className={styles.codeFigure}>
          <div className={styles.codeWindow}>
            <div className={styles.codeBar}>
              <span>{filename || 'snippet'}</span>
              <span>{language}</span>
            </div>
            <pre className={styles.pre}>
              <code>{code}</code>
            </pre>
          </div>
          {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
        </figure>
      )
    },
  },
})

export function RichText({ data }: { data: SerializedEditorState }) {
  return <LexicalRichText data={data} converters={converters} className={styles.prose} />
}
