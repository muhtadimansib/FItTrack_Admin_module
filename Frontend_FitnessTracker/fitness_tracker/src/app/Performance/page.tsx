// import CommonLayout from "../layouts/commonLayout";

// export default function PerformancePage() {
//   return (
//     <CommonLayout activePage="Performance">
//       <div className="text-2xl font-semibold">Performance Page Content Here</div>
//     </CommonLayout>
//   );
// }


// 'use client'
// import CommonLayout from "../layouts/commonLayout";


// export default function PerformancePage() {

//   return (
//     <CommonLayout activePage="Performance">
//       {({ darkMode }) => (
//         <>
//           <div><h1>Performance Content Here</h1></div>
//         </>
//       )}
//     </CommonLayout>
//   );
// }



















// 'use client'
// import CommonLayout from "../layouts/commonLayout";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
// } from "recharts";
// import { Users, ClipboardList, Dumbbell, Apple } from "lucide-react"; // example icons
// import { useState } from "react";


// const weeklyData = [
//   { name: "Mon", trainer: 45, nutritionist: 30 },
//   { name: "Tue", trainer: 48, nutritionist: 25 },
//   { name: "Wed", trainer: 50, nutritionist: 35 },
//   { name: "Thu", trainer: 60, nutritionist: 40 },
//   { name: "Fri", trainer: 65, nutritionist: 38 },
//   { name: "Sat", trainer: 70, nutritionist: 32 },
//   { name: "Sun", trainer: 42, nutritionist: 20 },
// ];

// const ratingData = [
//   { name: "5 Stars", value: 65 },
//   { name: "4 Stars", value: 25 },
//   { name: "3 Stars", value: 8 },
//   { name: "2 Stars", value: 2 },
// ];

// const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#E11D48"];

// const revenueTrendData = [
//   { month: "Jan", trainer: 18000, nutritionist: 15000 },
//   { month: "Feb", trainer: 18500, nutritionist: 15800 },
//   { month: "Mar", trainer: 20000, nutritionist: 17000 },
//   { month: "Apr", trainer: 21500, nutritionist: 18200 },
//   { month: "May", trainer: 23000, nutritionist: 19500 },
//   { month: "Jun", trainer: 24500, nutritionist: 21000 },
// ];



// export default function PerformancePage() {
//   // dummy dashboardData replacement for example
//   // const dashboardData = {
//   //   totalUsers: 12,
//   //   totalWorkoutPlans: 8,
//   //   totalExercises: 47,
//   //   totalNutritionEntries: 47300,
//   // };
// type TrainerData = {
//   type: 'trainer';
//   data: {
//     name: string;
//     rating: number;
//     clients: number;
//     sessions: number;
//     description: string;
//     image?: string;
//   };
// };

// type NutritionistData = {
//   type: 'nutritionist';
//   data: {
//     name: string;
//     plansCreated: number;
//     clients: number;
//     avgPlanDuration: string;
//     description: string;
//     image?: string;
//   };
// };
//   type ModalData = TrainerData | NutritionistData | null;

  
// function getInitials(name: string) {
//   return name
//     .split(' ')
//     .map((n) => n[0])
//     .join('')
//     .toUpperCase();
// }
//   const [modalData, setModalData] = useState<ModalData>(null);
//    // Sample top performers data
//   const topTrainer = {
//     name: 'Alex Morgan',
//     rating: 4.9,
//     clients: 34,
//     sessions: 120,
//     description: 'Top rated trainer with 4.9 ⭐ rating and 120 sessions completed.',
//     image: '', // try with a valid URL and also test with an empty string
//   };

//   const topNutritionist = {
//     name: 'Samantha Lee',
//     plansCreated: 52,
//     clients: 28,
//     avgPlanDuration: '3 months',
//     description: 'Most active nutritionist with 52 plans created.',
//     image: '', // test image fallback
//   };

//   function openModal(data:any) {
//     setModalData(data);
//   }

//   function closeModal() {
//     setModalData(null);
//   }




//   return (
//     <CommonLayout activePage="Performance">
//       {({ darkMode }) => {
//         const stats = [
//           {
//             label: "Total Trainers",
//             value: 12,
//             icon: <Users size={36} className="text-cyan-400" />,
//           },
//           {
//             label: "Total Nutritionists",
//             value: 8,
//             icon: <ClipboardList size={36} className="text-yellow-400" />,
//           },
//           {
//             label: "Average Rating",
//             value: "4.7 ⭐",
//             icon: <Dumbbell size={36} className="text-orange-400" />,
//           },
//           {
//             label: "Monthly Revenue",
//             value: "$47.3K",
//             icon: <Apple size={36} className="text-green-400" />,
//           },
//         ];

