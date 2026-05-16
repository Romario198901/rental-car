'use client';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import css from './CarDetailsPageClient.module.css';
import { createOrder, getCarById } from '@/lib/api/clientApi';
import Image from 'next/image';
import Loader from '@/components/common/Loader/Loader';
import CarDetailsDescription from '../CarDetailsDescription/CarDetailsDescription';
import { Car } from '@/types/car';
import BookingForm from '../BookingForm/BookingForm';
import toast from 'react-hot-toast';
import { Order } from '@/types/order';
import { useEffect } from 'react';

interface CarDetailsPageClientProps {
  carId: string;
}

export default function CarDetailsPageClient({
  carId,
}: CarDetailsPageClientProps) {
  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const createBookingRequest = useMutation({
    mutationFn: ({ carId, order }: { carId: string; order: Order }) =>
      createOrder(carId, order),

    onSuccess: () => {
      toast.success('Thank You! Your booking request was sucessfully created');
    },

    onError: () => {
      toast.error('Sorry something went wrong. Please try again');
    },
  });

  const handleCreateRequest = (body: Order) => {
    createBookingRequest.mutate({
      carId,
      order: body,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error('Sorry something went wrong. Please try again');
    }
  }, [isError]);

  if (isError) {
    throw new Error('Failed to load car details');
  }

  if (isLoading) return <Loader />;

  return (
    <section className={css.carDetails}>
      <div className="container">
        {!isLoading && !isError && (
          <div className={css.wrapper}>
            <Image
              width={640}
              height={512}
              src={car?.img as string}
              alt={car?.description as string}
              className={css.image}
              priority
            ></Image>
            <div className={css.description}>
              <CarDetailsDescription car={car as Car} />
            </div>
            <div className={css.booking}>
              <BookingForm
                onSubmit={handleCreateRequest}
                isPending={createBookingRequest.isPending}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
