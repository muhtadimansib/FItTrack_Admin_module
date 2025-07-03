'use client';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';

interface Props {
  scatterData: { x: number; y: number }[];
  trendLine: { x: number; y: number }[];
}

export default function SleepEfficiencyChart({ scatterData, trendLine }: Props) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Calories Burned" />
          <YAxis type="number" dataKey="y" name="Sleep Efficiency (%)" domain={[0, 100]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Efficiency" data={scatterData} fill="#8884d8" />
          <Line
            data={trendLine}
            type="linear"
            stroke="#FF6B6B"
            strokeWidth={2}
            dot={false}
            animationDuration={1000}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
