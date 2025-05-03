'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetCoinsQuery, useLazyGetCoinsBatchQuery } from '@/store/slices/api';
import { selectTopCoins, setAllCoins } from '@/store/slices/coinsSlice';
import { useEffect, useLayoutEffect } from 'react';
import Chart from './Chart';

export default function ChartProvider() {

  const dispatch = useAppDispatch();
  const topCoins = useAppSelector(selectTopCoins);
  const { data: initialCoins, isSuccess: isInitSuccess } = useGetCoinsQuery({ page: 0, size: 100 })
  const [triggerBatchFetch, { data: batchCoins, isSuccess }] = useLazyGetCoinsBatchQuery();


  useLayoutEffect(() => {
    if (isInitSuccess) {
      dispatch(setAllCoins(initialCoins));
    }
  }, [isInitSuccess]);

  useEffect(() => {
    triggerBatchFetch();
    if (isInitSuccess && isSuccess) {
      dispatch(setAllCoins(initialCoins.concat(batchCoins)));
    }
  }, [isSuccess]);

  return (<Chart data={topCoins} />
  )


}