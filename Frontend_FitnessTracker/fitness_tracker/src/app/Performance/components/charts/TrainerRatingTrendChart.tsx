'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Proper type for chart data
interface TrainerRatingData {
  date: string;
  averageRating: number;
}

interface TrainerRatingTrendChartProps {
  data: TrainerRatingData[];
  darkMode: boolean;
}

export default function TrainerRatingTrendChart({
  data,
  darkMode,
}: TrainerRatingTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#ccc'} />
        <XAxis dataKey="date" stroke={darkMode ? '#fff' : '#000'} />
        <YAxis domain={[0, 5]} stroke={darkMode ? '#fff' : '#000'} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="averageRating"
          stroke="#4ade80"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
