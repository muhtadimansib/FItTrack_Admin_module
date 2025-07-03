// import CommonLayout from "../layouts/commonLayout";

// export default function LoginActivityPage() {
//   return (
//     <CommonLayout activePage="Login activity">
//       <div className="text-2xl font-semibold">Login Activity Page Content Here</div>
//     </CommonLayout>
//   );
// }


// 'use client'
// import CommonLayout from "../layouts/commonLayout";


// export default function loginActivityPage() {

//   return (
//     <CommonLayout activePage="Login activity">
//       {({ darkMode }) => (
//         <>
//           <div><h1>Login Activity</h1></div>
//         </>
//       )}
//     </CommonLayout>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import CommonLayout from '../layouts/commonLayout';
// import {
//   BarChart3,
//   Clock,
//   Lock,
//   UsersRound,
// } from 'lucide-react';
// import dynamic from 'next/dynamic';

// // Lazy load the charts if needed
// const LoginLineChart = dynamic(() => import('../loginActivity/components/LoginLineChart'), { ssr: false });
// const LoginHeatmap = dynamic(() => import('../loginActivity/components/LoginHeatmap'), { ssr: false });

// export default function LoginActivityPage() {
//   const [logins, setLogins] = useState(247);
//   const [activeSessions, setActiveSessions] = useState(89);
//   const [avgSessionTime, setAvgSessionTime] = useState('24m');
//   const [failedAttempts, setFailedAttempts] = useState(12);

//   return (
//     <CommonLayout activePage="Login activity">
//       {({ darkMode }) => (
//         <div className="space-y-6">
//           {/* Top Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <StatCard
//               icon={<UsersRound className="text-white" />}
//               title="Total Logins Today"
//               value={logins}
//               trend="+12%"
//               bgColor="bg-blue-600"
//             />
//             <StatCard
//               icon={<BarChart3 className="text-white" />}
//               title="Active Sessions"
//               value={activeSessions}
//               trend="+5%"
//               bgColor="bg-green-600"
//             />
//             <StatCard
//               icon={<Clock className="text-white" />}
//               title="Avg Session Time"
//               value={avgSessionTime}
//               trend="-3%"
//               bgColor="bg-orange-600"
//             />
//             <StatCard
//               icon={<Lock className="text-white" />}
//               title="Failed Attempts"
//               value={failedAttempts}
//               trend="-8%"
//               bgColor="bg-red-600"
//             />
//           </div>

//           {/* Graphs */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             <div className={`rounded-xl p-4 shadow-md ${darkMode ? "bg-zinc-800" : "bg-white"}`}>
//               <h2 className="font-semibold mb-4">Login Activity (24h)</h2>
//               <LoginLineChart />
//             </div>
// <div className={`rounded-xl p-4 shadow-md ${darkMode ? "bg-zinc-800" : "bg-white"}`}>
//   <LoginHeatmap />
// </div>
//           </div>

//           {/* Recent Login Activity */}
//           <div className={`rounded-xl p-4 shadow-md ${darkMode ? "bg-zinc-800" : "bg-white"}`}>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold">Recent Login Activity</h2>
//               <button className="text-blue-500 text-sm hover:underline">View All</button>
//             </div>
//             <div className="space-y-4">
//               <LoginItem name="Sarah Johnson" email="sarah.j@fittrack.com" location="New York, NY" time="5 minutes ago" />
//               <LoginItem name="Mike Chen" email="mike.c@fittrack.com" location="Los Angeles, CA" time="12 minutes ago" />
//               <LoginItem name="Emma Davis" email="emma.d@email.com" location="Chicago, IL" time="25 minutes ago" />
//             </div>
//           </div>
//         </div>
//       )}
//     </CommonLayout>
//   );
// }

// function StatCard({ icon, title, value, trend, bgColor }: any) {
//   return (
//     <div className={`rounded-xl p-4 text-white shadow-md flex items-center justify-between ${bgColor}`}>
//       <div>
//         <div className="text-sm">{title}</div>
//         <div className="text-2xl font-bold">{value}</div>
//         <div className="text-xs mt-1">{trend}</div>
//       </div>
//       <div className="text-4xl opacity-30">{icon}</div>
//     </div>
//   );
// }

