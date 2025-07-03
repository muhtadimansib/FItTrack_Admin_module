// 'use client';
// import React from 'react';
// import { BarChart, Bar, XAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

// const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

// const activityData = [
//   { name: 'Mon', value: 30 },
//   { name: 'Tue', value: 45 },
//   { name: 'Wed', value: 40 },
//   { name: 'Thu', value: 42 },
//   { name: 'Fri', value: 50 },
//   { name: 'Sat', value: 30 },
//   { name: 'Sun', value: 28 },
// ];

// const userDistribution = [
//   { name: 'Nutritionists', value: 200 },
//   { name: 'Trainers', value: 300 },
//   { name: 'Clients', value: 500 },
// ];


// export default function Charts() {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-zinc-800 rounded-2xl p-4 shadow-md">
//         <h2 className="text-lg mb-2">Activity (Weekly)</h2>
//         <BarChart width={300} height={200} data={activityData}>
//           <XAxis dataKey="name" stroke="#fff" />
//           <Tooltip />
//           <Bar dataKey="value" fill="#FF8042" radius={[4, 4, 0, 0]} />
//         </BarChart>
//       </div>

//       <div className="bg-zinc-800 rounded-2xl p-4 shadow-md">
//         <h2 className="text-lg mb-2">Users</h2>
//         <PieChart width={300} height={200}>
//           <Pie
//             data={userDistribution}
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             label
//             dataKey="value"
//           >
//             {userDistribution.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//         </PieChart>
//         <p className="mt-2 text-center font-bold">TOTAL 1000</p>
//       </div>
//     </div>
//   );
// }



// 'use client';
// import React from 'react';
// import { BarChart, Bar, XAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

// const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

// const activityData = [
//   { name: 'Mon', value: 30 },
//   { name: 'Tue', value: 45 },
//   { name: 'Wed', value: 40 },
//   { name: 'Thu', value: 42 },
//   { name: 'Fri', value: 50 },
//   { name: 'Sat', value: 30 },
//   { name: 'Sun', value: 28 },
// ];

// const userDistribution = [
//   { name: 'Nutritionists', value: 200 },
//   { name: 'Trainers', value: 300 },
//   { name: 'Clients', value: 500 },
// ];

// export default function Charts() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-200">
//         <h2 className="text-lg font-semibold text-zinc-800 mb-2">Activity (Weekly)</h2>
//         <BarChart width={300} height={200} data={activityData}>
//           <XAxis dataKey="name" stroke="#4B5563" /> {/* text-zinc-600 */}
//           <Tooltip
//             contentStyle={{ backgroundColor: "#f9fafb", borderColor: "#d1d5db", color: "#111827" }}
//             itemStyle={{ color: "#111827" }}
//           />
//           <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} /> {/* blue-500 */}
//         </BarChart>
//       </div>

//       <div className="bg-white rounded-2xl p-4 shadow-md border border-zinc-200">
//         <h2 className="text-lg font-semibold text-zinc-800 mb-2">Users</h2>
//         <PieChart width={300} height={200}>
//           <Pie
//             data={userDistribution}
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             label
//             dataKey="value"
//           >
//             {userDistribution.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//         </PieChart>
//         <p className="mt-2 text-center font-bold text-zinc-800">TOTAL 1000</p>
//       </div>
//     </div>
//   );
// }














// 'use client';
// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from 'recharts';

// const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

// const activityData = [
//   { name: 'Mon', value: 30 },
//   { name: 'Tue', value: 45 },
//   { name: 'Wed', value: 40 },
//   { name: 'Thu', value: 42 },
//   { name: 'Fri', value: 50 },
//   { name: 'Sat', value: 30 },
//   { name: 'Sun', value: 28 },
// ];

// const userDistribution = [
//   { name: 'Nutritionists', value: 200 },
//   { name: 'Trainers', value: 300 },
//   { name: 'Clients', value: 500 },
// ];



// export default function Charts({ darkMode }: { darkMode: boolean }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div
//         className={`rounded-2xl p-4 shadow-md transition-colors ${
//           darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
//         }`}
//       >
//         <h2 className="text-lg mb-2 font-semibold">Activity (Weekly)</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={activityData}>
//             <XAxis
//               dataKey="name"
//               stroke={darkMode ? '#ffffff' : '#000000'}
//               tick={{ fill: darkMode ? '#ffffff' : '#000000' }}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
//                 borderColor: darkMode ? '#4b5563' : '#d1d5db',
//               }}
//               labelStyle={{
//                 color: darkMode ? '#ffffff' : '#000000',
//               }}
//               itemStyle={{
//                 color: darkMode ? '#ffffff' : '#000000',
//               }}
//             />
//             <Bar
//               dataKey="value"
//               fill={darkMode ? '#FF8042' : '#FF6B00'}
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div
//         className={`rounded-2xl p-4 shadow-md transition-colors ${
//           darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
//         }`}
//       >
//         <h2 className="text-lg mb-2 font-semibold">Users</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <PieChart>
//             <Pie
//               data={userDistribution}
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//               dataKey="value"
//             >
//               {userDistribution.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
//                 borderColor: darkMode ? '#4b5563' : '#d1d5db',
//               }}
//               labelStyle={{
//                 color: darkMode ? '#ffffff' : '#000000',
//               }}
//               itemStyle={{
//                 color: darkMode ? '#ffffff' : '#000000',
//               }}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//         <p className="mt-2 text-center font-bold">TOTAL 1000</p>
//       </div>
//     </div>
//   );
// }