//          const darkerTrainerGradient = 'bg-gradient-to-r from-emerald-900 via-green-800 to-lime-700';
//   const darkerNutritionistGradient = 'bg-gradient-to-r from-yellow-800 via-amber-700 to-orange-600';

//         return (
//           <>
//             <div className="space-y-6">
//                {/* Top Summary Notifications */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           {/* Top Trainer Notification */}
//   <div className="p-4 rounded-xl shadow-lg text-white bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 transform transition-all duration-700 ease-out animate-slide-in-rightp-4 rounded-xl shadow-lg text-white bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 animate-slide-in-right">
//     <div className="flex justify-between items-center">
//       <div className="flex items-center gap-4">
//         <div className="avatar">
//           {topTrainer.image ? (
//             <div className="w-14 rounded-full ring ring-white ring-offset-2">
//               <img src={topTrainer.image} alt="Trainer" />
//             </div>
//           ) : (
//             <div className="bg-neutral text-neutral-content w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
//               <span>{getInitials(topTrainer.name)}</span>
//             </div>
//           )}
//         </div>
//         <div>
//           <div className="text-lg font-semibold">Top Performing Trainer</div>
//           <div className="text-xl font-bold">{topTrainer.name}</div>
//           <div>{topTrainer.rating} ⭐ Avg Rating</div>
//         </div>
//       </div>
//       <button
//         onClick={() => openModal({ type: 'trainer', data: topTrainer })}
//         className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-emerald-900"
//       >
//         See
//       </button>
//     </div>
//   </div>


//         {/* Nutritionist Card */}
//         <div className="p-4 rounded-xl shadow-lg text-white bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-700 animate-slide-in-right [animation-delay:0.2s]">
//           <div className="flex items-center gap-4">
//             {/* Avatar */}
//             <div className="avatar avatar-placeholder">
//               {topNutritionist.image ? (
//                 <div className="w-14 rounded-full ring ring-white ring-offset-2">
//                   <img src={topNutritionist.image} alt="Nutritionist" />
//                 </div>
//               ) : (
//                 <div className="bg-neutral text-neutral-content w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
//                   <span>{getInitials(topNutritionist.name)}</span>
//                 </div>
//               )}
//             </div>
//             <div>
//               <div className="text-lg font-semibold">Top Performing Nutritionist</div>
//               <div className="text-xl font-bold">{topNutritionist.name}</div>
//               <div>{topNutritionist.plansCreated} Plans Created</div>
//             </div>
//           </div>
//           <button
//             onClick={() => openModal({ type: 'nutritionist', data: topNutritionist })}
//             className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-yellow-800"
//           >
//             See
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {modalData && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white dark:bg-zinc-900 p-6 rounded-xl max-w-lg w-full relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
//               onClick={closeModal}
//             >
//               ✕
//             </button>

//             {/* Modal Content */}
//             <div className="flex items-center gap-4 mb-4">
//               <div className="avatar avatar-placeholder">
//                 {modalData.data.image ? (
//                   <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                     <img src={modalData.data.image} alt="Profile" />
//                   </div>
//                 ) : (
//                   <div className="bg-neutral text-neutral-content w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold">
//                     <span>{getInitials(modalData.data.name)}</span>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold">{modalData.data.name}</h2>
//                 <p className="text-sm text-gray-400">
//                   {modalData.type === 'trainer' ? 'Trainer' : 'Nutritionist'}
//                 </p>
//               </div>
//             </div>

//             {modalData.type === 'trainer' && (
//               <>
//                 <p className="mb-2">{modalData.data.description}</p>
//                 <p>⭐ Average Rating: {modalData.data.rating}</p>
//                 <p>👥 Clients Served: {modalData.data.clients}</p>
//                 <p>🏋️ Sessions Completed: {modalData.data.sessions}</p>
//               </>
//             )}

//             {modalData.type === 'nutritionist' && (
//               <>
//                 <p className="mb-2">{modalData.data.description}</p>
//                 <p>📝 Plans Created: {modalData.data.plansCreated}</p>
//                 <p>👥 Clients Served: {modalData.data.clients}</p>
//                 <p>⏳ Avg Plan Duration: {modalData.data.avgPlanDuration}</p>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//               {/* Tabs */}
//               <div className={`tabs tabs-boxed w-fit ${darkMode ? "bg-zinc-900" : "bg-white"} rounded-xl shadow-md`}>
//                 <button className="tab tab-active bg-orange-500 text-white">Overview</button>
//                 <button className="tab">Trainers</button>
//                 <button className="tab">Nutritionists</button>
//               </div>

//               {/* Graphs */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Weekly Activity */}
//                 <div className={`p-4 rounded-xl shadow-md ${darkMode ? "bg-zinc-900" : "bg-base-200"}`}>
//                   <h2 className="text-lg font-bold mb-4 text-zinc-100">{darkMode ? "text-white" : "text-zinc-900"}</h2>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <BarChart data={weeklyData}>
//                       <XAxis dataKey="name" stroke={darkMode ? "#fff" : "#000"} />
//                       <YAxis stroke={darkMode ? "#fff" : "#000"} />
//                       <Tooltip />
//                       <Bar dataKey="trainer" fill="#F97316" />
//                       <Bar dataKey="nutritionist" fill="#34D399" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Rating Distribution */}
//                 <div className={`p-4 rounded-xl shadow-md ${darkMode ? "bg-zinc-900" : "bg-base-200"}`}>
//                   <h2 className="text-lg font-bold mb-4 text-zinc-100">{darkMode ? "text-white" : "text-zinc-900"}</h2>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <PieChart>
//                       <Pie
//                         data={ratingData}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={90}
//                         label
//                       >
//                         {ratingData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                         ))}
//                       </Pie>
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Monthly Revenue Trend */}
//               <div className={`p-4 rounded-xl shadow-md ${darkMode ? "bg-zinc-900" : "bg-base-200"}`}>
//                 <h2 className="text-lg font-bold mb-4 text-zinc-100">{darkMode ? "text-white" : "text-zinc-900"}</h2>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={revenueTrendData}>
//                     <XAxis dataKey="month" stroke={darkMode ? "#fff" : "#000"} />
//                     <YAxis stroke={darkMode ? "#fff" : "#000"} />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="trainer" stroke="#F97316" strokeWidth={3} />
//                     <Line type="monotone" dataKey="nutritionist" stroke="#10B981" strokeWidth={3} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </>
//         );
//       }}
//     </CommonLayout>
//   );
// }

















