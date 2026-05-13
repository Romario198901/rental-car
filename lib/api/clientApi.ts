import { Car } from '@/types/car';
import { clientApi } from './api';
import { Order } from '@/types/order';
import { Filter } from '@/types/filter';

interface AxiosCarResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}



export const getAllCars = async (
  brand = '',
  rentalPrice = '',
  minMileage = '',
  maxMileage = '',
  page = 1
): Promise<AxiosCarResponse> => {
  const { data } = await clientApi.get<AxiosCarResponse>('/cars', {
    params: {
      page,
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
    },
  });
  return data;
};

export const getCarById = async (carId: string): Promise<Car> => {
  const { data } = await clientApi.get<Car>(`/cars/${carId}`);

  return data;
};

export const getAllFilters = async(): Promise<Filter> => {
  const {data} = await clientApi.get<Filter>('/cars/filters');
  return data;
}

export const createOrder = async (
  carId: string,
  order: Order
): Promise<Order> => {
  const { data } = await clientApi.post<Order>(
    `/cars/${carId}/booking-requests`,
    order
  );
  return data;
};
