import type { Profile } from '@/payload-types'

import styles from './CodeWindow.module.css'

type Value = string | string[] | null | undefined

/** One `key: value,` line, colored like a code editor would. */
function Line({ name, value }: { name: string; value: Value }) {
  if (value == null || (Array.isArray(value) && value.length === 0)) return null

  if (Array.isArray(value)) {
    return (
      <>
        {'  '}
        {name}: [
        {value.map((item, i) => (
          <span key={item}>
            <span className={styles.string}>{`"${item}"`}</span>
            {i < value.length - 1 ? ', ' : ''}
          </span>
        ))}
        ],{'\n'}
      </>
    )
  }

  return (
    <>
      {'  '}
      {name}: <span className={styles.string}>{`"${value}"`}</span>,{'\n'}
    </>
  )
}

/** The "alex.config.ts" window next to the headline. */
export function CodeWindow({ card, variable }: { card: Profile['codeCard']; variable: string }) {
  return (
    <figure className={styles.window}>
      <div className={styles.bar}>
        <span>{variable}.config.ts</span>
        <span>readonly</span>
      </div>
      <pre className={styles.code}>
        <span className={styles.keyword}>export const</span> {variable} = {'{\n'}
        <Line name="role" value={card?.role} />
        <Line name="based_in" value={card?.basedIn} />
        <Line name="currently" value={card?.currently} />
        <Line name="into" value={card?.interests} />
        <Line name="stack" value={card?.stack} />
        {'};'}
      </pre>
    </figure>
  )
}
