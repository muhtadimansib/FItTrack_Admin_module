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

interface GoalData {
  name: string;
  rate: number;
}

export default function GoalCompletionChart({
  data,
  darkMode,
}: {
  data: GoalData[];
  darkMode: boolean;
}) {
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
          type="category"
          dataKey="name"
          width={120}
          tick={{ fill: darkMode ? '#ccc' : '#333' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            border: '1px solid #ccc',
            color: darkMode ? '#fff' : '#000',
          }}
        />
        {/* <Legend /> */}
        <Bar
          dataKey="rate"
          fill="#3b82f6"
          isAnimationActive={true}
          animationDuration={900}
          animationEasing="ease-out"
        >
          <LabelList dataKey="rate" position="right" formatter={(val: number) => `${val}%`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
