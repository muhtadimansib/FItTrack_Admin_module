// import { ScatterChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface Props {
//   scatterData: { x: number; y: number }[];
//   trendLine: { x: number; y: number }[];
// }

// export default function StepCountChart({ scatterData, trendLine }: Props) {
//   if (!scatterData || !trendLine) return <p className="text-center">No data to display.</p>;

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <ScatterChart>
//         <CartesianGrid />
//         <XAxis dataKey="x" name="Calories Burned" />
//         <YAxis dataKey="y" name="Steps" />
//         <Tooltip />
//         <Legend />
//         <Scatter name="Steps vs Calories" data={scatterData} fill="#8884d8" />
//         <Line
//           type="linear"
//           data={trendLine}
//           dataKey="y"
//           dot={false}
//           stroke="#f97316"
//           strokeWidth={2}
//         />
//       </ScatterChart>
//     </ResponsiveContainer>
//   );
// }


// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// interface StepCountChartProps {
//   scatterData: { x: number; y: number }[];
// }

// export default function StepCountChart({ scatterData }: StepCountChartProps) {
//   // Sort data by x value to draw the trend line correctly
//   const sortedScatterData = [...scatterData].sort((a, b) => a.x - b.x);

//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//         <CartesianGrid />
//         <XAxis
//           type="number"
//           dataKey="x"
//           name="Calories Burned"
//           label={{ value: 'Calories Burned', position: 'insideBottomRight', offset: -10 }}
//           domain={['dataMin', 'dataMax']}
//         />
//         <YAxis
//           type="number"
//           dataKey="y"
//           name="Steps"
//           label={{ value: 'Steps', angle: -90, position: 'insideLeft' }}
//           domain={['dataMin', 'dataMax']}
//         />
//         <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//         <Legend verticalAlign="top" height={36} />

//         {/* Scatter points */}
//         <Scatter name="Calories vs Steps" data={scatterData} fill="#4287f5" />

//         {/* Trend line connecting scatter points */}
//         <Scatter
//           name="Trend Line"
//           data={sortedScatterData}
//           line={{ stroke: '#ff7300', strokeWidth: 2 }}
//           // Remove shape prop to fix TypeScript error
//         />
//       </ScatterChart>
//     </ResponsiveContainer>
//   );
// }






// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// interface StepCountChartProps {
//   scatterData: { x: number; y: number }[];
// }

// export default function StepCountChart({ scatterData }: StepCountChartProps) {
//   // Sort data by x value to draw the trend line correctly
//   const sortedScatterData = [...scatterData].sort((a, b) => a.x - b.x);

//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//         <CartesianGrid />
//         <XAxis
//           type="number"
//           dataKey="x"
//           name="Calories Burned"
//           label={{ value: 'Calories Burned', position: 'insideBottomRight', offset: -10 }}
//           domain={['dataMin', 'dataMax']}
//         />
//         <YAxis
//           type="number"
//           dataKey="y"
//           name="Steps"
//           label={{ value: 'Steps', angle: -90, position: 'insideLeft' }}
//           domain={['dataMin', 'dataMax']}
//         />
//         <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//         <Legend verticalAlign="top" height={36} />

//         {/* Scatter points */}
//         <Scatter name="Calories vs Steps" data={scatterData} fill="#4287f5" />

//         {/* Trend line connecting scatter points */}
//         <Scatter
//           name="Trend Line"
//           data={sortedScatterData}
//           line={{ stroke: '#ff7300', strokeWidth: 2 }}
//           // Remove shape prop to fix TypeScript error
//         />
//       </ScatterChart>
//     </ResponsiveContainer>
//   );
// }












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









