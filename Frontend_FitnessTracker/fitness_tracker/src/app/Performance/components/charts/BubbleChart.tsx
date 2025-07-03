'use client';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

interface Props {
  bubbleData: { x: number; y: number; r: number }[];
}

export default function BubbleChart({ bubbleData }: Props) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid />
          <XAxis dataKey="x" name="Calories Burned" />
          <YAxis dataKey="y" name="Steps" />
          <ZAxis dataKey="r" range={[60, 400]} name="Sleep Hours" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter
            name="Daily Activity"
            data={bubbleData}
            fill="#00BFFF"
            shape="circle"
            animationDuration={1000}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