// 'use client'
// import CommonLayout from "../layouts/commonLayout";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   LineChart,
//   Line,
//   CartesianGrid,
// } from "recharts";
// import { Users, ClipboardList, Dumbbell, Apple } from "lucide-react"; // example icons
// import { useEffect, useState } from "react";
// import { LoaderCircle } from "lucide-react";
// import ExperienceDistributionChart from "../Performance/components/charts/ExperienceDistributionChart";
// import WeeklyRatingChart from "../Performance/components/charts/WeeklyRatingChart";

// interface WeeklyRating {
//   week: string; // e.g. "2024-05-06"
//   avgRating: number;
// }


// const weeklyData = [
//   { name: "Mon", trainer: 45, nutritionist: 30 },
//   { name: "Tue", trainer: 48, nutritionist: 25 },
//   { name: "Wed", trainer: 50, nutritionist: 35 },
//   { name: "Thu", trainer: 60, nutritionist: 40 },
//   { name: "Fri", trainer: 65, nutritionist: 38 },
//   { name: "Sat", trainer: 70, nutritionist: 32 },
//   { name: "Sun", trainer: 42, nutritionist: 20 },
// ];

// const ratingData = [
//   { name: "5 Stars", value: 65 },
//   { name: "4 Stars", value: 25 },
//   { name: "3 Stars", value: 8 },
//   { name: "2 Stars", value: 2 },
// ];

// const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#E11D48"];

// const revenueTrendData = [
//   { month: "Jan", trainer: 18000, nutritionist: 15000 },
//   { month: "Feb", trainer: 18500, nutritionist: 15800 },
//   { month: "Mar", trainer: 20000, nutritionist: 17000 },
//   { month: "Apr", trainer: 21500, nutritionist: 18200 },
//   { month: "May", trainer: 23000, nutritionist: 19500 },
//   { month: "Jun", trainer: 24500, nutritionist: 21000 },
// ];

// // Type definitions
// interface ExperienceItem {
//   experienceRange: string;
//   count: number;
// }

