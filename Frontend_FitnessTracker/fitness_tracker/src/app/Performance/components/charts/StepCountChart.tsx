'use client';

import {
  ScatterChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  scatterData: { x: number; y: number }[];
}

export default function StepCountChart({ scatterData }: Props) {
  if (!scatterData || scatterData.length === 0) {
    return <p className="text-center text-gray-500">No data to display.</p>;
  }

  // Sort data by x to connect them properly
  const sortedData = [...scatterData].sort((a, b) => a.x - b.x);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          name="Calories Burned"
          label={{
            value: 'Calories Burned',
            position: 'insideBottomRight',
            offset: -10,
          }}
        />
        <YAxis
          dataKey="y"
          name="Steps"
          label={{
            value: 'Steps',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip />
        <Legend />

        {/* Animate the connecting line with the same color as scatter dots */}
        <Line
          type="monotone"
          data={sortedData}
          dataKey="y"
          stroke="#f97316" // Same bright orange as dots
          dot={false}
          strokeWidth={2}
          isAnimationActive={true}
          animationDuration={1000}
        />

        {/* Scatter dots */}
        <Scatter
          name="Steps vs Calories"
          data={sortedData}
          fill="#f97316" // Bright orange points
          isAnimationActive={true}
          animationDuration={800}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}









