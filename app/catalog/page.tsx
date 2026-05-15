import CatalogPageClient, {
  Filters,
} from '@/components/CatalogPage/CatalogPageClient/CatalogPageClient';
import { getAllCars } from '@/lib/api/clientApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface CatalogPageProps {
  params: Promise<{ filters: Filters }>;
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const PER_PAGE = 12;
  const { filters } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars', filters],

    queryFn: ({ pageParam = 1 }) =>
      getAllCars(
        filters.brand,
        filters.price,
        filters.minMileage,
        filters.maxMileage,
        PER_PAGE,
        pageParam
      ),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPageClient />
    </HydrationBoundary>
  );
}