// function LoginItem({ name, email, location, time }: any) {
//   const initials = name.split(' ').map((n: string) => n[0]).join('');
//   return (
//     <div className="flex items-center justify-between p-3 rounded-lg bg-opacity-10 bg-gray-500 hover:bg-opacity-20 transition">
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
//           {initials}
//         </div>
//         <div>
//           <div className="font-semibold">{name} <span className="ml-2 text-xs text-green-500 bg-green-100 rounded px-2 py-0.5">success</span></div>
//           <div className="text-sm text-gray-400">{email}</div>
//           <div className="text-xs text-gray-500">{location}</div>
//         </div>
//       </div>
//       <div className="text-xs text-gray-400">{time}</div>
//     </div>
//   );
// }










// 'use client';

// import { useEffect, useState } from 'react';
// import CommonLayout from '../layouts/commonLayout';
// import {
//   BarChart3,
//   Clock,
//   Lock,
//   UsersRound,
// } from 'lucide-react';
// import dynamic from 'next/dynamic';

// // Lazy load the charts
// const LoginLineChart = dynamic(() => import('../loginActivity/components/LoginLineChart'), { ssr: false });
// const LoginHeatmap = dynamic(() => import('../loginActivity/components/LoginHeatmap'), { ssr: false });

// export default function LoginActivityPage() {
//   const [logins, setLogins] = useState(247);
//   const [activeSessions, setActiveSessions] = useState(89);
//   const [avgSessionTime, setAvgSessionTime] = useState('24m');
//   const [failedAttempts, setFailedAttempts] = useState(12);

//   return (
//     <CommonLayout activePage="Login activity">
//       {({ darkMode }) => (
//         <div className="space-y-6">
//           {/* Top Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <StatCard
//               icon={<UsersRound className="text-white" />}
//               title="Total Logins Today"
//               value={logins}
//               trend="+12%"
//               bgColor="bg-blue-600"
//               delay={0}
//             />
//             <StatCard
//               icon={<BarChart3 className="text-white" />}
//               title="Active Sessions"
//               value={activeSessions}
//               trend="+5%"
//               bgColor="bg-green-600"
//               delay={0.1}
//             />
//             <StatCard
//               icon={<Clock className="text-white" />}
//               title="Avg Session Time"
//               value={avgSessionTime}
//               trend="-3%"
//               bgColor="bg-orange-600"
//               delay={0.2}
//             />
//             <StatCard
//               icon={<Lock className="text-white" />}
//               title="Failed Attempts"
//               value={failedAttempts}
//               trend="-8%"
//               bgColor="bg-red-600"
//               delay={0.3}
//             />
//           </div>

//           {/* Graphs */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
//               <h2 className="font-semibold mb-4">Login Activity (24h)</h2>
//               <LoginLineChart />
//             </div>
//             <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
//               <LoginHeatmap />
//             </div>
//           </div>

//           {/* Recent Login Activity */}
//           <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold">Recent Login Activity</h2>
//               <button className="text-blue-500 text-sm hover:underline">View All</button>
//             </div>
//             <div className="space-y-4">
//               <LoginItem name="Sarah Johnson" email="sarah.j@fittrack.com" location="New York, NY" time="5 minutes ago" />
//               <LoginItem name="Mike Chen" email="mike.c@fittrack.com" location="Los Angeles, CA" time="12 minutes ago" />
//               <LoginItem name="Emma Davis" email="emma.d@email.com" location="Chicago, IL" time="25 minutes ago" />
//             </div>
//           </div>
//         </div>
//       )}
//     </CommonLayout>
//   );
// }

// // ANIMATED StatCard Component
// function StatCard({ icon, title, value, trend, bgColor, delay = 0 }: any) {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setVisible(true);
//     }, (delay + 1) * 1000); // +1s for chart to finish first

//     return () => clearTimeout(timeout);
//   }, [delay]);

//   const gradientMap: Record<string, string> = {
//     'bg-blue-600': 'from-blue-900 via-blue-800 to-blue-600',
//     'bg-green-600': 'from-green-900 via-green-800 to-green-600',
//     'bg-orange-600': 'from-orange-900 via-orange-800 to-orange-600',
//     'bg-red-600': 'from-red-900 via-red-800 to-red-600',
//   };

