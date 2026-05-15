import CarDetailsPageClient from '@/components/CarDetailsPage/CarDetailsPageClient/CarDetailsPageClient';
import { getCarById } from '@/lib/api/clientApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}
export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const queryClient = new QueryClient();
  const { carId } = await params;
  queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsPageClient carId={carId} />
    </HydrationBoundary>
  );
}