// 'use client';
// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from 'recharts';

// const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

// const activityData = [
//   { name: 'Mon', value: 30 },
//   { name: 'Tue', value: 45 },
//   { name: 'Wed', value: 40 },
//   { name: 'Thu', value: 42 },
//   { name: 'Fri', value: 50 },
//   { name: 'Sat', value: 30 },
//   { name: 'Sun', value: 28 },
// ];

// interface ChartsProps {
//   darkMode: boolean;
//   totalClients: number;
//   totalTrainers: number;
//   totalNutritionists: number;
//   totalUsers: number;
// }

// export default function Charts({
//   darkMode,
//   totalClients,
//   totalTrainers,
//   totalNutritionists,
//   totalUsers,
// }: ChartsProps) {
//   const userDistribution = [
//     { name: 'Nutritionists', value: totalNutritionists },
//     { name: 'Trainers', value: totalTrainers },
//     { name: 'Clients', value: totalClients },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {/* Bar Chart */}
//       <div
//         className={`rounded-2xl p-4 shadow-md transition-colors ${
//           darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
//         }`}
//       >
//         <h2 className="text-lg mb-2 font-semibold">Activity (Weekly)</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={activityData}>
//             <XAxis
//               dataKey="name"
//               stroke={darkMode ? '#ffffff' : '#000000'}
//               tick={{ fill: darkMode ? '#ffffff' : '#000000' }}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
//                 borderColor: darkMode ? '#4b5563' : '#d1d5db',
//               }}
//               labelStyle={{
//                 color: darkMode ? '#ffffff' : '#000000',
//               }}
//               itemStyle={{
//                 color: darkMode ? '#ffffff' : '#000000',
//               }}
//             />
//             <Bar
//               dataKey="value"
//               fill={darkMode ? '#FF8042' : '#FF6B00'}
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Pie Chart with Side Legend (Responsive) */}
//       <div
//         className={`rounded-2xl p-4 shadow-md transition-colors ${
//           darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
//         }`}
//       >
//         <h2 className="text-lg mb-2 font-semibold">Users</h2>

//         {/* Flex on md+, stacked on mobile */}
//         <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
//           {/* Chart Container */}
//           <div className="w-full md:w-[60%] h-[250px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={userDistribution}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   label
//                   dataKey="value"
//                 >
//                   {userDistribution.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
//                     borderColor: darkMode ? '#4b5563' : '#d1d5db',
//                   }}
//                   labelStyle={{
//                     color: darkMode ? '#ffffff' : '#000000',
//                   }}
//                   itemStyle={{
//                     color: darkMode ? '#ffffff' : '#000000',
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Legend */}
//           <div className="flex flex-col gap-2 md:w-[35%]">
//             {userDistribution.map((entry, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <span
//                   className="w-4 h-4 rounded-full"
//                   style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                 ></span>
//                 <span className="text-sm">{entry.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <p className="mt-2 text-center font-bold">TOTAL {totalUsers}</p>
//       </div>
//     </div>
//   );
// }


//////////////////////////////////////////For Motion div///////////////////////////////////////////////////////////////////////////
// 'use client';
// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from 'recharts';
// import { usePathname } from 'next/navigation';
// import { motion } from 'framer-motion';

// const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

// const activityData = [
//   { name: 'Mon', value: 30 },
//   { name: 'Tue', value: 45 },
//   { name: 'Wed', value: 40 },
//   { name: 'Thu', value: 42 },
//   { name: 'Fri', value: 50 },
//   { name: 'Sat', value: 30 },
//   { name: 'Sun', value: 28 },
// ];

// interface ChartsProps {
//   darkMode: boolean;
//   totalClients: number;
//   totalTrainers: number;
//   totalNutritionists: number;
//   totalUsers: number;
// }

// export default function Charts({
//   darkMode,
//   totalClients,
//   totalTrainers,
//   totalNutritionists,
//   totalUsers,
// }: ChartsProps) {
//   const pathname = usePathname();

//   const userDistribution = [
//     { name: 'Nutritionists', value: totalNutritionists },
//     { name: 'Trainers', value: totalTrainers },
//     { name: 'Clients', value: totalClients },
//   ];

