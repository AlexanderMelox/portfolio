import styles from './SiteFooter.module.css'

export function SiteFooter({ name }: { name: string }) {
  return (
    <footer className={`container ${styles.footer}`}>
      <p className={styles.row}>
        <span>
          © {new Date().getFullYear()} {name}
        </span>
        <span>built with care and a lot of &lt;div&gt;s</span>
      </p>
    </footer>
  )
}
