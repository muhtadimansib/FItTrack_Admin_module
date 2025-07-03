'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts';

interface MealPlanData {
  name: string;
  rate: number;
}

export default function MealPlanCompletionChart({
  data,
  darkMode,
}: {
  data: MealPlanData[];
  darkMode: boolean;
}) {
  if (!data || data.length === 0) return <p>No data available</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#ccc'} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fill: darkMode ? '#ccc' : '#333' }}
          label={{
            value: 'Completion Rate (%)',
            position: 'insideBottom',
            offset: -10,
            fill: darkMode ? '#ccc' : '#333',
          }}
        />
        <YAxis
          dataKey="name"
          type="category"
          width={140}
          tick={{ fill: darkMode ? '#ccc' : '#333' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            border: '1px solid #ccc',
            color: darkMode ? '#fff' : '#000',
          }}
          formatter={(value: number) => `${value}%`}
        />
        <Bar
          dataKey="rate"
          fill="#3b82f6"
          isAnimationActive={true}
          animationDuration={900}
          animationEasing="ease-out"
          radius={[4, 4, 0, 0]}
        >
          <LabelList dataKey="rate" position="right" formatter={(val: number) => `${val}%`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