// interface MergedExperienceItem {
//   experienceRange: string;
//   trainerCount: number;
//   nutritionistCount: number;
// }

// export default function PerformancePage() {
//   // dummy dashboardData replacement for example
//   // const dashboardData = {
//   //   totalUsers: 12,
//   //   totalWorkoutPlans: 8,
//   //   totalExercises: 47,
//   //   totalNutritionEntries: 47300,
//   // };
//    //////////----------------------------------------Graph for experience of the nutritioinst and trainers over time (1 week)----------------------------------
   
// //  const [experienceData, setExperienceData] = useState<MergedExperienceItem[]>([]);
// //   const [expChartLoading, setExpChartLoading] = useState(true);
// // useEffect(() => {
// //     async function fetchExperienceData() {
// //       try {
// //         const [trainerRes, nutritionistRes] = await Promise.all([
// //           fetch("http://localhost:3000/admin/performance/trainer/experience-distribution"),
// //           fetch("http://localhost:3000/admin/performance/nutritionist/experience-distribution"),
// //         ]);

// //         const trainerData: ExperienceItem[] = await trainerRes.json();
// //         const nutritionistData: ExperienceItem[] = await nutritionistRes.json();

// //         const merged: MergedExperienceItem[] = trainerData.map((trainerItem) => {
// //           const match = nutritionistData.find(
// //             (n) => n.experienceRange === trainerItem.experienceRange
// //           );
// //           return {
// //             experienceRange: trainerItem.experienceRange,
// //             trainerCount: trainerItem.count,
// //             nutritionistCount: match ? match.count : 0,
// //           };
// //         });

// //         setExperienceData(merged);
// //       } catch (error) {
// //         console.error("Error fetching experience distribution:", error);
// //       } finally {
// //         setExpChartLoading(false);
// //       }
// //     }

// //     fetchExperienceData();
// //   }, []);

  
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// type TrainerData = {
//   type: 'trainer';
//   data: {
//     name: string;
//     rating: number;
//     clients: number;
//     sessions: number;
//     description: string;
//     image?: string;
//   };
// };

// type NutritionistData = {
//   type: 'nutritionist';
//   data: {
//     name: string;
//     plansCreated: number;
//     clients: number;
//     avgPlanDuration: string;
//     description: string;
//     image?: string;
//   };
// };
//   type ModalData = TrainerData | NutritionistData | null;

  
// function getInitials(name: string) {
//   return name
//     .split(' ')
//     .map((n) => n[0])
//     .join('')
//     .toUpperCase();
// }
//   const [modalData, setModalData] = useState<ModalData>(null);
//    // Sample top performers data
//   const topTrainer = {
//     name: 'Alex Morgan',
//     rating: 4.9,
//     clients: 34,
//     sessions: 120,
//     description: 'Top rated trainer with 4.9 ⭐ rating and 120 sessions completed.',
//     image: '', // try with a valid URL and also test with an empty string
//   };

//   const topNutritionist = {
//     name: 'Samantha Lee',
//     plansCreated: 52,
//     clients: 28,
//     avgPlanDuration: '3 months',
//     description: 'Most active nutritionist with 52 plans created.',
//     image: '', // test image fallback
//   };

//   function openModal(data:any) {
//     setModalData(data);
//   }

//   function closeModal() {
//     setModalData(null);
//   }

//  //////////----------------------------------------Graph for rating of the nutritioinst and trainers over time (1 week)----------------------------------
//     const [trainerRatings, setTrainerRatings] = useState<WeeklyRating[]>([]);
//   const [nutritionistRatings, setNutritionistRatings] = useState<WeeklyRating[]>([]);
//   const [loading, setLoading] = useState(true);

//     useEffect(() => {
//     async function fetchRatings() {
//       try {
//         const [trainerRes, nutritionistRes] = await Promise.all([
//           fetch("http://localhost:3000/admin/performance/trainer-weekly-ratings"),
//           fetch("http://localhost:3000/admin/performance/nutritionist-weekly-ratings"),
//         ]);

//         const trainerData = await trainerRes.json();
//         const nutritionistData = await nutritionistRes.json();

//         setTrainerRatings(trainerData);
//         setNutritionistRatings(nutritionistData);
//       } catch (error) {
//         console.error("Failed to fetch ratings", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchRatings();
//   }, []);

