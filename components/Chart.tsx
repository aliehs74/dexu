'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { IDataDTO } from '@/types/dataType';
import { useAppSelector } from '@/store';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: true });

export default function Chart({ data }:{data:IDataDTO[]}) {
  const metric = useAppSelector((state) => state.coins.metric);

  const option = useMemo(() => ({
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: data.map((coin) => coin.cryptocurrency),
      axisLabel: { interval: 0, rotate: 90 },
    },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'bar',
        barWidth: '70%',
        data: data.map((coin) => ({
          value: coin[metric],
          itemStyle: {
            color: coin[metric] >= 0 ? '#16a34a' : '#dc2626',
          },
        })),
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: 0,
        start: 0,
        end: 100,
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        start: 0,
        end: 100,
      },
    ],
  }), [data, metric]);

  return (
    <div className="w-full overflow-x-auto">
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
}
