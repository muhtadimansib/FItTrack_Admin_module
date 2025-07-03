// 'use client'
// import CommonLayout from "../layouts/commonLayout";


// export default function ExercisesPage() {

//   return (
//     <CommonLayout activePage="Exercises">
//       {({ darkMode }) => (
//         <>
//           <div><h1>Exercises Content here</h1></div>
//         </>
//       )}
//     </CommonLayout>
//   );
// }




// 'use client';
// import CommonLayout from '../layouts/commonLayout';
// import { useState } from 'react';

// // ✅ Use relative paths for UI components
// import { Button } from '../exercises/components/ui/button';

// // ✅ Use only valid Lucide icons
// import {
//   Dumbbell,
//   Flame,
//   Clock,
//   Search,
//   Plus,
//   Activity,
//   Flower,
//   Zap,
//   Bike,
// } from 'lucide-react';

// const exercises = [
//   {
//     id: 1,
//     title: 'Push-ups',
//     Icon: Dumbbell,
//     description: 'Classic upper body exercise targeting chest, shoulders, and triceps',
//     duration: 15,
//     calories: 120,
//     level: 'Beginner',
//     type: 'Strength',
//     color: 'from-green-700 to-green-500',
//   },
//   {
//     id: 2,
//     title: 'Running',
//     Icon: Activity,
//     description: 'Cardiovascular exercise for building endurance and burning calories',
//     duration: 30,
//     calories: 300,
//     level: 'Intermediate',
//     type: 'Cardio',
//     color: 'from-red-700 to-red-500',
//   },
//   {
//     id: 3,
//     title: 'Squats',
//     Icon: Activity,
//     description: 'Lower body exercise targeting quads, glutes, and hamstrings',
//     duration: 20,
//     calories: 150,
//     level: 'Beginner',
//     type: 'Strength',
//     color: 'from-emerald-700 to-emerald-500',
//   },
//   {
//     id: 4,
//     title: 'Yoga Flow',
//     Icon: Flower,
//     description: 'Gentle stretching and mindfulness practice',
//     duration: 45,
//     calories: 180,
//     level: 'Beginner',
//     type: 'Flexibility',
//     color: 'from-purple-700 to-purple-500',
//   },
//   {
//     id: 5,
//     title: 'HIIT Workout',
//     Icon: Zap,
//     description: 'High-intensity interval training for maximum calorie burn',
//     duration: 25,
//     calories: 400,
//     level: 'Advanced',
//     type: 'HIIT',
//     color: 'from-red-800 to-pink-600',
//   },
//   {
//     id: 6,
//     title: 'Cycling',
//     Icon: Bike,
//     description: 'Low-impact cardio exercise great for leg strength',
//     duration: 40,
//     calories: 350,
//     level: 'Intermediate',
//     type: 'Cardio',
//     color: 'from-cyan-700 to-blue-600',
//   },
// ];

// export default function ExercisesPage() {
//   return (
//     <CommonLayout activePage="Exercises">
//       {({ darkMode }) => (
//         <div className="p-6 space-y-6">
//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} rounded-xl p-4`}>
//               <p className="text-sm">Total Exercises</p>
//               <h2 className="text-2xl font-bold">6</h2>
//             </div>
//             <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} rounded-xl p-4 flex items-center justify-between`}>
//               <div>
//                 <p className="text-sm">Avg Duration</p>
//                 <h2 className="text-2xl font-bold">28 min</h2>
//               </div>
//               <Clock className={`${darkMode ? 'text-green-400' : 'text-green-700'}`} />
//             </div>
//             <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} rounded-xl p-4 flex items-center justify-between`}>
//               <div>
//                 <p className="text-sm">Avg Calories</p>
//                 <h2 className="text-2xl font-bold">250 kcal</h2>
//               </div>
//               <Flame className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
//             </div>
//           </div>