//   const gradient = gradientMap[bgColor] || 'from-gray-900 via-gray-800 to-gray-600';

//   return (
//     <div
//       className={`
//         rounded-xl p-5 text-white shadow-md flex items-center justify-between
//         bg-gradient-to-r ${gradient}
//         transform transition-all duration-700 ease-out
//         ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
//       `}
//     >
//       <div>
//         <div className="text-sm">{title}</div>
//         <div className="text-3xl font-extrabold">{value}</div>
//         <div className="text-xs mt-1">{trend}</div>
//       </div>
//       <div className="text-5xl opacity-30">{icon}</div>
//     </div>
//   );
// }

// function LoginItem({ name, email, location, time }: any) {
//   const initials = name.split(' ').map((n: string) => n[0]).join('');
//   return (
//     <div className="flex items-center justify-between p-3 rounded-lg bg-opacity-10 bg-gray-500 hover:bg-opacity-20 transition">
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
//           {initials}
//         </div>
//         <div>
//           <div className="font-semibold">
//             {name}{' '}
//             <span className="ml-2 text-xs text-green-500 bg-green-100 rounded px-2 py-0.5">
//               success
//             </span>
//           </div>
//           <div className="text-sm text-gray-400">{email}</div>
//           <div className="text-xs text-gray-500">{location}</div>
//         </div>
//       </div>
//       <div className="text-xs text-gray-400">{time}</div>
//     </div>
//   );
// }









// 'use client';

// import { useEffect, useState } from 'react';
// import CommonLayout from '../layouts/commonLayout';
// import {
//   BarChart3,
//   Clock,
//   Lock,
//   UsersRound,
// } from 'lucide-react';
// import dynamic from 'next/dynamic';

// // Lazy load the charts
// const LoginLineChart = dynamic(() => import('../loginActivity/components/LoginLineChart'), { ssr: true });
// const LoginHeatmap = dynamic(() => import('../loginActivity/components/LoginHeatmap'), { ssr: false });

// export default function LoginActivityPage() {
//   const [logins, setLogins] = useState(247);
//   const [activeSessions, setActiveSessions] = useState(89);
//   const [avgSessionTime, setAvgSessionTime] = useState('24m');
//   const [failedAttempts, setFailedAttempts] = useState(12);

//   return (
//     <CommonLayout activePage="Login activity">
//       {({ darkMode }) => (
//         <div className="space-y-6">
//           {/* Top Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <StatCard
//               icon={<UsersRound className="text-white" />}
//               title="Total Logins Today"
//               value={logins}
//               trend="+12%"
//               bgColor="bg-blue-600"
//               delay={0}
//             />
//             <StatCard
//               icon={<BarChart3 className="text-white" />}
//               title="Active Sessions"
//               value={activeSessions}
//               trend="+5%"
//               bgColor="bg-green-600"
//               delay={0.1}
//             />
//             <StatCard
//               icon={<Clock className="text-white" />}
//               title="Avg Session Time"
//               value={avgSessionTime}
//               trend="-3%"
//               bgColor="bg-orange-600"
//               delay={0.2}
//             />
//             <StatCard
//               icon={<Lock className="text-white" />}
//               title="Failed Attempts"
//               value={failedAttempts}
//               trend="-8%"
//               bgColor="bg-red-600"
//               delay={0.3}
//             />
//           </div>

//           {/* Graphs */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
//               <h2 className="font-semibold mb-4">Login Activity (24h)</h2>
//               <LoginLineChart />
//             </div>
//             <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
//               <h2 className="font-semibold mb-4">Daily Login Heatmap (24h)</h2>
//               <LoginHeatmap />
//             </div>
//           </div>

//           {/* Recent Login Activity */}
//           <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold">Recent Login Activity</h2>
//               <button className="text-blue-500 text-sm hover:underline">View All</button>
//             </div>
//             <div className="space-y-4">
//               <LoginItem name="Sarah Johnson" email="sarah.j@fittrack.com" location="New York, NY" time="5 minutes ago" delay={0} />
//               <LoginItem name="Mike Chen" email="mike.c@fittrack.com" location="Los Angeles, CA" time="12 minutes ago" delay={0.1} />
//               <LoginItem name="Emma Davis" email="emma.d@email.com" location="Chicago, IL" time="25 minutes ago" delay={0.2} />
//             </div>
//           </div>
//         </div>
//       )}
//     </CommonLayout>
//   );
// }

