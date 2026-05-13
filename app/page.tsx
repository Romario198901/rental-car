import clsx from 'clsx'
import css from './page.module.css'
import Link from 'next/link'


export default function Home() {
  return <section className={css.heroSection}>
<div className={clsx (`container && ${css.heroContrainer}`)}>
  <h1 className={css.title}>Find your perfect rental car</h1>
  <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
  <Link href='/catalog' className={css.link}>View Catalog</Link>
</div>
  </section>
}
