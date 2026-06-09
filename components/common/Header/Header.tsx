'use client';
import Link from 'next/link';
import css from './Header.module.css';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { CiMenuBurger } from 'react-icons/ci';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className={css.header}>
    
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
          <button
            type="button"
            className={css.menu}
            onClick={() => setMobileMenuOpen(true)}
          >
            <CiMenuBurger size={24} className={css.icon} />
          </button>
        </div>
      {mobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      )}
    </header>
  );
}
