'use client';
import Link from 'next/link';
import css from './Header.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.headerContainer}>
          <Link href="/" className={css.logo}>
            <Image
              src="/Logo.svg"
              alt="Logo of the RentalCar Company"
              width={104}
              height={16}
              priority
            ></Image>
          </Link>
          <nav className={css.headerNav}>
            <Link
              href="/"
              className={clsx(css.navLink, pathname === '/' && css.active)}
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className={clsx(
                css.navLink,
                pathname === '/catalog' && css.active
              )}
            >
              Catalog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
