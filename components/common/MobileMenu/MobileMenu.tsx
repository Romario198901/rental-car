'use client';
import Link from 'next/link';
import css from './MobileMenu.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import { IoCloseOutline } from 'react-icons/io5';
import { createPortal } from 'react-dom';

interface MobileMenuProps {
  onClose: () => void;
}
export default function MobileMenu({ onClose }: MobileMenuProps) {
  return createPortal(
    <div className={css.mobilemenu}>
      <div className={clsx('container', css.mobilemenucontainer)}>
        <div className={css.wrapper}>
          <Link href="/" className={css.logolink} onClick={onClose}>
            <Image
              src="/Logo.svg"
              alt="Logo of the RentalCar Company"
              width={104}
              height={16}
              priority
            />
          </Link>
          <button type="button" className={css.menuclose} onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>
        <nav className={css.menunav}>
          <ul className={css.navlist}>
            <li className={css.navitem}>
              <Link href="/" className={css.navlink} onClick={onClose}>
                Home
              </Link>
            </li>
            <li className={css.navitem}>
              <Link href="/catalog" className={css.navlink} onClick={onClose}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>,
    document.body
  );
}