//           {/* Search & Filters */}
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="relative flex-1">
//               <Search className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} absolute left-3 top-2.5`} />
//               <input
//                 type="text"
//                 placeholder="Search exercises..."
//                 className={`w-full pl-10 pr-4 py-2 rounded-lg placeholder:text-gray-400
//                   ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`}
//               />
//             </div>
//             <div className="flex gap-2 flex-wrap">

//               <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center">
//                 <Plus className="mr-2" size={16} />
//                 Add Exercise
//               </Button>
//             </div>
//           </div>

//           {/* Exercise Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {exercises.map((exercise) => (
//               <div
//                 key={exercise.id}
//                 className={`rounded-2xl border p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg
//                   ${darkMode
//                     ? 'border-gray-700 bg-gray-800/70 hover:shadow-green-500/40 text-white'
//                     : 'border-gray-300 bg-gray-100 hover:shadow-green-400/40 text-gray-900'}`}
//                 style={{ flex: '0 0 calc(33.333% - 1rem)' }}
//               >
//                 <div className={`flex justify-center items-center p-4 rounded-2xl mb-4 ${darkMode ? 'bg-black' : 'bg-orange-100'}`}>
//                   <exercise.Icon size={48} className={darkMode ? 'text-green-500' : 'text-green-700'} />
//                 </div>

//                 <h3 className={`${darkMode ? 'text-white' : 'text-gray-900'} mb-3 text-xl font-semibold`}>
//                   {exercise.title}
//                 </h3>
//                 <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
//                   {exercise.description}
//                 </p>
//                 <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} flex justify-center gap-6 text-sm mb-4`}>
//                   <span>
//                     <Clock size={16} className={`${darkMode ? 'text-green-500' : 'text-green-700'} inline`} /> {exercise.duration} min
//                   </span>
//                   <span>
//                     <Flame size={16} className={`${darkMode ? 'text-orange-400' : 'text-orange-600'} inline`} /> {exercise.calories} kcal
//                   </span>
//                 </div>
//                 <button className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300">
//                   ▶ See Tutorial Video
//                 </button>
//                 <span className={`${darkMode ? 'bg-gray-700 text-green-500' : 'bg-green-100 text-green-700'} inline-block mt-3 text-xs px-2 py-0.5 rounded`}>
//                   {exercise.type}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </CommonLayout>
//   );
// }













// 'use client';
// import CommonLayout from '../layouts/commonLayout';
// import { useState, useEffect } from 'react';

// // ✅ Use relative paths for UI components
// import { Button } from '../exercises/components/ui/button';

// // ✅ Use only valid Lucide icons
// import {
//   Dumbbell,
//   Flame,
//   Clock,
//   Search,
//   Plus,
//   Activity,
//   Flower,
//   Zap,
//   Bike,
// } from 'lucide-react';

// type Exercise = {
//   id: number;
//   name: string;
//   description: string;
//   duration: number | null;
//   calories: number | null;
//   level: string | null;
//   type: string | null;
//   videoUrl?: string | null;
// };

// type Stats = {
//   totalExercises: number;
//   averageDuration: number;
//   averageCalories: number;
// };

// // Map exercise type to icon component for dynamic icon rendering
// const iconMap: Record<string, any> = {
//   Dumbbell: Dumbbell,
//   Flame: Flame,
//   Clock: Clock,
//   Search: Search,
//   Plus: Plus,
//   Activity: Activity,
//   Flower: Flower,
//   Zap: Zap,
//   Bike: Bike,
//   Strength: Dumbbell,
//   Cardio: Activity,
//   Flexibility: Flower,
//   HIIT: Zap,
//   // Add more mappings as needed
// };

