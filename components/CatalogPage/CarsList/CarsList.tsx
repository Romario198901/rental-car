'use client';
import { Car } from '@/types/car';
import css from './CarsList.module.css';
import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';

interface CarsListProps {
  cars: Car[];
}

export default function CarsList({ cars }: CarsListProps) {
  return (
    <ul className={css.list}>
      {cars.map(car => (
        <li key={car.id} className={css.card}>
          <div className={css.imageWrapper}>
            <AiOutlineHeart width={16} height={16} className={css.icon} />
            <Image
              width={276}
              height={268}
              src={car.img}
              alt={car.description}
              className={css.image}
              priority
            />
          </div>
          <div className={css.cardDescr}>
            <div className={css.firstRow}>
              <p className={css.description}>
                {car.brand}{' '}
                <span className={css.descriptionblue}>{car.model},</span>{' '}
                {car.year}
              </p>
              <p className={css.price}>$ {car.rentalPrice}</p>
            </div>
            <p className={css.secondRow}>
              <span className={css.location}>{car.location.city}</span>
              <span className={css.location}>{car.location.country}</span>
              <span className={css.location}>{car.rentalCompany}</span>
            </p>
            <p className={css.thirdRow}>
              <span className={css.location}>{car.type}</span>
              <span className={css.location}>{car.mileage}</span>
            </p>
          </div>
          <Link href={`/cars/${car.id}`} className={css.link}>Read more</Link>
        </li>
      ))}
    </ul>
  );
}