//   return (
//     <motion.div
//       key={pathname}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.4 }}
//       className="grid grid-cols-1 md:grid-cols-2 gap-4"
//     >
//       {/* Bar Chart */}
//       <div
//         className={`rounded-2xl p-4 shadow-md transition-colors ${
//           darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
//         }`}
//       >
//         <h2 className="text-lg mb-2 font-semibold">Activity (Weekly)</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={activityData}>
//             <XAxis
//               dataKey="name"
//               stroke={darkMode ? '#ffffff' : '#000000'}
//               tick={{ fill: darkMode ? '#ffffff' : '#000000' }}
//             />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
//                 borderColor: darkMode ? '#4b5563' : '#d1d5db',
//               }}
//               labelStyle={{
//                 color: darkMode ? '#ffffff' : '#000000',
//               }}
//               itemStyle={{
//                 color: darkMode ? '#ffffff' : '#000000',
//               }}
//             />
//             <Bar
//               dataKey="value"
//               fill={darkMode ? '#FF8042' : '#FF6B00'}
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Pie Chart */}
//       <div
//         className={`rounded-2xl p-4 shadow-md transition-colors ${
//           darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
//         }`}
//       >
//         <h2 className="text-lg mb-2 font-semibold">Users</h2>
//         <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
//           <div className="w-full md:w-[60%] h-[250px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={userDistribution}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   label
//                   dataKey="value"
//                 >
//                   {userDistribution.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
//                     borderColor: darkMode ? '#4b5563' : '#d1d5db',
//                   }}
//                   labelStyle={{
//                     color: darkMode ? '#ffffff' : '#000000',
//                   }}
//                   itemStyle={{
//                     color: darkMode ? '#ffffff' : '#000000',
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Legend */}
//           <div className="flex flex-col gap-2 md:w-[35%]">
//             {userDistribution.map((entry, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <span
//                   className="w-4 h-4 rounded-full"
//                   style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                 ></span>
//                 <span className="text-sm">{entry.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <p className="mt-2 text-center font-bold">TOTAL {totalUsers}</p>
//       </div>
//     </motion.div>
//   );
// }









'use client';
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const activityData = [
  { name: 'Mon', value: 30 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 40 },
  { name: 'Thu', value: 42 },
  { name: 'Fri', value: 50 },
  { name: 'Sat', value: 30 },
  { name: 'Sun', value: 28 },
];

interface ChartsProps {
  darkMode: boolean;
  totalClients: number;
  totalTrainers: number;
  totalNutritionists: number;
  totalUsers: number;
}

export default function Charts({
  darkMode,
  totalClients,
  totalTrainers,
  totalNutritionists,
  totalUsers,
}: ChartsProps) {
  const pathname = usePathname();

  const [chartKey, setChartKey] = useState(0);

  // Refresh chart key every time we land on dashboard
  useEffect(() => {
    setChartKey(prev => prev + 1);
  }, [pathname]);

  const userDistribution = [
    { name: 'Nutritionists', value: totalNutritionists },
    { name: 'Trainers', value: totalTrainers },
    { name: 'Clients', value: totalClients },
  ];

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Bar Chart */}
      <div
        className={`rounded-2xl p-4 shadow-md transition-colors ${
          darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
        }`}
      >
        <h2 className="text-lg mb-2 font-semibold">Activity (Weekly)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart key={`bar-${chartKey}`} data={activityData}>
            <XAxis
              dataKey="name"
              stroke={darkMode ? '#ffffff' : '#000000'}
              tick={{ fill: darkMode ? '#ffffff' : '#000000' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
                borderColor: darkMode ? '#4b5563' : '#d1d5db',
              }}
              labelStyle={{
                color: darkMode ? '#ffffff' : '#000000',
              }}
              itemStyle={{
                color: darkMode ? '#ffffff' : '#000000',
              }}
            />
            <Bar
              dataKey="value"
              fill={darkMode ? '#FF8042' : '#FF6B00'}
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div
        className={`rounded-2xl p-4 shadow-md transition-colors ${
          darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
        }`}
      >
        <h2 className="text-lg mb-2 font-semibold">Users</h2>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
          <div className="w-full md:w-[60%] h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart key={`pie-${chartKey}`}>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                  isAnimationActive={true}
                  animationDuration={800}
                >
                  {userDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#f3f4f6',
                    borderColor: darkMode ? '#4b5563' : '#d1d5db',
                  }}
                  labelStyle={{
                    color: darkMode ? '#ffffff' : '#000000',
                  }}
                  itemStyle={{
                    color: darkMode ? '#ffffff' : '#000000',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 md:w-[35%]">
            {userDistribution.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-2 text-center font-bold">TOTAL {totalUsers}</p>
      </div>
    </motion.div>
  );
}


