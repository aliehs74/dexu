
'use client';

import { useAppSelector } from '@/store';
import { selectTopCoins, setRange } from '@/store/slices/coinsSlice';
import { EApiConfig } from '@/types/dataEnum';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState, useRef, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';

export default function RangeController() {
  const dispatch = useDispatch();
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(EApiConfig.MAX_PAGE);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const topCoins = useAppSelector(selectTopCoins);
  const metric = useAppSelector((state) => state.coins.metric);
  // Debounced dispatch to Redux store
  const debouncedDispatchRange = useMemo(() => {
    return debounce((start: number, end: number) => {
      dispatch(setRange([start * EApiConfig.PAGE_SIZE, end * EApiConfig.PAGE_SIZE]));
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    debouncedDispatchRange(startPage, endPage);
    return () => {
      debouncedDispatchRange.cancel();
    };
  }, [startPage, endPage, debouncedDispatchRange]);

  // Handle slider track click
  const handleTrackClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const pageValue = Math.round(percentage * EApiConfig.MAX_PAGE);

    // Determine which handle to move (closest to click)
    const startDiff = Math.abs(startPage - pageValue);
    const endDiff = Math.abs(endPage - pageValue);

    if (startDiff <= endDiff) {
      setStartPage(Math.min(pageValue, endPage - 1));
    } else {
      setEndPage(Math.max(pageValue, startPage + 1));
    }
  };

  // Reusable function for handle drag logic
  const handleDrag = (setPage: (page: number) => void, limit: (newPage: number) => number) => {
    return (e: MouseEvent) => {
      e.stopPropagation();

      const onDrag = (moveEvent: MouseEvent) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = moveEvent.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newPage = Math.round(percentage * EApiConfig.MAX_PAGE);
        setPage(limit(newPage));
      };

      const onDragEnd = () => {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', onDragEnd);
      };

      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onDragEnd);
    };
  };

  // Calculate positions for the visual handles
  const startPosition = `${(startPage / EApiConfig.MAX_PAGE) * 100}%`;
  const endPosition = `${(endPage / EApiConfig.MAX_PAGE) * 100}%`;

  return (
    <div className="w-full px-4 py-8">
      <div className="relative h-10 mb-2" ref={sliderRef} onClick={handleTrackClick}>
        {/* Track line */}
        <p className="absolute -top-5 left-1/2 -translate-1/2  ">Performance of Top {EApiConfig.BAR_COUNT}</p>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-500 transform -translate-y-1/2"></div>

        {/* Start handle */}
        <div
          className="absolute top-1/2 w-6 h-6 bg-cyan-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-md"
          style={{ left: startPosition }}
          onMouseDown={handleDrag(setStartPage, (newPage) => Math.min(newPage, endPage - 1))}
        ></div>

        {/* End handle */}
        <div
          className="absolute top-1/2 w-6 h-6 bg-cyan-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-md"
          style={{ left: endPosition }}
          onMouseDown={handleDrag(setEndPage, (newPage) => Math.max(newPage, startPage + 1))}
        ></div>
      </div>

      {/* Label containers */}
      <div className="flex justify-between mt-1 text-sm font-medium text-gray-700">
        <div className="text-center" style={{ marginLeft: '-10px' }}>Best</div>
        <div className="text-center" style={{ marginRight: '-10px' }}>Worst</div>
      </div>

      {/* Optional: Show current values */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <div>{topCoins[0]?.[metric]}</div>
        <div>{topCoins[topCoins.length-1]?.[metric]}</div>
      </div>
    </div>
  );
}