//     // Merge data by week for combined chart
//   // We'll map through all weeks found in either array
//   const allWeeks = Array.from(
//     new Set([...trainerRatings.map(r => r.week), ...nutritionistRatings.map(r => r.week)])
//   ).sort();

//   const mergedData = allWeeks.map(week => {
//     return {
//       week,
//       trainer: trainerRatings.find(r => r.week === week)?.avgRating ?? 0,
//       nutritionist: nutritionistRatings.find(r => r.week === week)?.avgRating ?? 0,
//     };
//   });

//   if (loading) return <div>Loading graphs...</div>;

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//   return (
//     <CommonLayout activePage="Performance">
//       {({ darkMode }) => {
        


//         return (
//           <>
//             <div className="space-y-6">
//                {/* Top Summary Notifications */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           {/* Top Trainer Notification */}
//   <div className="p-4 rounded-xl shadow-lg text-white bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 transform transition-all duration-700 ease-out animate-slide-in-rightp-4 rounded-xl shadow-lg text-white bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 animate-slide-in-right">
//     <div className="flex justify-between items-center">
//       <div className="flex items-center gap-4">
//             <div className="avatar avatar-placeholder">
//               {topNutritionist.image ? (
//                 <div className="w-14 rounded-full ring ring-white ring-offset-2">
//                   <img src={topNutritionist.image} alt="Nutritionist" />
//                 </div>
//               ) : (
//                 <div className="bg-neutral text-neutral-content w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
//                   <span>{getInitials(topTrainer.name)}</span>
//                 </div>
//               )}
//             </div>
//         <div>
//           <div className="text-lg font-semibold">Top Performing Trainer</div>
//           <div className="text-xl font-bold">{topTrainer.name}</div>
//           <div>{topTrainer.rating} ⭐ Avg Rating</div>
//         </div>
//       </div>
//       <button
//         onClick={() => openModal({ type: 'trainer', data: topTrainer })}
//         className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-emerald-900"
//       >
//         See
//       </button>
//     </div>
//   </div>