// export default function ExercisesPage() {
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [stats, setStats] = useState<Stats>({
//     totalExercises: 0,
//     averageDuration: 0,
//     averageCalories: 0,
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
// const [isModalOpen, setIsModalOpen] = useState(false);
// const getEmbedUrl = (url: string) => {
//   // Extract the video ID from the url (last part after last slash)
//   const videoId = url.split('/').pop();
//   return `https://player.vimeo.com/video/${videoId}`;
// };

//   // Fetch all exercises and stats on mount
//   useEffect(() => {
//     fetchExercises();
//     fetchStats();
//   }, []);

//   // Fetch exercises from API (all or filtered by name)
//   async function fetchExercises(name?: string) {
//     try {
//       const url = name
//         ? `http://localhost:3000/exercises/name/${encodeURIComponent(name)}`
//         : 'http://localhost:3000/exercises';
//       const res = await fetch(url);
//       const data = await res.json();

//       // API might return single exercise object or array
//       const exercisesData = Array.isArray(data) ? data : [data];

//       setExercises(exercisesData);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//       setExercises([]);
//     }
//   }

//   // Fetch stats from API
//   async function fetchStats() {
//     try {
//       const res = await fetch('http://localhost:3000/exercises/stats');
//       const data = await res.json();
//       setStats({
//         totalExercises: data.totalExercises,
//         averageDuration: data.averageDuration,
//         averageCalories: data.averageCalories,
//       });
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   }

//   // Handle search input change and fetch filtered exercises
//   function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const value = e.target.value;
//     setSearchTerm(value);
//     if (value.trim() === '') {
//       fetchExercises(); // fetch all if search empty
//     } else {
//       fetchExercises(value.trim());
//     }
//   }

//   // Get Icon component by exercise type fallback
//   function getIcon(type: string | null) {
//     if (!type) return Dumbbell; // default icon
//     return iconMap[type] ?? Dumbbell;
//   }

//   return (
//     <CommonLayout activePage="Exercises">
//       {({ darkMode }) => (
//         <div className="p-6 space-y-6">
//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div
//               className={`${
//                 darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
//               } rounded-xl p-4`}
//             >
//               <p className="text-sm">Total Exercises</p>
//               <h2 className="text-2xl font-bold">{stats.totalExercises}</h2>
//             </div>
//             <div
//               className={`${
//                 darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
//               } rounded-xl p-4 flex items-center justify-between`}
//             >
//               <div>
//                 <p className="text-sm">Avg Duration</p>
//                 <h2 className="text-2xl font-bold">
//                   {stats.averageDuration} min
//                 </h2>
//               </div>
//               <Clock
//                 className={`${darkMode ? 'text-green-400' : 'text-green-700'}`}
//               />
//             </div>
//             <div
//               className={`${
//                 darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
//               } rounded-xl p-4 flex items-center justify-between`}
//             >
//               <div>
//                 <p className="text-sm">Avg Calories</p>
//                 <h2 className="text-2xl font-bold">{stats.averageCalories} kcal</h2>
//               </div>
//               <Flame
//                 className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}
//               />
//             </div>
//           </div>

//           {/* Search & Filters */}
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="relative flex-1">
//               <Search
//                 className={`${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 } absolute left-3 top-2.5`}
//               />
//               <input
//                 type="text"
//                 placeholder="Search exercises..."
//                 className={`w-full pl-10 pr-4 py-2 rounded-lg placeholder:text-gray-400
//                   ${
//                     darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
//                   }`}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center">
//                 <Plus className="mr-2" size={16} />
//                 Add Exercise
//               </Button>
//             </div>
//           </div>

//           {/* Exercise Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {exercises.map((exercise, index) => {
//               // Get icon based on type
//               const Icon = getIcon(exercise.type);

//               return (
//                 <div
//                   key={exercise.id ?? index} // fallback to index if id missing
//                   className={`rounded-2xl border p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg
//                   ${
//                     darkMode
//                       ? 'border-gray-700 bg-gray-800/70 hover:shadow-green-500/40 text-white'
//                       : 'border-gray-300 bg-gray-100 hover:shadow-green-400/40 text-gray-900'
//                   }`}
//                   style={{ flex: '0 0 calc(33.333% - 1rem)' }}
//                 >
//                   <div
//                     className={`flex justify-center items-center p-4 rounded-2xl mb-4 ${
//                       darkMode ? 'bg-black' : 'bg-orange-100'
//                     }`}
//                   >
//                     <Icon
//                       size={48}
//                       className={darkMode ? 'text-green-500' : 'text-green-700'}
//                     />
//                   </div>

//                   <h3
//                     className={`${
//                       darkMode ? 'text-white' : 'text-gray-900'
//                     } mb-3 text-xl font-semibold`}
//                   >
//                     {exercise.name}
//                   </h3>
//                   <p
//                     className={`${
//                       darkMode ? 'text-gray-300' : 'text-gray-700'
//                     } mb-4`}
//                   >
//                     {exercise.description}
//                   </p>
//                   <div
//                     className={`${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     } flex justify-center gap-6 text-sm mb-4`}
//                   >
//                     <span>
//                       <Clock
//                         size={16}
//                         className={`${darkMode ? 'text-green-500' : 'text-green-700'} inline`}
//                       />{' '}
//                       {exercise.duration ?? 'N/A'} min
//                     </span>
//                     <span>
//                       <Flame
//                         size={16}
//                         className={`${darkMode ? 'text-orange-400' : 'text-orange-600'} inline`}
//                       />{' '}
//                       {exercise.calories ?? 'N/A'} kcal
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => {
//                       if (exercise.videoUrl) {
//                         setVideoUrl(exercise.videoUrl);
//                         setIsModalOpen(true);
//                       } else {
//                         alert('No video URL available for this exercise.');
//                       }
//                     }}
//                     className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
//                   >
//                     ▶ See Tutorial Video
//                   </button>
//                   <span
//                     className={`${
//                       darkMode ? 'bg-gray-700 text-green-500' : 'bg-green-100 text-green-700'
//                     } inline-block mt-3 text-xs px-2 py-0.5 rounded`}
//                   >
//                     {exercise.type ?? 'Unknown'}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>


//             {isModalOpen && videoUrl && (
//             <div
//               className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//               onClick={() => setIsModalOpen(false)} // click outside closes modal
//             >
//               <div
//                 className="bg-black p-4 rounded-lg max-w-3xl w-full"
//                 onClick={e => e.stopPropagation()} // prevent modal close on clicking inside
//               >
//                 <button
//                   className="text-white mb-2 float-right font-bold text-2xl"
//                   onClick={() => setIsModalOpen(false)}
//                   aria-label="Close video"
//                 >
//                   &times;
//                 </button>

//                 {/* Vimeo or generic video iframe */}
//                 <iframe
//                   src={getEmbedUrl(videoUrl)}
//                   width="100%"
//                   height="360"
//                   allow="autoplay; fullscreen"
//                   allowFullScreen
//                   title="Exercise tutorial video"
//                 />
//               </div>
//             </div>
//           )}


//         </div>
//       )}
//     </CommonLayout>
//   );
// }
























// 'use client';
// import CommonLayout from '../layouts/commonLayout';
// import { useState, useEffect } from 'react';

// // ✅ Use relative paths for UI components
// import { Button } from '../exercises/components/ui/button';

// // ✅ Use only valid Lucide icons
// import {
//   Dumbbell,
//   Flame,
//   Clock,
//   Search,
//   Plus,
//   Activity,
//   Flower,
//   Zap,
//   Bike,
// } from 'lucide-react';
// import VideoModal from './components/VideoModal';

// type Exercise = {
//   id: number;
//   name: string;
//   description: string;
//   duration: number | null;
//   calories: number | null;
//   level: string | null;
//   type: string | null;
//   videoUrl?: string | null;
// };

// type Stats = {
//   totalExercises: number;
//   averageDuration: number;
//   averageCalories: number;
// };

// // Map exercise type to icon component for dynamic icon rendering
// const iconMap: Record<string, any> = {
//   Dumbbell: Dumbbell,
//   Flame: Flame,
//   Clock: Clock,
//   Search: Search,
//   Plus: Plus,
//   Activity: Activity,
//   Flower: Flower,
//   Zap: Zap,
//   Bike: Bike,
//   Strength: Dumbbell,
//   Cardio: Activity,
//   Flexibility: Flower,
//   HIIT: Zap,
//   // Add more mappings as needed
// };

// export default function ExercisesPage() {
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [stats, setStats] = useState<Stats>({
//     totalExercises: 0,
//     averageDuration: 0,
//     averageCalories: 0,
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);

//    // Open modal handler
//   const openVideoModal = (url: string | null) => {
//     setModalVideoUrl(url);
//   };

//   // Close modal handler
//   const closeVideoModal = () => {
//     setModalVideoUrl(null);
//   };


//   const getEmbedUrl = (url: string) => {
//   // Extract the video ID from the url (last part after last slash)
//   const videoId = url.split('/').pop();
//   return `https://player.vimeo.com/video/${videoId}`;
// };

//   // Fetch all exercises and stats on mount
//   useEffect(() => {
//     fetchExercises();
//     fetchStats();
//   }, []);

//   // Fetch exercises from API (all or filtered by name)
//   async function fetchExercises(name?: string) {
//     try {
//       const url = name
//         ? `http://localhost:3000/exercises/name/${encodeURIComponent(name)}`
//         : 'http://localhost:3000/exercises';
//       const res = await fetch(url);
//       const data = await res.json();

//       // API might return single exercise object or array
//       const exercisesData = Array.isArray(data) ? data : [data];

//       setExercises(exercisesData);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//       setExercises([]);
//     }
//   }

//   // Fetch stats from API
//   async function fetchStats() {
//     try {
//       const res = await fetch('http://localhost:3000/exercises/stats');
//       const data = await res.json();
//       setStats({
//         totalExercises: data.totalExercises,
//         averageDuration: data.averageDuration,
//         averageCalories: data.averageCalories,
//       });
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   }

//   // Handle search input change and fetch filtered exercises
//   function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const value = e.target.value;
//     setSearchTerm(value);
//     if (value.trim() === '') {
//       fetchExercises(); // fetch all if search empty
//     } else {
//       fetchExercises(value.trim());
//     }
//   }

//   // Get Icon component by exercise type fallback
//   function getIcon(type: string | null) {
//     if (!type) return Dumbbell; // default icon
//     return iconMap[type] ?? Dumbbell;
//   }

//   return (
//     <CommonLayout activePage="Exercises">
//       {({ darkMode }) => (
//         <div className="p-6 space-y-6">
//           {/* Stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div
//               className={`${
//                 darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
//               } rounded-xl p-4`}
//             >
//               <p className="text-sm">Total Exercises</p>
//               <h2 className="text-2xl font-bold">{stats.totalExercises}</h2>
//             </div>
//             <div
//               className={`${
//                 darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
//               } rounded-xl p-4 flex items-center justify-between`}
//             >
//               <div>
//                 <p className="text-sm">Avg Duration</p>
//                 <h2 className="text-2xl font-bold">
//                   {stats.averageDuration} min
//                 </h2>
//               </div>
//               <Clock
//                 className={`${darkMode ? 'text-green-400' : 'text-green-700'}`}
//               />
//             </div>
//             <div
//               className={`${
//                 darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
//               } rounded-xl p-4 flex items-center justify-between`}
//             >
//               <div>
//                 <p className="text-sm">Avg Calories</p>
//                 <h2 className="text-2xl font-bold">{stats.averageCalories} kcal</h2>
//               </div>
//               <Flame
//                 className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}
//               />
//             </div>
//           </div>

//           {/* Search & Filters */}
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="relative flex-1">
//               <Search
//                 className={`${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 } absolute left-3 top-2.5`}
//               />
//               <input
//                 type="text"
//                 placeholder="Search exercises..."
//                 className={`w-full pl-10 pr-4 py-2 rounded-lg placeholder:text-gray-400
//                   ${
//                     darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
//                   }`}
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center">
//                 <Plus className="mr-2" size={16} />
//                 Add Exercise
//               </Button>
//             </div>
//           </div>

//           {/* Exercise Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {exercises.map((exercise, index) => {
//               // Get icon based on type
//               const Icon = getIcon(exercise.type);

//               return (
//                 <div
//                   key={exercise.id ?? index} // fallback to index if id missing
//                   className={`rounded-2xl border p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg
//                   ${
//                     darkMode
//                       ? 'border-gray-700 bg-gray-800/70 hover:shadow-green-500/40 text-white'
//                       : 'border-gray-300 bg-gray-100 hover:shadow-green-400/40 text-gray-900'
//                   }`}
//                   style={{ flex: '0 0 calc(33.333% - 1rem)' }}
//                 >
//                   <div
//                     className={`flex justify-center items-center p-4 rounded-2xl mb-4 ${
//                       darkMode ? 'bg-black' : 'bg-orange-100'
//                     }`}
//                   >
//                     <Icon
//                       size={48}
//                       className={darkMode ? 'text-green-500' : 'text-green-700'}
//                     />
//                   </div>

//                   <h3
//                     className={`${
//                       darkMode ? 'text-white' : 'text-gray-900'
//                     } mb-3 text-xl font-semibold`}
//                   >
//                     {exercise.name}
//                   </h3>
//                   <p
//                     className={`${
//                       darkMode ? 'text-gray-300' : 'text-gray-700'
//                     } mb-4`}
//                   >
//                     {exercise.description}
//                   </p>
//                   <div
//                     className={`${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     } flex justify-center gap-6 text-sm mb-4`}
//                   >
//                     <span>
//                       <Clock
//                         size={16}
//                         className={`${darkMode ? 'text-green-500' : 'text-green-700'} inline`}
//                       />{' '}
//                       {exercise.duration ?? 'N/A'} min
//                     </span>
//                     <span>
//                       <Flame
//                         size={16}
//                         className={`${darkMode ? 'text-orange-400' : 'text-orange-600'} inline`}
//                       />{' '}
//                       {exercise.calories ?? 'N/A'} kcal
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => openVideoModal(exercise.videoUrl ?? null)}
//                     className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
//                   >
//                     ▶ See Tutorial Video
//                   </button>
//                   <span
//                     className={`${
//                       darkMode ? 'bg-gray-700 text-green-500' : 'bg-green-100 text-green-700'
//                     } inline-block mt-3 text-xs px-2 py-0.5 rounded`}
//                   >
//                     {exercise.type ?? 'Unknown'}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>


//             {isModalOpen && videoUrl && (
//             <div
//               className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//               onClick={() => setIsModalOpen(false)} // click outside closes modal
//             >
//               <div
//                 className="bg-black p-4 rounded-lg max-w-3xl w-full"
//                 onClick={e => e.stopPropagation()} // prevent modal close on clicking inside
//               >
//                 <button
//                   className="text-white mb-2 float-right font-bold text-2xl"
//                   onClick={() => setIsModalOpen(false)}
//                   aria-label="Close video"
//                 >
//                   &times;
//                 </button>
//               </div>
//             </div>
//           )}

//            {/* Video Modal */}
//           <VideoModal videoUrl={modalVideoUrl} onClose={closeVideoModal} darkMode={darkMode} />

//         </div>
//       )}
//     </CommonLayout>
//   );
// }


















'use client';
import CommonLayout from '../layouts/commonLayout';
import { useState, useEffect } from 'react';
import pushUp from '@/lottie icons/pushUp.json';
import clock from '@/lottie icons/clock.json';
import fire from '@/lottie icons/fire.json';
import Lottie from "lottie-react";

// ✅ Use relative paths for UI components
import { Button } from '../exercises/components/ui/button';

// ✅ Use only valid Lucide icons
import {
  Dumbbell,
  Flame,
  Clock,
  Search,
  Plus,
  Activity,
  Flower,
  Zap,
  Bike,
} from 'lucide-react';
import VideoModal from './components/VideoModal';
import { useRouter } from 'next/navigation';

type Exercise = {
  id: number;
  name: string;
  description: string;
  duration: number | null;
  calories: number | null;
  level: string | null;
  type: string | null;
  videoUrl?: string | null;
};

type Stats = {
  totalExercises: number;
  averageDuration: number;
  averageCalories: number;
};

// Map exercise type to icon component for dynamic icon rendering
const iconMap: Record<string, any> = {
  Dumbbell: Dumbbell,
  Flame: Flame,
  Clock: Clock,
  Search: Search,
  Plus: Plus,
  Activity: Activity,
  Flower: Flower,
  Zap: Zap,
  Bike: Bike,
  Strength: Dumbbell,
  Cardio: Activity,
  Flexibility: Flower,
  HIIT: Zap,
  // Add more mappings as needed
};

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalExercises: 0,
    averageDuration: 0,
    averageCalories: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const router = useRouter();

  // Open modal handler
  const openVideoModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  // Close modal handler
  const closeVideoModal = () => {
    setModalVideoUrl(null);
  };


  const getEmbedUrl = (url: string) => {
    // Extract the video ID from the url (last part after last slash)
    const videoId = url.split('/').pop();
    return `https://player.vimeo.com/video/${videoId}`;
  };

  // Fetch all exercises and stats on mount
  useEffect(() => {
    fetchExercises();
    fetchStats();
  }, []);

  // Fetch exercises from API (all or filtered by name)
  async function fetchExercises(name?: string) {
    try {
      const url = name
        ? `http://localhost:3000/exercises/name/${encodeURIComponent(name)}`
        : 'http://localhost:3000/exercises';

      const res = await fetch(url);
      const data = await res.json();
      console.log('Fetched:', data); // ✅ Add this line

      const exercisesData = Array.isArray(data) ? data : [data];
      setExercises(exercisesData);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setExercises([]);
    }
  }

  // Fetch stats from API
  async function fetchStats() {
    try {
      const res = await fetch('http://localhost:3000/exercises/stats');
      const data = await res.json();
      setStats({
        totalExercises: data.totalExercises,
        averageDuration: data.averageDuration,
        averageCalories: data.averageCalories,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  // Handle search input change and fetch filtered exercises
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      fetchExercises(); // fetch all if search empty
    } else {
      fetchExercises(value.trim());
    }
  }

  // Get Icon component by exercise type fallback
  function getIcon(type: string | null) {
    if (!type) return Dumbbell; // default icon
    return iconMap[type] ?? Dumbbell;
  }

  return (
    <CommonLayout activePage="Exercises">
      {({ darkMode }) => (
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Exercises */}
            <div
              className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
                } rounded-xl p-4 flex items-center justify-between`}
            >
              <div>
                <p className="text-sm">Total Exercises</p>
                <h2 className="text-2xl font-bold">{stats.totalExercises}</h2>
              </div>
              <Lottie animationData={pushUp} className="w-16 h-16" loop={true} />
            </div>

            {/* Avg Duration */}
            <div
              className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
                } rounded-xl p-4 flex items-center justify-between`}
            >
              <div>
                <p className="text-sm">Avg Duration</p>
                <h2 className="text-2xl font-bold">{stats.averageDuration} min</h2>
              </div>
              <Lottie animationData={clock} className="w-16 h-16" loop={true} />
            </div>

            {/* Avg Calories */}
            <div
              className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
                } rounded-xl p-4 flex items-center justify-between`}
            >
              <div>
                <p className="text-sm">Avg Calories</p>
                <h2 className="text-2xl font-bold">{stats.averageCalories} kcal</h2>
              </div>
              <Lottie animationData={fire} className="w-16 h-16" loop={true} />
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search
                className={`${darkMode ? 'text-gray-400' : 'text-gray-600'
                  } absolute left-3 top-2.5`}
              />
              <input
                type="text"
                placeholder="Search exercises..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg placeholder:text-gray-400
                  ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
                  }`}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                onClick={() => router.push('/exercises/components/addExercise')}
              >
                <Plus className="mr-2" size={16} />
                Add Exercise
              </Button>
            </div>
          </div>

          {/* Exercise Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise, index) => {
              // Get icon based on type
              const Icon = getIcon(exercise.type);

              return (
                <div
                  key={exercise.id ?? index} // fallback to index if id missing
                  className={`rounded-2xl border p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg
                  ${darkMode
                      ? 'border-gray-700 bg-gray-800/70 hover:shadow-green-500/40 text-white'
                      : 'border-gray-300 bg-gray-100 hover:shadow-green-400/40 text-gray-900'
                    }`}
                  style={{ flex: '0 0 calc(33.333% - 1rem)' }}
                >
                  <div
                    className={`flex justify-center items-center p-4 rounded-2xl mb-4 ${darkMode ? 'bg-black' : 'bg-orange-100'
                      }`}
                  >
                    <Icon
                      size={48}
                      className={darkMode ? 'text-green-500' : 'text-green-700'}
                    />
                  </div>

                  <h3
                    className={`${darkMode ? 'text-white' : 'text-gray-900'
                      } mb-3 text-xl font-semibold`}
                  >
                    {exercise.name}
                  </h3>
                  <p
                    className={`${darkMode ? 'text-gray-300' : 'text-gray-700'
                      } mb-4`}
                  >
                    {exercise.description}
                  </p>
                  <div
                    className={`${darkMode ? 'text-gray-400' : 'text-gray-600'
                      } flex justify-center gap-6 text-sm mb-4`}
                  >
                    <span>
                      <Clock
                        size={16}
                        className={`${darkMode ? 'text-green-500' : 'text-green-700'} inline`}
                      />{' '}
                      {exercise.duration ?? 'N/A'} min
                    </span>
                    <span>
                      <Flame
                        size={16}
                        className={`${darkMode ? 'text-orange-400' : 'text-orange-600'} inline`}
                      />{' '}
                      {exercise.calories ?? 'N/A'} kcal
                    </span>
                  </div>
                  <button
                    onClick={() => openVideoModal(exercise)}
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
                  >
                    ▶ See Tutorial Video
                  </button>
                  <span
                    className={`${darkMode ? 'bg-gray-700 text-green-500' : 'bg-green-100 text-green-700'
                      } inline-block mt-3 text-xs px-2 py-0.5 rounded`}
                  >
                    {exercise.type ?? 'Unknown'}
                  </span>
                </div>
              );
            })}
          </div>


          {isModalOpen && videoUrl && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={() => setIsModalOpen(false)} // click outside closes modal
            >
              <div
                className="bg-black p-4 rounded-lg max-w-3xl w-full"
                onClick={e => e.stopPropagation()} // prevent modal close on clicking inside
              >
                <button
                  className="text-white mb-2 float-right font-bold text-2xl"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close video"
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Video Modal */}
          {selectedExercise && (
            <VideoModal
              videoUrl={selectedExercise.videoUrl ?? ''}
              name={selectedExercise.name}
              description={selectedExercise.description}
              duration={selectedExercise.duration}
              calories={selectedExercise.calories}
              type={selectedExercise.type}
              onClose={() => setSelectedExercise(null)}
              darkMode={darkMode}
            />
          )}

        </div>
      )}
    </CommonLayout>
  );
}