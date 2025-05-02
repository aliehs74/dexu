import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPaginatedData } from '@/types/dataType';

const BASE_URL = '/api';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCoins: builder.query<IPaginatedData, { page: number; size: number }>({
      query: ({ page, size }) => `coins?page=${page}&size=${size}`,
    }),

    getCoinsBatch: builder.query<any[], void>({
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        const size = 100;
        const promises = [];

        for (let page = 1; page < 50; page++) {
          promises.push(fetchWithBQ(`coins?page=${page}&size=${size}`));
        }

        const results = await Promise.all(promises);

        const data = results
          .filter((r) => !r.error)
          .flatMap((res: any) => res.data?.items ?? []);

        return { data };
      },
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useLazyGetCoinsQuery,
  useGetCoinsBatchQuery,
  useLazyGetCoinsBatchQuery,
} = coinsApi;