//         {/* Nutritionist Card */}
//         <div className="p-4 rounded-xl shadow-lg text-white bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-700 animate-slide-in-right [animation-delay:0.2s]">
//           <div className="flex items-center gap-4">
//             {/* Avatar */}
//             <div className="avatar avatar-placeholder">
//               {topNutritionist.image ? (
//                 <div className="w-14 rounded-full ring ring-white ring-offset-2">
//                   <img src={topNutritionist.image} alt="Nutritionist" />
//                 </div>
//               ) : (
//                 <div className="bg-neutral text-neutral-content w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
//                   <span>{getInitials(topNutritionist.name)}</span>
//                 </div>
//               )}
//             </div>
//             <div>
//               <div className="text-lg font-semibold">Top Performing Nutritionist</div>
//               <div className="text-xl font-bold">{topNutritionist.name}</div>
//               <div>{topNutritionist.plansCreated} Plans Created</div>
//             </div>
//           </div>
//           <button
//             onClick={() => openModal({ type: 'nutritionist', data: topNutritionist })}
//             className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-yellow-800"
//           >
//             See
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {modalData && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white dark:bg-zinc-900 p-6 rounded-xl max-w-lg w-full relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
//               onClick={closeModal}
//             >
//               ✕
//             </button>

//             {/* Modal Content */}
//             <div className="flex items-center gap-4 mb-4">
//               <div className="avatar avatar-placeholder">
//                 {modalData.data.image ? (
//                   <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                     <img src={modalData.data.image} alt="Profile" />
//                   </div>
//                 ) : (
//                   <div className="bg-neutral text-neutral-content w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold">
//                     <span>{getInitials(modalData.data.name)}</span>
//                   </div>
//                 )}
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold">{modalData.data.name}</h2>
//                 <p className="text-sm text-gray-400">
//                   {modalData.type === 'trainer' ? 'Trainer' : 'Nutritionist'}
//                 </p>
//               </div>
//             </div>

//             {modalData.type === 'trainer' && (
//               <>
//                 <p className="mb-2">{modalData.data.description}</p>
//                 <p>⭐ Average Rating: {modalData.data.rating}</p>
//                 <p>👥 Clients Served: {modalData.data.clients}</p>
//                 <p>🏋️ Sessions Completed: {modalData.data.sessions}</p>
//               </>
//             )}

//             {modalData.type === 'nutritionist' && (
//               <>
//                 <p className="mb-2">{modalData.data.description}</p>
//                 <p>📝 Plans Created: {modalData.data.plansCreated}</p>
//                 <p>👥 Clients Served: {modalData.data.clients}</p>
//                 <p>⏳ Avg Plan Duration: {modalData.data.avgPlanDuration}</p>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//               {/* Tabs */}
//               <div className={`tabs tabs-boxed w-fit ${darkMode ? "bg-zinc-900" : "bg-white"} rounded-xl shadow-md`}>
//                 <button className="tab tab-active bg-orange-500 text-white">Overview</button>
//                 <button className="tab">Trainers</button>
//                 <button className="tab">Nutritionists</button>
//               </div>

//               {/* Graphs */}
//               <WeeklyRatingChart darkMode={darkMode} />

//               {/* Experience Distribution chart*/}
//               <ExperienceDistributionChart />

//             </div>
//           </>
//         );
//       }}
//     </CommonLayout>
//   );
// }








// 'use client'
// import CommonLayout from "../layouts/commonLayout";
// import { useEffect, useState } from "react";
// import ExperienceDistributionChart from "../Performance/components/charts/ExperienceDistributionChart";
// import WeeklyRatingChart from "../Performance/components/charts/WeeklyRatingChart";
// import TopPerformerCard from "../Performance/components/TopPerformer/TopPerformerCard";
// import TopPerformerModal from "../Performance/components/TopPerformer/TopPerformerModal";
// import { ModalData } from "../Performance/components/TopPerformer/types";

// export default function PerformancePage() {

//   const [modalData, setModalData] = useState<ModalData>(null);

//   const topTrainer = {
//     name: "Alex Morgan",
//     rating: 4.9,
//     clients: 34,
//     sessions: 120,
//     description: "Top rated trainer with 4.9 ⭐ rating and 120 sessions completed.",
//     image: "",
//   };

//   const topNutritionist = {
//     name: "Samantha Lee",
//     rating: 4.7,
//     plansCreated: 52,
//     clients: 28,
//     avgPlanDuration: "3 months",
//     description: "Most active nutritionist with 52 plans created.",
//     image: "",
//   };


//   return (
//     <CommonLayout activePage="Performance">
//       {({ darkMode }) => {
        
//         return (
//           <>
//             <div className="space-y-6">
//                {/* Top Summary Notifications */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <TopPerformerCard
//                     performer={topTrainer}
//                     type="trainer"
//                     onClick={() => setModalData({ type: "trainer", data: topTrainer })}
//                   />
//                   <TopPerformerCard
//                     performer={topNutritionist}
//                     type="nutritionist"
//                     delay={0.2}
//                     onClick={() => setModalData({ type: "nutritionist", data: topNutritionist })}
//                   />
//                 </div>

//                 <TopPerformerModal modalData={modalData} onClose={() => setModalData(null)} />
//                         {/* Tabs */}
//                         <div className={`tabs tabs-boxed w-fit ${darkMode ? "bg-zinc-900" : "bg-white"} rounded-xl shadow-md`}>
//                           <button className="tab tab-active bg-orange-500 text-white">Overview</button>
//                           <button className="tab">Trainers</button>
//                           <button className="tab">Nutritionists</button>
//                           <button className="tab">Clients</button>
//                         </div>

//               {/* Graphs */}
//               <WeeklyRatingChart darkMode={darkMode} />

//               {/* Experience Distribution chart*/}
//               <ExperienceDistributionChart />

//             </div>
//           </>
//         );
//       }}
//     </CommonLayout>
//   );
// }









// 'use client';
// import { useState } from "react";
// import CommonLayout from "../layouts/commonLayout";
// import TopPerformerCard from "./components/TopPerformer/TopPerformerCard";
// import TopPerformerModal from "./components/TopPerformer/TopPerformerModal";
// import OverviewContent from "../Performance/components/tabs/overviewContent";
// import TrainerContent from "../Performance/components/tabs/TrainerContent";
// import NutritionistContent from "../Performance/components/tabs/NutritionistContent";
// import ClientContent from "../Performance/components/tabs/ClientContent";
// import { ModalData } from "../Performance/components/TopPerformer/types";

// const tabOptions = ["Overview", "Trainers", "Nutritionists", "Clients"];

// export default function PerformancePage() {
//   const [modalData, setModalData] = useState<ModalData>(null);
//   const [activeTab, setActiveTab] = useState("Overview");

//   const topTrainer = {
//     name: "Alex Morgan",
//     rating: 4.9,
//     clients: 34,
//     sessions: 120,
//     description: "Top rated trainer with 4.9 ⭐ rating and 120 sessions completed.",
//     image: "",
//   };

//   const topNutritionist = {
//     name: "Samantha Lee",
//     rating: 4.7,
//     plansCreated: 52,
//     clients: 28,
//     avgPlanDuration: "3 months",
//     description: "Most active nutritionist with 52 plans created.",
//     image: "",
//   };
  

//   return (
//     <CommonLayout activePage="Performance">
//       {({ darkMode }) => (
//         <div className="space-y-6">
//           {/* Top Performers Always Visible */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <TopPerformerCard
//               performer={topTrainer}
//               type="trainer"
//               onClick={() => setModalData({ type: "trainer", data: topTrainer })}
//             />
//             <TopPerformerCard
//               performer={topNutritionist}
//               type="nutritionist"
//               delay={0.2}
//               onClick={() => setModalData({ type: "nutritionist", data: topNutritionist })}
//             />
//           </div>

//           <TopPerformerModal modalData={modalData} onClose={() => setModalData(null)} />

//           {/* Tabs */}
//           <div className={`tabs tabs-boxed w-fit ${darkMode ? "bg-zinc-900" : "bg-white"} rounded-xl shadow-md`}>
//             {tabOptions.map((tab) => (
//               <button
//                 key={tab}
//                 className={`tab ${activeTab === tab ? "tab-active bg-orange-500 text-white" : ""}`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Dynamic Tab Content */}
//           {activeTab === "Overview" && <OverviewContent darkMode={darkMode} />}
//           {activeTab === "Trainers" && <TrainerContent />}
//           {activeTab === "Nutritionists" && <NutritionistContent />}
//           {activeTab === "Clients" && <ClientContent />}
//         </div>
//       )}
//     </CommonLayout>
//   );
// }













'use client';
import { useState } from "react";
import CommonLayout from "../layouts/commonLayout";
import TopPerformerCard from "./components/TopPerformer/TopPerformerCard";
import TopPerformerModal from "./components/TopPerformer/TopPerformerModal";
import OverviewContent from "../Performance/components/tabs/overviewContent";
import TrainerContent from "../Performance/components/tabs/TrainerContent";
import NutritionistContent from "../Performance/components/tabs/NutritionistContent";
import ClientContent from "../Performance/components/tabs/ClientContent";
import { ModalData } from "../Performance/components/TopPerformer/types";

const tabOptions = ["Overview", "Trainers", "Nutritionists", "Clients"];

export default function PerformancePage() {
  const [modalData, setModalData] = useState<ModalData>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [topTrainer, setTopTrainer] = useState<any>(null);
  const [topNutritionist, setTopNutritionist] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <CommonLayout activePage="Performance">
      {({ darkMode }) => (
        <div className="space-y-6">
          {/* Top Performers Always Visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* <TopPerformerCard
              type="trainer"
               onClick={() => topTrainer && setModalData(topTrainer)}
              setData={setTopTrainer}
            />
            <TopPerformerCard
              type="nutritionist"
              delay={0.2}
             onClick={() => topNutritionist && setModalData(topNutritionist)}
              setData={setTopNutritionist}
            /> */}

            <TopPerformerCard
              type="trainer"
              delay={0.1}  // <-- add a small delay to enable animation
              onClick={() => topTrainer && setModalData(topTrainer)}
              setData={setTopTrainer}
            />
            <TopPerformerCard
              type="nutritionist"
              delay={0.3}  // slightly longer delay for staggered animation
              onClick={() => topNutritionist && setModalData(topNutritionist)}
              setData={setTopNutritionist}
            />

          </div>

          <TopPerformerModal modalData={modalData} onClose={() => setModalData(null)} darkMode={darkMode} />

          {/* Tabs */}
          <div className={`tabs tabs-boxed w-fit ${darkMode ? "bg-zinc-900" : "bg-white"} rounded-xl shadow-md`}>
            {tabOptions.map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "tab-active bg-orange-500 text-white" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Content */}
          {activeTab === "Overview" && <OverviewContent darkMode={darkMode} />}
          {activeTab === "Trainers" && <TrainerContent />}
          {activeTab === "Nutritionists" && <NutritionistContent />}
          {activeTab === "Clients" && <ClientContent />}
        </div>
      )}
    </CommonLayout>
  );
}