// // ANIMATED StatCard Component
// function StatCard({ icon, title, value, trend, bgColor, delay = 0 }: any) {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setVisible(true);
//     }, (delay + 1) * 900); // +1s for chart to finish first

//     return () => clearTimeout(timeout);
//   }, [delay]);

//   const gradientMap: Record<string, string> = {
//     'bg-blue-600': 'from-blue-900 via-blue-800 to-blue-600',
//     'bg-green-600': 'from-green-900 via-green-800 to-green-600',
//     'bg-orange-600': 'from-orange-900 via-orange-800 to-orange-600',
//     'bg-red-600': 'from-red-900 via-red-800 to-red-600',
//   };

//   const gradient = gradientMap[bgColor] || 'from-gray-900 via-gray-800 to-gray-600';

//   return (
//     <div
//       className={`
//         rounded-xl p-5 text-white shadow-md flex items-center justify-between
//         bg-gradient-to-r ${gradient}
//         transform transition-all duration-700 ease-out
//         ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
//       `}
//     >
//       <div>
//         <div className="text-sm">{title}</div>
//         <div className="text-3xl font-extrabold">{value}</div>
//         <div className="text-xs mt-1">{trend}</div>
//       </div>
//       <div className="text-5xl opacity-30">{icon}</div>
//     </div>
//   );
// }

// // ANIMATED LoginItem Component
// function LoginItem({ name, email, location, time, delay = 0 }: any) {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setVisible(true);
//     }, delay * 700); // staggered delay, shorter than stat card delay

//     return () => clearTimeout(timeout);
//   }, [delay]);

//   const initials = name.split(' ').map((n: string) => n[0]).join('');

//   return (
//     <div
//       className={`
//         flex items-center justify-between p-3 rounded-lg bg-opacity-10 bg-gray-500 hover:bg-opacity-20 transition
//         transform transition-all duration-500 ease-out
//         ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}
//       `}
//     >
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
//           {initials}
//         </div>
//         <div>
//           <div className="font-semibold">
//             {name}{' '}
//             <span className="ml-2 text-xs text-green-500 bg-green-100 rounded px-2 py-0.5">
//               success
//             </span>
//           </div>
//           <div className="text-sm text-gray-400">{email}</div>
//           <div className="text-xs text-gray-500">{location}</div>
//         </div>
//       </div>
//       <div className="text-xs text-gray-400">{time}</div>
//     </div>
//   );
// }










// 'use client';

// import { useEffect, useState } from 'react';
// import CommonLayout from '../layouts/commonLayout';
// import {
//   BarChart3,
//   Clock,
//   Lock,
//   UsersRound,
// } from 'lucide-react';
// import dynamic from 'next/dynamic';

// // Lazy load the charts
// const LoginLineChart = dynamic(() => import('../loginActivity/components/LoginLineChart'), { ssr: false });
// const LoginHeatmap = dynamic(() => import('../loginActivity/components/LoginHeatmap'), { ssr: false });

// export default function LoginActivityPage() {
//   const [logins, setLogins] = useState(247);
//   const [activeSessions, setActiveSessions] = useState(89);
//   const [avgSessionTime, setAvgSessionTime] = useState('24m');
//   const [failedAttempts, setFailedAttempts] = useState(12);

//   return (
//     <CommonLayout activePage="Login activity">
//       {({ darkMode }) => (
//         <div className="space-y-6">
//           {/* Top Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <StatCard
//               icon={<UsersRound className="text-white" />}
//               title="Total Logins Today"
//               value={logins}
//               bgColor="bg-blue-600"
//               delay={0}
//               darkMode={darkMode}
//             />
//             <StatCard
//               icon={<BarChart3 className="text-white" />}
//               title="Peak Login Time"
//               value={activeSessions}
//               bgColor="bg-green-600"
//               delay={0.1}
//               darkMode={darkMode}
//             />
//             <StatCard
//               icon={<Clock className="text-white" />}
//               title="Most Frequent Location"
//               value={avgSessionTime}
//               bgColor="bg-orange-600"
//               delay={0.2}
//               darkMode={darkMode}
//             />
//             <StatCard
//               icon={<Lock className="text-white" />}
//               title="Failed Attempts"
//               value={failedAttempts}
//               bgColor="bg-red-600"
//               delay={0.3}
//               darkMode={darkMode}
//             />
//           </div>

