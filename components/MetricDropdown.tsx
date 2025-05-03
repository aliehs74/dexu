'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setMetric } from '@/store/slices/coinsSlice';
import { ETimeframe } from '@/types/dataEnum';

export default function MetricDropdown() {
    const dispatch = useDispatch();
    const selected = useSelector((state: RootState) => state.coins.metric);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setMetric(e.target.value as ETimeframe));
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Metric
            </label>
            <select
                value={selected}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.keys(ETimeframe).map((tf) => {
                    return (
                        <option key={tf} value={ETimeframe[tf as keyof typeof ETimeframe]}>
                            {tf}
                        </option>)
                })}
            </select>
        </div>
    );
}
