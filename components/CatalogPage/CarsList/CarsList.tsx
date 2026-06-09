'use client';
import { Car } from '@/types/car';
import css from './CarsList.module.css';
import Image from 'next/image';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import { useState } from 'react';

interface CarsListProps {
  cars: Car[];
}

export default function CarsList({ cars }: CarsListProps) {
 const [favorites, setFavorites] = useState<string[]>(() => {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem('favoriteCars');

  return stored ? JSON.parse(stored) : [];
});

const toggleFavorite = (carId: string) => {
  setFavorites(prev => {
    const updated = prev.includes(carId)
      ? prev.filter(id => id !== carId)
      : [...prev, carId];

    localStorage.setItem('favoriteCars', JSON.stringify(updated));

    return updated;
  });
};

  return (
    <ul className={css.list}>
      {cars.map(car => (
        <li key={car.id} className={css.card}>
          <div className={css.imageWrapper}>
           <button
  type="button"
  className={css.favoriteBtn}
  onClick={() => toggleFavorite(car.id)}
  aria-label="Add to favorites"
>
  {favorites.includes(car.id) ? (
    <AiFillHeart size={16} className={css.icon} />
  ) : (
    <AiOutlineHeart size={16} className={css.icon} />
  )}
</button>
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
              <h3 className={css.description}>
                {car.brand}{' '}
                <span className={css.descriptionblue}>{car.model},</span>{' '}
                {car.year}
              </h3>
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
          <Link href={`/catalog/${car.id}`} className={css.link} target="blank">
            Read more
          </Link>
        </li>
      ))}
    </ul>
  );
}
