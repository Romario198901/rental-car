import { Car } from '@/types/car';
import { clientApi } from './api';
import { Order } from '@/types/order';

interface AxiosCarResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

type Brands = string[];

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

export const getAllBrands = async (): Promise<Brands> => {
  const { data } = await clientApi.get<Brands>('/brands');
  return data;
};

// export const createOrder = async(order: Order): Promise<Order> => {
// const {data} = await clientApi.post<Order>('/orders', order);
// return data;
// }