//           {/* Graphs */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//             <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
//               <h2 className="font-semibold mb-4">Login Activity (24h)</h2>
//               <LoginLineChart />
//             </div>
//             <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
//               <h2 className="font-semibold mb-4">Daily Login Heatmap (24h)</h2>
//               <LoginHeatmap />
//             </div>
//           </div>

//           {/* Recent Login Activity */}
//           <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="font-semibold">Recent Login Activity</h2>
//               <button className="text-blue-500 text-sm hover:underline">View All</button>
//             </div>
//             <div className="space-y-4">
//               <LoginItem name="Sarah Johnson" email="sarah.j@fittrack.com" location="New York, NY" time="5 minutes ago" delay={0} darkMode={darkMode} />
//               <LoginItem name="Mike Chen" email="mike.c@fittrack.com" location="Los Angeles, CA" time="12 minutes ago" delay={0.1} darkMode={darkMode} />
//               <LoginItem name="Emma Davis" email="emma.d@email.com" location="Chicago, IL" time="25 minutes ago" delay={0.2} darkMode={darkMode} />
//             </div>
//           </div>
//         </div>
//       )}
//     </CommonLayout>
//   );
// }

// // ANIMATED StatCard Component
// type BGColor = 'bg-blue-600' | 'bg-green-600' | 'bg-orange-600' | 'bg-red-600';

// interface StatCardProps {
//   icon: React.ReactNode;
//   title: string;
//   value: number | string;
//   bgColor: BGColor;
//   delay?: number;
//   darkMode: boolean;  // <- added darkMode prop here
// }

// function StatCard({ icon, title, value, bgColor, delay = 0, darkMode }: StatCardProps) {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => setVisible(true), (delay + 1) * 900);
//     return () => clearTimeout(timeout);
//   }, [delay]);

//   // Dark mode gradients as before
//   const darkGradientClasses: Record<BGColor, string> = {
//     'bg-blue-600': 'from-blue-900 via-blue-800 to-blue-600',
//     'bg-green-600': 'from-green-900 via-green-800 to-green-600',
//     'bg-orange-600': 'from-orange-900 via-orange-800 to-orange-600',
//     'bg-red-600': 'from-red-900 via-red-800 to-red-600',
//   };

//   // Light mode flat background colors (compatible & calm)
//   const lightBgColors: Record<BGColor, string> = {
//     'bg-blue-600': 'bg-blue-200 text-blue-900',
//     'bg-green-600': 'bg-green-200 text-green-900',
//     'bg-orange-600': 'bg-orange-200 text-orange-900',
//     'bg-red-600': 'bg-red-200 text-red-900',
//   };

//   // Decide classes based on darkMode
//   const darkGradient = darkGradientClasses[bgColor];
//   const lightBg = lightBgColors[bgColor];

//   return (
//     <div
//       className={`
//         rounded-xl p-5 shadow-md flex items-center justify-between
//         transform transition-all duration-700 ease-out
//         ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
//         ${darkMode ? `bg-gradient-to-r ${darkGradient} text-white` : `${lightBg}`}
//       `}
//     >
//       <div>
//         <div className="text-sm">{title}</div>
//         <div className="text-3xl font-extrabold">{value}</div>
//       </div>
//       <div className={darkMode ? 'text-5xl opacity-30 text-white' : 'text-5xl opacity-30 text-gray-700'}>
//         {icon}
//       </div>
//     </div>
//   );
// }


// // ANIMATED LoginItem Component with theme-aware colors
// function LoginItem({ name, email, location, time, delay = 0, darkMode }: any) {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setVisible(true);
//     }, delay * 700);

//     return () => clearTimeout(timeout);
//   }, [delay]);

//   const initials = name.split(' ').map((n: string) => n[0]).join('');

