import styles from './SubscribeForm.module.css'

// Your Buttondown username, set in .env and in the GitHub repo's secrets.
const buttondownUser = process.env.NEXT_PUBLIC_BUTTONDOWN_USER

/**
 * The static site has no server to save emails, so the form posts straight
 * to Buttondown. It's a plain HTML form: no JavaScript needed. Buttondown
 * checks the email, confirms it, and sends the newsletter.
 */
export function SubscribeForm() {
  if (!buttondownUser) return null

  return (
    <section className={styles.box} aria-labelledby="subscribe-title">
      <div className={styles.copy}>
        <p className={styles.kicker}>{'// new posts, no spam'}</p>
        <h2 id="subscribe-title" className={styles.title}>
          Get the next post by email
        </h2>
      </div>

      <form
        action={`https://buttondown.com/api/emails/embed-subscribe/${encodeURIComponent(buttondownUser)}`}
        method="post"
        target="_blank"
        className={styles.form}
      >
        <label htmlFor="subscribe-email" className={styles.label}>
          Email address
        </label>
        <div className={styles.row}>
          <input
            id="subscribe-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={styles.input}
          />
          <button type="submit" className="button button--primary">
            Subscribe
          </button>
        </div>
        <p className={styles.status}>Opens Buttondown in a new tab to confirm.</p>
      </form>
    </section>
  )
}
