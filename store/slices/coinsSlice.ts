import { EApiConfig, ETimeframe } from '@/types/dataEnum';
import { IDataDTO } from '@/types/dataType';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

interface CoinsState {
  allCoins: IDataDTO[];
  metric: ETimeframe;
  range: [number, number]; 
}

const initialState: CoinsState = {
  allCoins: [],
  metric: ETimeframe.DAILY,
  range: [0, EApiConfig.BAR_COUNT],  //SHOW JUST TOP 50 COIN 
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setAllCoins: (state, action: PayloadAction<IDataDTO[]>) => {
      state.allCoins = action.payload;
    },
    setMetric: (state, action: PayloadAction<ETimeframe>) => {
      state.metric = action.payload;
    },
    setRange: (state, action: PayloadAction<[number, number]>) => {
      const [start, end] = action.payload;
      state.range = [Math.max(0, Math.min(start, end)), Math.min(5000, Math.max(start, end))];
    },
  },
});

export const { setAllCoins, setMetric, setRange } = coinsSlice.actions;

export const selectTopCoins = createSelector(
  (state: RootState) => state.coins.allCoins,
  (state: RootState) => state.coins.metric,
  (state: RootState) => state.coins.range,
  (all, metric, [start, end]) => {
    const sorted = [...all].sort((a, b) => (b[metric] as number) - (a[metric] as number));
    return sorted.slice(start, end > EApiConfig.BAR_COUNT ? start + EApiConfig.BAR_COUNT : end);
  }
);

export default coinsSlice.reducer;
