'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Proper type for chart data
interface NutritionistRatingData {
  week: string;
  averageRating: number;
}

interface NutritionistRatingChartProps {
  data: NutritionistRatingData[]; 
  darkMode: boolean;
}

export default function NutritionistRatingChart({
  data,
  darkMode,
}: NutritionistRatingChartProps) {
  if (!Array.isArray(data)) return null;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke={darkMode ? '#444' : '#ccc'} />
        <XAxis
          dataKey="week"
          stroke={darkMode ? '#ddd' : '#333'}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          domain={[0, 5]}
          stroke={darkMode ? '#ddd' : '#333'}
          tick={{ fontSize: 12 }}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? '#333' : '#fff',
            borderRadius: 5,
          }}
          labelStyle={{ color: darkMode ? '#eee' : '#111' }}
          formatter={(value: number) => value.toFixed(2)}
        />
        <Legend wrapperStyle={{ color: darkMode ? '#eee' : '#111' }} />
        <Line
          type="monotone"
          dataKey="averageRating"
          stroke="#82ca9d"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Avg Rating"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
