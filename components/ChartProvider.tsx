'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import { useLazyGetCoinsBatchQuery } from '@/store/slices/api';
import { selectTopCoins, setAllCoins } from '@/store/slices/coinsSlice';
import { IDataDTO } from '@/types/dataType';
import { useEffect } from 'react';
import Chart from './Chart';

export default function ChartProvider({ initialData }: { initialData: IDataDTO[] }) {
  const dispatch = useAppDispatch();
  const topCoins = useAppSelector(selectTopCoins);


  const [triggerBatchFetch, { data: batchCoins, isSuccess }] = useLazyGetCoinsBatchQuery();

  useEffect(() => {
    dispatch(setAllCoins(initialData));
    console.log('initialData', initialData);
    triggerBatchFetch();
    if (isSuccess) {
      dispatch(setAllCoins(initialData.concat(batchCoins)));
    }
  }, [isSuccess]);

  return (<Chart data={topCoins} />)
}