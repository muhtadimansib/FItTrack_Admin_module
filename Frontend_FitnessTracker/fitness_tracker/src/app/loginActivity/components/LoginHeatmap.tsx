// 'use client';

// import React from 'react';

// const heatmapData = [
//   [1, 2, 2, 3, 2, 2],
//   [2, 3, 3, 4, 3, 2],
//   [3, 4, 6, 8, 5, 4],
//   [2, 4, 7, 9, 6, 3],
//   [2, 3, 5, 6, 4, 3],
//   [1, 2, 2, 3, 2, 1],
//   [1, 1, 1, 2, 1, 1],
// ];

// const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// const hours = ['6 AM', '12 PM', '1 PM', '3 PM', '6 PM', '9 PM'];

// export default function LoginHeatmap() {
//   return (
//     <div className="text-white">


//       <div className="grid grid-cols-[auto_repeat(6,_1fr)] gap-2 items-center">
//         {/* Top-left blank cell */}
//         <div></div>

//         {/* Column headers */}
//         {hours.map((hour, index) => (
//           <div key={index} className="text-xs text-gray-400 text-center">
//             {hour}
//           </div>
//         ))}

//         {/* Grid rows */}
//         {heatmapData.map((row, rowIndex) => (
//           <React.Fragment key={rowIndex}>
//             <div className="text-xs text-gray-400">{days[rowIndex]}</div>
//             {row.map((val, colIndex) => (
//               <div
//                 key={colIndex}
//                 className="w-6 h-6 rounded-sm"
//                 style={{
//                   backgroundColor: `rgba(34, 197, 94, ${0.15 + val * 0.1})`,
//                 }}
//               />
//             ))}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }











// 'use client';

// import React from 'react';

// // Updated heatmapData with 9 columns (add an extra value per row)
// const heatmapData = [
//   [0, 1, 2, 3, 2, 2, 1, 0, 1],
//   [0, 2, 4, 5, 4, 2, 1, 1, 0],
//   [1, 3, 5, 6, 5, 3, 2, 1, 1],
//   [2, 4, 7, 9, 6, 4, 3, 2, 1],
//   [1, 3, 4, 5, 4, 3, 2, 1, 0],
//   [0, 2, 3, 3, 2, 2, 1, 0, 1],
//   [0, 1, 1, 2, 1, 1, 1, 0, 0],
// ];

// const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// // Time labels every 2 hours from 6 AM to 12 AM
// const timeLabels = [
//   '6 AM',
//   '8 AM',
//   '10 AM',
//   '12 PM',
//   '2 PM',
//   '4 PM',
//   '6 PM',
//   '8 PM',
//   '12 AM',
// ];

// export default function LoginHeatmap() {
//   return (
//     <div className="w-full max-w-xl mx-auto p-4">
//       <div className="flex flex-col gap-2">
//         {heatmapData.map((row, rowIndex) => (
//           <div key={rowIndex} className="flex items-center gap-3">
//             {/* Day Label */}
//             <div className="w-14 text-sm text-gray-500 font-medium">{days[rowIndex]}</div>

//             {/* Heatmap Squares */}
//             <div className="flex gap-3">
//               {row.map((val, colIndex) => (
//                 <div
//                   key={colIndex}
//                   className="w-8 h-8 rounded-sm"
//                   style={{
//                     backgroundColor: `rgba(34, 197, 94, ${0.15 + val * 0.1})`,
//                     transition: 'background-color 0.3s',
//                   }}
//                   title={`Count: ${val}`}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* X-Axis Labels */}
//       <div className="flex items-center gap-3 pl-14 mt-3 text-sm text-gray-500 font-medium select-none">
//         {timeLabels.map((time, idx) => (
//           <div key={idx} className="w-8 text-center">
//             {time}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






'use client';

import React, { useEffect, useState } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Time labels every 2 hours from 6 AM to 12 AM
const timeLabels = [
  '6 AM',
  '8 AM',
  '10 AM',
  '12 PM',
  '2 PM',
  '4 PM',
  '6 PM',
  '8 PM',
  '12 AM',
];

export default function LoginHeatmap() {
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);

  useEffect(() => {
    async function fetchHeatmap() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiBase}/login-activity/heatmap`);
        if (!res.ok) throw new Error('Failed to fetch heatmap data');
        const data: number[][] = await res.json();

        setHeatmapData(data);
      } catch (error) {
        console.error('Error fetching heatmap:', error);
      }
    }
    fetchHeatmap();
  }, []);

  // While loading, you can show a simple loading or empty state
  if (heatmapData.length === 0) {
    return <div className="p-4 text-center text-gray-500">Loading heatmap...</div>;
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="flex flex-col gap-2">
        {heatmapData.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-3">
            {/* Day Label */}
            <div className="w-14 text-sm text-gray-500 font-medium">{days[rowIndex]}</div>

            {/* Heatmap Squares */}
            <div className="flex gap-3">
              {row.map((val, colIndex) => (
                <div
                  key={colIndex}
                  className="w-8 h-8 rounded-sm"
                  style={{
                    backgroundColor: `rgba(34, 197, 94, ${0.15 + val * 0.1})`,
                    transition: 'background-color 0.3s',
                  }}
                  title={`Count: ${val}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* X-Axis Labels */}
      <div className="flex items-center gap-3 pl-14 mt-3 text-sm text-gray-500 font-medium select-none">
        {timeLabels.map((time, idx) => (
          <div key={idx} className="w-8 text-center">
            {time}
          </div>
        ))}
      </div>
    </div>
  );
}