//   return (
//     <div
//       className={`
//         flex items-center justify-between p-3 rounded-lg
//         transition
//         transform transition-all duration-500 ease-out
//         ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}
//         ${darkMode
//           ? 'bg-zinc-700 hover:bg-zinc-600 text-gray-300'
//           : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
//       `}
//     >
//       <div className="flex items-center gap-4">
//         <div
//           className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
//             ${
//               darkMode
//                 ? 'bg-amber-600 text-zinc-100'
//                 : 'bg-amber-400 text-zinc-900'
//             }
//           `}
//         >
//           {initials}
//         </div>
//         <div>
//           <div className="font-semibold">
//             {name}{' '}
//             <span
//               className={`
//                 ml-2 text-xs rounded px-2 py-0.5
//                 ${darkMode ? 'text-green-400 bg-green-900' : 'text-green-700 bg-green-100'}
//               `}
//             >
//               success
//             </span>
//           </div>
//           <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{email}</div>
//           <div className={darkMode ? 'text-gray-500' : 'text-gray-500'}>{location}</div>
//         </div>
//       </div>
//       <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{time}</div>
//     </div>
//   );
// }


































'use client';

import { useEffect, useState } from 'react';
import CommonLayout from '../layouts/commonLayout';
import {
  BarChart3,
  Clock,
  Lock,
  UsersRound,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Lottie from 'lottie-react';
import TotalLogin_lottie from "@/lottie icons/login_total.json";
import PeakTime from "@/lottie icons/PeakLoginTime.json";
import location from "@/lottie icons/Location.json"
import failedLoginAttempt from "@/lottie icons/FailedLoginAttemps.json"

// Lazy load the charts
const LoginLineChart = dynamic(() => import('../loginActivity/components/LoginLineChart'), { ssr: false });
const LoginHeatmap = dynamic(() => import('../loginActivity/components/LoginHeatmap'), { ssr: false });

export default function LoginActivityPage() {
  const [logins, setLogins] = useState<number | string>(0);
  const [peakLoginTime, setPeakLoginTime] = useState<string>('');
  const [mostFrequentLocation, setMostFrequentLocation] = useState<string>('');
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [recentLogins, setRecentLogins] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('http://localhost:3000/login-activity/stats');
        if (!res.ok) throw new Error('Failed to fetch login activity stats');
        const data = await res.json();

        setLogins(data.totalLogins ?? 0);
        setFailedAttempts(data.failedAttempts ?? 0);
        setPeakLoginTime(data.peakLoginTime ?? '');

        if (data.frequentLocations && data.frequentLocations.length > 0) {
          const loc = data.frequentLocations[0];
          setMostFrequentLocation(`${loc.location} (${loc.count})`);
        } else {
          setMostFrequentLocation('N/A');
        }
      } catch (error) {
        console.error('Error fetching login activity stats:', error);
      }
    }

    async function fetchRecentLogins() {
      try {
        const res = await fetch('http://localhost:3000/login-activity/recent?limit=4');
        const data = await res.json();

        // Format timestamp to "X minutes ago"
        const now = new Date();
        const formatted = data.map((item: any) => {
          const time = new Date(item.timestamp);
          const diffMs = now.getTime() - time.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const readable = diffMins < 1
            ? 'just now'
            : diffMins < 60
              ? `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
              : `${Math.floor(diffMins / 60)} hour${Math.floor(diffMins / 60) > 1 ? 's' : ''} ago`;

          return { ...item, timeAgo: readable };
        });

        setRecentLogins(formatted);
      } catch (err) {
        console.error('Failed to fetch recent login activity', err);
      }
    }

    fetchStats();
    fetchRecentLogins();
  }, []);


  return (
    <CommonLayout activePage="Login activity">
      {({ darkMode }) => (
        <div className="space-y-6">
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Lottie animationData={TotalLogin_lottie} className="w-12 h-12" loop={true} />}
              title="Total Logins Today"
              value={logins}
              bgColor="bg-blue-600"
              delay={0}
              darkMode={darkMode}
            />
            <StatCard
              icon={<Lottie animationData={PeakTime} className="w-20 h-20" loop={true} />}
              title="Peak Login Time"
              value={peakLoginTime}
              bgColor="bg-green-600"
              delay={0.1}
              darkMode={darkMode}
            />
            <StatCard
              icon={<Lottie animationData={location} className="w-16 h-16" loop={true} />}
              title="Most Frequent Location"
              value={mostFrequentLocation}
              bgColor="bg-orange-600"
              delay={0.2}
              darkMode={darkMode}
            />
            <StatCard
              icon={<Lottie animationData={failedLoginAttempt} className="w-16 h-16" loop={true} />}
              title="Failed Attempts"
              value={failedAttempts}
              bgColor="bg-red-600"
              delay={0.3}
              darkMode={darkMode}
            />
          </div>

          {/* Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
              <h2 className="font-semibold mb-4">Weekly Login Activity</h2>
              <LoginLineChart />
            </div>
            <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
              <h2 className="font-semibold mb-4">Weekly Login Heatmap</h2>
              <LoginHeatmap />
            </div>
          </div>

          {/* Recent Login Activity */}
          <div className={`rounded-xl p-4 shadow-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Recent Login Activity</h2>
              <button className="text-blue-500 text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {recentLogins.map((login, index) => (
                <LoginItem
                  key={index}
                  name={login.name}
                  email={login.email}
                  location={login.location}
                  time={login.timeAgo}
                  delay={index * 0.1}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </CommonLayout>
  );
}

// ANIMATED StatCard Component
type BGColor = 'bg-blue-600' | 'bg-green-600' | 'bg-orange-600' | 'bg-red-600';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  bgColor: BGColor;
  delay?: number;
  darkMode: boolean;  // <- added darkMode prop here
}

function StatCard({ icon, title, value, bgColor, delay = 0, darkMode }: StatCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), (delay + 1) * 900);
    return () => clearTimeout(timeout);
  }, [delay]);

  // Dark mode gradients as before
  const darkGradientClasses: Record<BGColor, string> = {
    'bg-blue-600': 'from-blue-900 via-blue-800 to-blue-600',
    'bg-green-600': 'from-green-900 via-green-800 to-green-600',
    'bg-orange-600': 'from-orange-900 via-orange-800 to-orange-600',
    'bg-red-600': 'from-red-900 via-red-800 to-red-600',
  };

  // Light mode flat background colors (compatible & calm)
  const lightBgColors: Record<BGColor, string> = {
    'bg-blue-600': 'bg-blue-200 text-blue-900',
    'bg-green-600': 'bg-green-200 text-green-900',
    'bg-orange-600': 'bg-orange-200 text-orange-900',
    'bg-red-600': 'bg-red-200 text-red-900',
  };

  // Decide classes based on darkMode
  const darkGradient = darkGradientClasses[bgColor];
  const lightBg = lightBgColors[bgColor];

  return (
    <div
      className={`
        rounded-xl p-5 shadow-md flex items-center justify-between
        transform transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
        ${darkMode ? `bg-gradient-to-r ${darkGradient} text-white` : `${lightBg}`}
      `}
    >
      <div>
        <div className="text-sm">{title}</div>
        <div className="text-3xl font-extrabold">{value}</div>
      </div>
      <div className={darkMode ? 'text-5xl opacity-30 text-white' : 'text-5xl opacity-30 text-gray-700'}>
        {icon}
      </div>
    </div>
  );
}


// ANIMATED LoginItem Component with theme-aware colors
function LoginItem({ name, email, location, time, delay = 0, darkMode }: any) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, delay * 700);

    return () => clearTimeout(timeout);
  }, [delay]);

  const initials = name.split(' ').map((n: string) => n[0]).join('');

  return (
    <div
      className={`
        flex items-center justify-between p-3 rounded-lg
        transition
        transform transition-all duration-500 ease-out
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}
        ${darkMode
          ? 'bg-zinc-700 hover:bg-zinc-600 text-gray-300'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
      `}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
            ${darkMode
              ? 'bg-amber-600 text-zinc-100'
              : 'bg-amber-400 text-zinc-900'
            }
          `}
        >
          {initials}
        </div>
        <div>
          <div className="font-semibold">
            {name}{' '}
            <span
              className={`
                ml-2 text-xs rounded px-2 py-0.5
                ${darkMode ? 'text-green-400 bg-green-900' : 'text-green-700 bg-green-100'}
              `}
            >
              success
            </span>
          </div>
          <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{email}</div>
          <div className={darkMode ? 'text-gray-500' : 'text-gray-500'}>{location}</div>
        </div>
      </div>
      <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{time}</div>
    </div>
  );
}