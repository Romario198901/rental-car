import { getServerApi } from '@/lib/api/serverApi';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const brand = request.nextUrl.searchParams.get('brand') ?? '';
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const rentalPrice = request.nextUrl.searchParams.get('rentalPrice') ?? '';
    const minMileage = request.nextUrl.searchParams.get('minMileage') ?? '';
    const maxMileage = request.nextUrl.searchParams.get('maxMileage') ?? '';

    const api = await getServerApi();

    const res = await api.get('/cars', {
      params: {
        page,
        brand,
        rentalPrice,
        minMileage,
        maxMileage,
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
